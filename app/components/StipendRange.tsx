"use client";

import { useCallback, useMemo } from "react";

type Props = {
  min: number;
  max: number;
  value: [number, number];
  step?: number;
  onChange: (next: [number, number]) => void;
  format?: (n: number) => string;
};

const TICKS = [0, 2000, 4000, 6000, 8000, 10000];

export function StipendRange({
  min,
  max,
  value,
  step = 500,
  onChange,
  format = (n) => (n >= 1000 ? `${n / 1000}K` : String(n)),
}: Props) {
  const [lo, hi] = value;

  const pctLo = useMemo(() => ((lo - min) / (max - min)) * 100, [lo, min, max]);
  const pctHi = useMemo(() => ((hi - min) / (max - min)) * 100, [hi, min, max]);

  const setLo = useCallback(
    (n: number) => onChange([Math.min(n, hi - step), hi]),
    [hi, onChange, step],
  );
  const setHi = useCallback(
    (n: number) => onChange([lo, Math.max(n, lo + step)]),
    [lo, onChange, step],
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-muted">
        <span>
          Min <span className="font-semibold text-foreground">₹{lo.toLocaleString()}</span>
        </span>
        <span>
          Max{" "}
          <span className="font-semibold text-foreground">
            {hi >= max ? `₹${max.toLocaleString()}+` : `₹${hi.toLocaleString()}`}
          </span>
        </span>
      </div>
      <div className="relative h-6">
        <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-border" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-brand"
          style={{ left: `${pctLo}%`, right: `${100 - pctHi}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={lo}
          onChange={(e) => setLo(Number(e.target.value))}
          className="absolute inset-0 w-full"
          aria-label="Minimum stipend"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={hi}
          onChange={(e) => setHi(Number(e.target.value))}
          className="absolute inset-0 w-full"
          aria-label="Maximum stipend"
        />
      </div>
      <div className="flex justify-between text-[10px] font-medium text-muted">
        {TICKS.map((t) => (
          <span key={t}>{format(t)}</span>
        ))}
      </div>
    </div>
  );
}
