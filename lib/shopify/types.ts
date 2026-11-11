export type Money = { amount: number; currencyCode: string };

export type ShopImage = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};

export type ProductVariant = {
  id: string;
  availableForSale: boolean;
  // null se Shopify non espone la quantità (inventario non tracciato o permesso mancante)
  quantityAvailable: number | null;
  price: Money;
  // Presente solo se maggiore del prezzo (cioè quando c'è uno sconto da mostrare barrato)
  compareAtPrice: Money | null;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  tags: string[];
  images: ShopImage[];
  // Primo e unico variant: ogni set è un prodotto semplice, senza varianti
  variant: ProductVariant | null;
};

export type CartLine = {
  id: string;
  quantity: number;
  title: string;
  handle: string;
  image: ShopImage | null;
  variantId: string;
  lineTotal: Money;
  unitPrice: Money;
  unitCompareAt: Money | null;
  maxQuantity: number | null;
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: Money;
  lines: CartLine[];
};

// Risultato delle azioni sul carrello.
// cart assente = lo stato del carrello nel browser resta invariato; expired = il carrello salvato non esiste più.
export type CartResult = {
  cart?: Cart;
  expired?: boolean;
  message?: string;
};
