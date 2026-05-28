"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, CloseIcon, FilterIcon, HeartIcon } from "./icons";
import { StipendRange } from "./StipendRange";

export type FiltersState = {
  profiles: string[];
  locations: string[];
  durations: number[];
  stipend: [number, number];
  workFromHome: boolean;
  partTime: boolean;
  savedOnly: boolean;
  preferencesOnly: boolean;
  inMyCity: boolean;
  keyword: string;
};

export const DEFAULT_FILTERS: FiltersState = {
  profiles: [],
  locations: [],
  durations: [],
  stipend: [0, 10000],
  workFromHome: false,
  partTime: false,
  savedOnly: false,
  preferencesOnly: false,
  inMyCity: false,
  keyword: "",
};

const DURATION_OPTIONS = [1, 2, 3, 4, 6];

type Props = {
  state: FiltersState;
  setState: (next: FiltersState) => void;
  profileOptions: string[];
  locationOptions: string[];
  savedCount: number;
  onClear: () => void;
};

function MultiSelect({
  label,
  placeholder,
  options,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  options: string[];
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options.slice(0, 8);
    return options
      .filter((o) => o.toLowerCase().includes(q) && !value.includes(o))
      .slice(0, 8);
  }, [query, options, value]);

  function add(opt: string) {
    if (!value.includes(opt)) onChange([...value, opt]);
    setQuery("");
  }
  function remove(opt: string) {
    onChange(value.filter((v) => v !== opt));
  }

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
        {open && filtered.length > 0 && (
          <ul className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-border bg-surface py-1 shadow-lg">
            {filtered.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    add(opt);
                  }}
                  className="w-full px-3 py-1.5 text-left text-sm text-foreground hover:bg-brand-soft hover:text-brand"
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {value.length > 0 && (
        <ul className="flex flex-wrap gap-1.5 pt-1">
          {value.map((v) => (
            <li
              key={v}
              className="flex items-center gap-1 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-medium text-brand"
            >
              <span>{v}</span>
              <button
                type="button"
                onClick={() => remove(v)}
                aria-label={`Remove ${v}`}
                className="grid h-4 w-4 place-items-center rounded-full hover:bg-brand/20"
              >
                <CloseIcon size={10} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterCheckbox({
  label,
  checked,
  onChange,
}: {
  label: React.ReactNode;
  checked: boolean;
  onChange: (b: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground/90">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 cursor-pointer accent-[color:var(--brand)]"
      />
      <span>{label}</span>
    </label>
  );
}

export function FiltersBody({
  state,
  setState,
  profileOptions,
  locationOptions,
  savedCount,
  onClear,
}: Props) {
  return (
    <div className="space-y-5">
      <FilterCheckbox
        label={
          <span>
            As per my{" "}
            <a href="#" className="text-brand hover:underline">
              preferences
            </a>
          </span>
        }
        checked={state.preferencesOnly}
        onChange={(b) => setState({ ...state, preferencesOnly: b })}
      />

      <MultiSelect
        label="Profile"
        placeholder="e.g. Marketing"
        options={profileOptions}
        value={state.profiles}
        onChange={(profiles) => setState({ ...state, profiles })}
      />

      <MultiSelect
        label="Location"
        placeholder="e.g. Delhi"
        options={locationOptions}
        value={state.locations}
        onChange={(locations) => setState({ ...state, locations })}
      />

      <div className="space-y-2">
        <FilterCheckbox
          label="Internships in my city"
          checked={state.inMyCity}
          onChange={(b) => setState({ ...state, inMyCity: b })}
        />
        <FilterCheckbox
          label="Work from home"
          checked={state.workFromHome}
          onChange={(b) => setState({ ...state, workFromHome: b })}
        />
        <FilterCheckbox
          label="Part-time"
          checked={state.partTime}
          onChange={(b) => setState({ ...state, partTime: b })}
        />
        <FilterCheckbox
          label={
            <span className="inline-flex items-center gap-1.5">
              <HeartIcon size={14} className="text-rose-500" filled />
              Saved only{" "}
              <span className="text-xs text-muted">({savedCount})</span>
            </span>
          }
          checked={state.savedOnly}
          onChange={(b) => setState({ ...state, savedOnly: b })}
        />
      </div>

      <div className="space-y-2">
        <span className="text-sm font-medium text-foreground">
          Desired monthly stipend (₹)
        </span>
        <StipendRange
          min={0}
          max={10000}
          step={500}
          value={state.stipend}
          onChange={(stipend) => setState({ ...state, stipend })}
        />
      </div>

      <div className="space-y-2">
        <span className="text-sm font-medium text-foreground">Duration</span>
        <div className="flex flex-wrap gap-1.5">
          {DURATION_OPTIONS.map((d) => {
            const active = state.durations.includes(d);
            return (
              <button
                key={d}
                type="button"
                onClick={() =>
                  setState({
                    ...state,
                    durations: active
                      ? state.durations.filter((x) => x !== d)
                      : [...state.durations, d],
                  })
                }
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  active
                    ? "border-brand bg-brand text-white"
                    : "border-border bg-surface text-foreground hover:border-brand"
                }`}
              >
                ≤ {d} {d === 1 ? "month" : "months"}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={onClear}
        className="w-full rounded-lg border border-border py-2 text-sm font-medium text-brand transition hover:bg-brand-soft"
      >
        Clear all filters
      </button>
    </div>
  );
}

export function FiltersSidebar(props: Props) {
  return (
    <aside className="hidden lg:block lg:w-72 lg:shrink-0">
      <div className="sticky top-20 space-y-4">
        <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-center gap-2 border-b border-border pb-3 text-base font-semibold">
            <FilterIcon size={16} className="text-brand" />
            Filters
          </div>
          <FiltersBody {...props} />
        </div>
        <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
          <label className="mb-2 block text-center text-base font-semibold">
            Keyword Search
          </label>
          <input
            value={props.state.keyword}
            onChange={(e) =>
              props.setState({ ...props.state, keyword: e.target.value })
            }
            placeholder="e.g. Design, Mumbai, Infosys"
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </div>
      </div>
    </aside>
  );
}

export function FiltersDrawer({
  open,
  onClose,
  ...props
}: Props & { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!open || !mounted) return null;
  return createPortal(
    <div
      className="fixed z-40 lg:hidden"
      style={{ top: 0, right: 0, bottom: 0, left: 0 }}
    >
      <div
        className="absolute bg-black/40"
        style={{ top: 0, right: 0, bottom: 0, left: 0 }}
        onClick={onClose}
        aria-hidden
      />
      <div
        className="absolute max-h-[90vh] overflow-auto rounded-t-2xl bg-surface p-4 shadow-2xl"
        style={{ left: 0, right: 0, bottom: 0 }}
      >
        <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2 text-base font-semibold">
            <FilterIcon size={16} className="text-brand" />
            Filters
          </div>
          <button
            onClick={onClose}
            aria-label="Close filters"
            className="grid h-8 w-8 place-items-center rounded-full hover:bg-pill"
          >
            <CloseIcon size={16} />
          </button>
        </div>
        <FiltersBody {...props} />
        <button
          onClick={onClose}
          className="mt-4 w-full rounded-lg bg-brand py-2.5 text-sm font-semibold text-white"
        >
          Show results
        </button>
      </div>
    </div>,
    document.body,
  );
}

export function ActiveChips({
  state,
  setState,
}: {
  state: FiltersState;
  setState: (s: FiltersState) => void;
}) {
  const chips: { label: string; clear: () => void }[] = [];
  state.profiles.forEach((p) =>
    chips.push({
      label: p,
      clear: () =>
        setState({ ...state, profiles: state.profiles.filter((x) => x !== p) }),
    }),
  );
  state.locations.forEach((p) =>
    chips.push({
      label: p,
      clear: () =>
        setState({
          ...state,
          locations: state.locations.filter((x) => x !== p),
        }),
    }),
  );
  state.durations.forEach((d) =>
    chips.push({
      label: `≤ ${d} mo`,
      clear: () =>
        setState({
          ...state,
          durations: state.durations.filter((x) => x !== d),
        }),
    }),
  );
  if (state.workFromHome)
    chips.push({
      label: "Work from home",
      clear: () => setState({ ...state, workFromHome: false }),
    });
  if (state.partTime)
    chips.push({
      label: "Part-time",
      clear: () => setState({ ...state, partTime: false }),
    });
  if (state.savedOnly)
    chips.push({
      label: "Saved only",
      clear: () => setState({ ...state, savedOnly: false }),
    });
  if (state.preferencesOnly)
    chips.push({
      label: "My preferences",
      clear: () => setState({ ...state, preferencesOnly: false }),
    });
  if (state.inMyCity)
    chips.push({
      label: "In my city",
      clear: () => setState({ ...state, inMyCity: false }),
    });
  if (state.stipend[0] > 0 || state.stipend[1] < 10000)
    chips.push({
      label: `₹${state.stipend[0]} – ${
        state.stipend[1] >= 10000 ? "10K+" : `${state.stipend[1]}`
      }`,
      clear: () => setState({ ...state, stipend: [0, 10000] }),
    });

  if (chips.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {chips.map((c) => (
        <li
          key={c.label}
          className="flex items-center gap-1 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-medium text-brand"
        >
          <span>{c.label}</span>
          <button
            type="button"
            onClick={c.clear}
            aria-label={`Remove ${c.label}`}
            className="grid h-4 w-4 place-items-center rounded-full hover:bg-brand/20"
          >
            <CloseIcon size={10} />
          </button>
        </li>
      ))}
    </ul>
  );
}
