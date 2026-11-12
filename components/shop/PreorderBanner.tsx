"use client";

import { useEffect, useId, useRef, useState } from "react";
import { DELIVERY_LABEL, PREORDER_INFO } from "@/lib/shop-config";

// Banner "preordine" in cima alla card: hover su desktop, tap su mobile mostra la spiegazione.
export default function PreorderBanner() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const infoId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={infoId}
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-center gap-2 bg-accent text-white px-5 py-3 font-body font-medium text-[14px] leading-4 cursor-pointer"
      >
        <span>{DELIVERY_LABEL}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 7v4.2M8 4.8v.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div
          id={infoId}
          role="tooltip"
          className="absolute left-0 right-0 top-full z-10 bg-primary-dark text-white px-5 py-3 font-body text-[13px] leading-4 shadow-lg"
        >
          {PREORDER_INFO}
        </div>
      )}
    </div>
  );
}
