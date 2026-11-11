import { cacheLife, cacheTag } from "next/cache";
import { shopifyFetch } from "./client";
import type { Money, Product, ShopImage } from "./types";

type RawMoney = { amount: string; currencyCode: string };
type RawImage = { url: string; altText: string | null; width: number | null; height: number | null };
type RawProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  tags: string[];
  images: { nodes: RawImage[] };
  variants: {
    nodes: {
      id: string;
      availableForSale: boolean;
      quantityAvailable: number | null;
      price: RawMoney;
      compareAtPrice: RawMoney | null;
    }[];
  };
};

const PRODUCT_FIELDS = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    tags
    images(first: 8) { nodes { url altText width height } }
    variants(first: 1) {
      nodes {
        id
        availableForSale
        quantityAvailable
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
      }
    }
  }
`;

const toMoney = (m: RawMoney): Money => ({ amount: parseFloat(m.amount), currencyCode: m.currencyCode });

function normalize(p: RawProduct): Product {
  const v = p.variants.nodes[0];
  const price = v ? toMoney(v.price) : null;
  const compareAt = v?.compareAtPrice ? toMoney(v.compareAtPrice) : null;
  const images: ShopImage[] = p.images.nodes;

  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    description: p.description,
    descriptionHtml: p.descriptionHtml,
    tags: p.tags,
    images,
    variant:
      v && price
        ? {
            id: v.id,
            availableForSale: v.availableForSale,
            quantityAvailable: v.quantityAvailable,
            price,
            compareAtPrice: compareAt && compareAt.amount > price.amount ? compareAt : null,
          }
        : null,
  };
}

// Disponibilità e prezzi cambiano a ogni release: dati freschi al massimo di un minuto.
// L'acquisto è comunque protetto da Shopify, che rifiuta le quantità oltre l'inventario.

export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 60, expire: 3600 });
  cacheTag("products");

  const data = await shopifyFetch<{ products: { nodes: RawProduct[] } }>(`
    ${PRODUCT_FIELDS}
    query Products {
      products(first: 24, sortKey: CREATED_AT) {
        nodes { ...ProductFields }
      }
    }
  `);
  return data.products.nodes.map(normalize);
}

export async function getProduct(handle: string): Promise<Product | null> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 60, expire: 3600 });
  cacheTag("products", `product-${handle}`);

  const data = await shopifyFetch<{ product: RawProduct | null }>(
    `
    ${PRODUCT_FIELDS}
    query Product($handle: String!) {
      product(handle: $handle) { ...ProductFields }
    }
  `,
    { handle }
  );
  return data.product ? normalize(data.product) : null;
}

// Con pochi prodotti, i "correlati" sono semplicemente gli altri prodotti dello shop.
export async function getRelatedProducts(handle: string, limit = 3): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.handle !== handle).slice(0, limit);
}
