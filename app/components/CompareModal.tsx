"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Internship } from "@/app/lib/types";
import { CloseIcon } from "./icons";

type Props = {
  open: boolean;
  items: Internship[];
  onClose: () => void;
  onRemove: (id: number) => void;
};

const rows: { label: string; render: (i: Internship) => React.ReactNode }[] = [
  { label: "Company", render: (i) => i.company || "—" },
  { label: "Profile", render: (i) => i.profile || "—" },
  { label: "Stipend", render: (i) => i.stipendLabel || "—" },
  { label: "Duration", render: (i) => i.durationLabel || "—" },
  {
    label: "Location",
    render: (i) =>
      i.isWorkFromHome
        ? "Work from home"
        : i.locations.length
          ? i.locations.join(", ")
          : "—",
  },
  { label: "Start date", render: (i) => i.startDate || "—" },
  { label: "Apply by", render: (i) => i.applicationDeadline || "—" },
  { label: "Part-time", render: (i) => (i.isPartTime ? "Yes" : "No") },
  { label: "Posted", render: (i) => i.postedOn || "—" },
];

export function CompareModal({ open, items, onClose, onRemove }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!open || !mounted) return null;
  return createPortal(
    <div
      className="fixed z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4"
      style={{ top: 0, right: 0, bottom: 0, left: 0 }}
    >
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl bg-surface shadow-2xl sm:rounded-2xl">
        <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
          <h2 className="text-base font-semibold">
            Compare ({items.length})
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 place-items-center rounded-full hover:bg-pill"
          >
            <CloseIcon size={16} />
          </button>
        </div>
        <div className="overflow-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="bg-pill/60">
                <th className="sticky left-0 z-10 bg-pill/80 px-4 py-3 text-left font-medium text-muted">
                  Attribute
                </th>
                {items.map((i) => (
                  <th
                    key={i.id}
                    className="min-w-[180px] border-l border-border px-4 py-3 text-left"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <a
                        href={i.detailsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="line-clamp-2 font-semibold text-foreground hover:text-brand"
                      >
                        {i.title}
                      </a>
                      <button
                        onClick={() => onRemove(i.id)}
                        aria-label="Remove from compare"
                        className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-muted hover:bg-pill hover:text-foreground"
                      >
                        <CloseIcon size={12} />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-t border-border">
                  <td className="sticky left-0 bg-surface px-4 py-2.5 font-medium text-muted">
                    {r.label}
                  </td>
                  {items.map((i) => (
                    <td
                      key={i.id}
                      className="border-l border-border px-4 py-2.5 text-foreground/90"
                    >
                      {r.render(i)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>,
    document.body,
  );
}
