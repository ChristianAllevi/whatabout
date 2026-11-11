import { discountPercent, formatMoney } from "@/lib/shopify/format";
import type { Money } from "@/lib/shopify/types";

// Prezzo scontato in evidenza, prezzo pieno barrato e percentuale di sconto.
export default function Price({
  price,
  compareAt,
  size = "md",
}: {
  price: Money;
  compareAt: Money | null;
  size?: "md" | "lg";
}) {
  const percent = discountPercent(price, compareAt);
  const main = size === "lg" ? "text-[32px]" : "text-[22px]";
  const old = size === "lg" ? "text-[20px]" : "text-[16px]";

  return (
    <p className="font-body flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className={`font-bold leading-none ${main} ${compareAt ? "text-accent" : "text-primary-dark"}`}>
        {formatMoney(price)}
      </span>
      {compareAt && (
        <>
          <s className={`leading-none opacity-60 ${old}`} aria-label={`Prezzo pieno ${formatMoney(compareAt)}`}>
            {formatMoney(compareAt)}
          </s>
          {percent !== null && (
            <span className="bg-white text-accent rounded-[2px] px-2 py-1 font-bold uppercase text-[11px] leading-none tracking-[0.04em]">
              −{percent}% preordine
            </span>
          )}
        </>
      )}
    </p>
  );
}
