import React, { useId, useState } from 'react';
import { Plus } from 'lucide-react';

export interface AccordionEntry {
  question: string;
  answer: React.ReactNode;
}

/**
 * FAQ list where answers slide open instead of popping in. Closed answers stay
 * in the page for search engines but are inert, so keyboard and screen reader
 * users only land on the ones that are open.
 */
export const Accordion: React.FC<{ items: AccordionEntry[] }> = ({ items }) => {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const baseId = useId();

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const btnId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <div
            key={item.question}
            className={`rounded-2xl border bg-card transition-[border-color,box-shadow] duration-300 ${
              isOpen ? 'border-accent/40 shadow-[0_12px_30px_-18px_rgb(120_70_30/0.5)]' : 'border-line hover:border-edge'
            }`}
          >
            <h3 className="m-0 font-sans text-base">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-ink"
              >
                <span>{item.question}</span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-[transform,background-color,color] duration-300 ease-out ${
                    isOpen ? 'rotate-45 bg-accent text-white' : 'bg-accent-soft text-accent-2'
                  }`}
                  aria-hidden="true"
                >
                  <Plus className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className={`px-5 pb-5 text-[15px] leading-7 text-ink-2 transition-transform duration-300 ease-out ${
                    isOpen ? 'translate-y-0' : '-translate-y-1'
                  }`}
                >
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
