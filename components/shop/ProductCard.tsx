import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/shop/AddToCartButton";
import Price from "@/components/shop/Price";
import { getAvailability } from "@/lib/shopify/format";
import { DELIVERY_LABEL, editionColor } from "@/lib/shop-config";
import type { Product } from "@/lib/shopify/types";

// Card prodotto: stessa impostazione delle card edizione della pagina The What About Tower.
export default function ProductCard({ product }: { product: Product }) {
  const variant = product.variant;
  const availability = getAvailability(variant);
  const image = product.images[0];
  const href = `/shop/${product.handle}`;

  return (
    <article
      className="relative overflow-hidden rounded-card p-5 flex flex-col"
      style={{ backgroundColor: editionColor(product) }}
    >
      <Link
        href={href}
        aria-label={product.title}
        className="relative block w-full aspect-square overflow-hidden rounded-[2px] bg-white"
      >
        {image ? (
          <Image
            src={image.url}
            alt={image.altText ?? product.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center font-body text-[14px] text-primary-dark/50">
            foto in arrivo
          </span>
        )}
      </Link>

      <div className="mt-5 flex flex-col flex-1">
        <span className="self-start bg-white text-accent rounded-[2px] px-2 py-1 font-body font-bold uppercase text-[11px] leading-none tracking-[0.04em]">
          Preordine
        </span>

        <h3 className="mt-3 uppercase leading-[0.95] text-[26px] text-primary-dark" style={{ fontFamily: "DX Playhigh Expanded" }}>
          <Link href={href}>{product.title}</Link>
        </h3>

        {variant && (
          <div className="mt-4">
            <Price price={variant.price} compareAt={variant.compareAtPrice} />
          </div>
        )}

        <p className="mt-3 font-body text-[13px] leading-4 text-primary-dark">
          <span className="font-bold">{availability.label}</span>
          <br />
          {DELIVERY_LABEL}
        </p>

        <AddToCartButton className="mt-auto pt-5" variantId={variant?.id ?? null} availability={availability} />
      </div>
    </article>
  );
}
