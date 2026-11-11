// Client minimale per la Storefront API di Shopify (solo lato server).
// Le credenziali stanno in .env.local e non finiscono mai nel bundle del browser.

const API_VERSION = "2026-07";

export class ShopifyError extends Error {}

function getConfig() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!domain || !token) {
    throw new ShopifyError(
      "Mancano SHOPIFY_STORE_DOMAIN o SHOPIFY_STOREFRONT_ACCESS_TOKEN nelle variabili d'ambiente."
    );
  }
  return { domain, token };
}

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const { domain, token } = getConfig();

  const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new ShopifyError(`Shopify ha risposto con errore HTTP ${res.status}.`);
  }

  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) {
    throw new ShopifyError(json.errors.map((e) => e.message).join("; "));
  }
  if (!json.data) {
    throw new ShopifyError("Risposta vuota da Shopify.");
  }
  return json.data;
}
