import type { Metadata } from "next";
import { Suspense } from "react";
import ProductCard from "@/components/shop/ProductCard";
import { getProducts } from "@/lib/shopify/products";
import { DELIVERY_LABEL } from "@/lib/shop-config";

export const metadata: Metadata = {
  title: "Shop — What About",
  description: "Preordina The What About Tower: set Amicizia, set Famiglia e bundle.",
};

export default function ShopPage() {
  return (
    <section className="px-8 md:px-[180px] pt-[150px] md:pt-[190px] pb-[100px] md:pb-[165px]">
      <p className="font-body font-bold uppercase text-primary-dark text-[14px] leading-none mb-[22px] md:mb-[30px]">
        shop
      </p>
      <h1 className="wa-h60">
        <span className="block text-accent">preordina ora</span>
        <span className="block text-primary-dark">The What About Tower.</span>
      </h1>
      <p className="mt-5 font-body font-bold text-[16px] leading-5 text-primary-dark">{DELIVERY_LABEL}</p>

      <div className="mt-[50px] md:mt-[70px]">
        <Suspense fallback={<GridSkeleton />}>
          <ProductGrid />
        </Suspense>
      </div>
    </section>
  );
}

async function ProductGrid() {
  const products = await getProducts();

  if (products.length === 0) {
    return (
      <p className="font-body font-light text-[16px] leading-5 text-primary-dark">
        Nessun prodotto disponibile al momento. Torna a trovarci presto.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <div key={i} className="rounded-card bg-bg-light h-[560px] animate-pulse" />
      ))}
    </div>
  );
}
