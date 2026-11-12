import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/shop/AddToCartButton";
import Price from "@/components/shop/Price";
import PreorderBanner from "@/components/shop/PreorderBanner";
import { getAvailability } from "@/lib/shopify/format";
import { editionColor, splitProductTitle } from "@/lib/shop-config";
import type { Product } from "@/lib/shopify/types";

// Card prodotto: banner preordine in alto, immagine al vivo, titolo su due righe, prezzo e CTA.
export default function ProductCard({ product }: { product: Product }) {
  const variant = product.variant;
  const availability = getAvailability(variant);
  const image = product.images[0];
  const href = `/shop/${product.handle}`;
  const [line1, line2] = splitProductTitle(product.title);

  return (
    <article
      className="relative overflow-hidden rounded-card flex flex-col"
      style={{ backgroundColor: "#FFF8E6" }}
    >
      <PreorderBanner />

      <Link
        href={href}
        aria-label={product.title}
        className="relative block w-full aspect-[387/347] overflow-hidden"
        style={{ backgroundColor: editionColor(product) }}
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

      <div className="p-5 flex flex-col flex-1">
        <p className="font-body text-[14px] leading-4 text-primary-dark">{availability.label}</p>

        <h3 className="mt-2 uppercase leading-[0.95] text-[40px]" style={{ fontFamily: "DX Playhigh Expanded" }}>
          <Link href={href} className="block">
            <span className="block text-primary-dark">{line1}</span>
            {line2 && <span className="block text-primary">{line2}</span>}
          </Link>
        </h3>

        {variant && (
          <div className="mt-4">
            <Price price={variant.price} compareAt={variant.compareAtPrice} />
          </div>
        )}

        <div className="mt-auto pt-5 flex flex-col gap-3">
          <Link
            href={href}
            className="inline-flex items-center justify-center h-[44px] px-6 rounded-[4px] border-[1.5px] border-primary-dark text-primary-dark font-medium text-[16px] leading-none uppercase hover:bg-primary-dark hover:text-white transition-colors"
            style={{ fontFamily: "Funnel Display, sans-serif" }}
          >
            vedi prodotto
          </Link>
          <AddToCartButton variantId={variant?.id ?? null} availability={availability} />
        </div>
      </div>
    </article>
  );
}
