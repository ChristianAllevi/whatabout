"use client";

import { useState } from "react";
import Image from "next/image";
import type { ShopImage } from "@/lib/shopify/types";

// Immagine del prodotto con puntini di navigazione quando le foto sono più di una.
export default function ProductGallery({
  images,
  title,
  background,
}: {
  images: ShopImage[];
  title: string;
  background: string;
}) {
  const [index, setIndex] = useState(0);
  const current = images[index];

  return (
    <div>
      <div
        className="relative w-full aspect-square overflow-hidden rounded-card"
        style={{ backgroundColor: background }}
      >
        {current ? (
          <Image
            key={current.url}
            src={current.url}
            alt={current.altText ?? title}
            fill
            priority
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center font-body text-[14px] text-primary-dark/50">
            foto in arrivo
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Foto del prodotto">
          {images.map((img, i) => (
            <button
              key={img.url}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Foto ${i + 1} di ${images.length}`}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === index ? "bg-primary-dark" : "bg-primary-dark/25"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
