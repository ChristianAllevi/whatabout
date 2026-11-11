"use server";

import { shopifyFetch } from "./client";
import { DELIVERY_LABEL } from "@/lib/shop-config";
import type { Cart, CartResult, Money, ShopImage } from "./types";

// Server Actions: il carrello vive su Shopify, il browser conserva solo l'ID.
// Nessuna cache: ogni chiamata legge e scrive lo stato reale.

type RawMoney = { amount: string; currencyCode: string };
type RawCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: RawMoney };
  lines: {
    nodes: {
      id: string;
      quantity: number;
      cost: { totalAmount: RawMoney };
      merchandise: {
        id: string;
        quantityAvailable: number | null;
        price: RawMoney;
        compareAtPrice: RawMoney | null;
        image: ShopImage | null;
        product: { handle: string; title: string };
      };
    }[];
  };
};
type Payload = {
  cart: RawCart | null;
  userErrors: { code: string | null; message: string }[];
  warnings?: { code: string; message: string }[];
};

const CART_FIELDS = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost { subtotalAmount { amount currencyCode } }
    lines(first: 50) {
      nodes {
        id
        quantity
        cost { totalAmount { amount currencyCode } }
        merchandise {
          ... on ProductVariant {
            id
            quantityAvailable
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
            image { url altText width height }
            product { handle title }
          }
        }
      }
    }
  }
`;

const RESULT_FIELDS = `
  cart { ...CartFields }
  userErrors { code message }
  warnings { code message }
`;

const toMoney = (m: RawMoney): Money => ({ amount: parseFloat(m.amount), currencyCode: m.currencyCode });

function normalize(c: RawCart): Cart {
  return {
    id: c.id,
    checkoutUrl: c.checkoutUrl,
    totalQuantity: c.totalQuantity,
    subtotal: toMoney(c.cost.subtotalAmount),
    lines: c.lines.nodes.map((l) => {
      const m = l.merchandise;
      const unit = toMoney(m.price);
      const compare = m.compareAtPrice ? toMoney(m.compareAtPrice) : null;
      return {
        id: l.id,
        quantity: l.quantity,
        title: m.product.title,
        handle: m.product.handle,
        image: m.image,
        variantId: m.id,
        lineTotal: toMoney(l.cost.totalAmount),
        unitPrice: unit,
        unitCompareAt: compare && compare.amount > unit.amount ? compare : null,
        maxQuantity: m.quantityAvailable,
      };
    }),
  };
}

const STOCK_MESSAGE =
  "Non ci sono abbastanza pezzi disponibili: abbiamo aggiunto il massimo possibile.";
const GENERIC_MESSAGE = "Qualcosa è andato storto. Riprova tra un momento.";

function toResult(p: Payload): CartResult {
  const stockIssue = p.warnings?.some((w) => w.code.includes("STOCK"));
  if (p.userErrors.length > 0 && !p.cart) {
    const stock = p.userErrors.some((e) => e.code?.includes("STOCK"));
    return { message: stock ? STOCK_MESSAGE : GENERIC_MESSAGE };
  }
  return {
    cart: p.cart ? normalize(p.cart) : undefined,
    message: stockIssue ? STOCK_MESSAGE : undefined,
  };
}

// Input minimi, perché le Server Actions sono endpoint pubblici.
const isGid = (v: unknown, type: string): v is string =>
  typeof v === "string" && v.startsWith(`gid://shopify/${type}/`) && v.length < 200;
const isQty = (v: unknown): v is number => Number.isInteger(v) && (v as number) >= 0 && (v as number) <= 99;

async function run(fn: () => Promise<CartResult>): Promise<CartResult> {
  try {
    return await fn();
  } catch (err) {
    console.error("[cart]", err instanceof Error ? err.message : err);
    return { message: GENERIC_MESSAGE };
  }
}

async function createCart(variantId: string, quantity: number): Promise<CartResult> {
  const data = await shopifyFetch<{ cartCreate: Payload }>(
    `
    ${CART_FIELDS}
    mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) { ${RESULT_FIELDS} }
    }
  `,
    {
      input: {
        lines: [{ merchandiseId: variantId, quantity }],
        // La nota compare sull'ordine in Shopify: ricorda che è un preordine e la data promessa.
        note: `PREORDINE — ${DELIVERY_LABEL}`,
      },
    }
  );
  return toResult(data.cartCreate);
}

export async function getCartAction(cartId: string): Promise<CartResult> {
  if (!isGid(cartId, "Cart")) return { expired: true };
  return run(async () => {
    const data = await shopifyFetch<{ cart: RawCart | null }>(
      `
      ${CART_FIELDS}
      query GetCart($id: ID!) { cart(id: $id) { ...CartFields } }
    `,
      { id: cartId }
    );
    return data.cart ? { cart: normalize(data.cart) } : { expired: true };
  });
}

export async function addToCartAction(
  cartId: string | null,
  variantId: string,
  quantity: number
): Promise<CartResult> {
  if (!isGid(variantId, "ProductVariant") || !isQty(quantity) || quantity < 1) {
    return { message: GENERIC_MESSAGE };
  }
  return run(async () => {
    if (!cartId || !isGid(cartId, "Cart")) return createCart(variantId, quantity);

    const data = await shopifyFetch<{ cartLinesAdd: Payload }>(
      `
      ${CART_FIELDS}
      mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) { ${RESULT_FIELDS} }
      }
    `,
      { cartId, lines: [{ merchandiseId: variantId, quantity }] }
    );
    // Carrello scaduto o non più valido: ne creiamo uno nuovo
    if (!data.cartLinesAdd.cart) return createCart(variantId, quantity);
    return toResult(data.cartLinesAdd);
  });
}

export async function updateCartLineAction(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<CartResult> {
  if (!isGid(cartId, "Cart") || !isGid(lineId, "CartLine") || !isQty(quantity)) {
    return { message: GENERIC_MESSAGE };
  }
  return run(async () => {
    const data = await shopifyFetch<{ cartLinesUpdate: Payload }>(
      `
      ${CART_FIELDS}
      mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) { ${RESULT_FIELDS} }
      }
    `,
      { cartId, lines: [{ id: lineId, quantity }] }
    );
    if (!data.cartLinesUpdate.cart) return { expired: true };
    return toResult(data.cartLinesUpdate);
  });
}

export async function removeCartLineAction(cartId: string, lineId: string): Promise<CartResult> {
  return updateCartLineAction(cartId, lineId, 0);
}
