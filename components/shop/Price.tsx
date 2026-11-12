import { discountPercent, formatMoney } from "@/lib/shopify/format";
import type { Money } from "@/lib/shopify/types";

// Prezzo scontato in evidenza (font display rosa), prezzo pieno barrato e badge sconto blu.
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
  const main = size === "lg" ? "text-[44px]" : "text-[40px]";
  const old = size === "lg" ? "text-[20px]" : "text-[16px]";

  return (
    <p className="font-body flex flex-wrap items-center gap-x-3 gap-y-2">
      <span
        className={`uppercase leading-none ${main} ${compareAt ? "text-accent" : "text-primary-dark"}`}
        style={{ fontFamily: "DX Playhigh Expanded" }}
      >
        {formatMoney(price)}
      </span>
      {compareAt && (
        <>
          <s className={`leading-none text-primary-dark ${old}`} aria-label={`Prezzo pieno ${formatMoney(compareAt)}`}>
            {formatMoney(compareAt)}
          </s>
          {percent !== null && (
            <span className="bg-primary text-white rounded-[2px] px-2 py-1.5 font-medium uppercase text-[13px] leading-none">
              −{percent}% in preordine
            </span>
          )}
        </>
      )}
    </p>
  );
}
