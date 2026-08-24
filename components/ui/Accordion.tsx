"use client";

import { useState } from "react";

interface AccordionItem {
  q: string;
  a: string;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q} className="rounded-xl border border-border bg-surface">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-text-primary">{item.q}</span>
              <span
                className={`flex h-6 w-6 flex-none items-center justify-center rounded-full border border-border text-text-secondary transition-transform ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            {isOpen && (
              <p className="px-5 pb-4 text-sm leading-relaxed text-text-secondary">{item.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
