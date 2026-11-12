import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import AddToCartButton from "@/components/shop/AddToCartButton";
import Price from "@/components/shop/Price";
import ProductCard from "@/components/shop/ProductCard";
import ProductGallery from "@/components/shop/ProductGallery";
import { getAvailability } from "@/lib/shopify/format";
import { getProduct, getRelatedProducts } from "@/lib/shopify/products";
import { DELIVERY_LABEL, SHOP_CONFIG, editionColor, splitProductTitle } from "@/lib/shop-config";

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return { title: "Prodotto non trovato — What About" };
  return {
    title: `${product.title} — What About`,
    description: product.description.slice(0, 160) || undefined,
  };
}

export default function ProductPage({ params }: Props) {
  return (
    <div className="px-8 md:px-[180px] pt-[130px] md:pt-[180px] pb-[100px] md:pb-[165px]">
      <Link
        href="/shop"
        className="inline-block font-body font-bold uppercase text-primary-dark text-[14px] leading-none mb-8 hover:text-accent transition-colors"
      >
        ← tutti i prodotti
      </Link>

      <Suspense fallback={<DetailSkeleton />}>
        <ProductContent params={params} />
      </Suspense>
    </div>
  );
}

async function ProductContent({ params }: Props) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const variant = product.variant;
  const availability = getAvailability(variant);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[60px] items-start">
        <ProductGallery images={product.images} title={product.title} background={editionColor(product)} />

        <div>
          <span className="inline-block bg-bg-light text-accent rounded-[2px] px-2 py-1 font-body font-bold uppercase text-[11px] leading-none tracking-[0.04em]">
            Preordine
          </span>

          <h1 className="mt-4 wa-h60 !text-[clamp(28px,3.2vw,48px)] text-primary-dark">
            <span className="block">{splitProductTitle(product.title)[0]}</span>
            {splitProductTitle(product.title)[1] && (
              <span className="block text-primary">{splitProductTitle(product.title)[1]}</span>
            )}
          </h1>

          {variant && (
            <div className="mt-6">
              <Price price={variant.price} compareAt={variant.compareAtPrice} size="lg" />
              <p className="mt-2 font-body text-[12px] font-bold text-primary-dark">
                Spedizione calcolata al checkout.
              </p>
            </div>
          )}

          <div className="mt-6 font-body text-[16px] leading-5 text-primary-dark">
            <p className="font-bold">{DELIVERY_LABEL}</p>
            <p className="font-light mt-1">{SHOP_CONFIG.pickupNote}</p>
            <p className="mt-3 font-bold text-accent">{availability.label}</p>
          </div>

          {product.descriptionHtml && (
            <div className="wa-richtext mt-6" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
          )}

          <AddToCartButton
            className="mt-8 max-w-[460px]"
            variantId={variant?.id ?? null}
            availability={availability}
            showQuantity
          />
        </div>
      </div>

      <Suspense fallback={null}>
        <RelatedProducts handle={handle} />
      </Suspense>
    </>
  );
}

async function RelatedProducts({ handle }: { handle: string }) {
  const related = await getRelatedProducts(handle);
  if (related.length === 0) return null;

  return (
    <section className="mt-[100px] md:mt-[140px]">
      <h2 className="wa-h60">
        <span className="block text-primary-dark">potrebbe</span>
        <span className="block text-accent">interessarti</span>
      </h2>
      <div className="mt-[40px] md:mt-[60px] grid grid-cols-1 md:grid-cols-3 gap-5">
        {related.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

function DetailSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[60px]" aria-hidden="true">
      <div className="aspect-square rounded-card bg-bg-light animate-pulse" />
      <div className="flex flex-col gap-4">
        <div className="h-6 w-24 rounded-[2px] bg-bg-light animate-pulse" />
        <div className="h-16 w-3/4 rounded-[2px] bg-bg-light animate-pulse" />
        <div className="h-24 w-full rounded-[2px] bg-bg-light animate-pulse" />
      </div>
    </div>
  );
}
