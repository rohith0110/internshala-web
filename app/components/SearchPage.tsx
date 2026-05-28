"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { normalize } from "@/app/lib/normalize";
import type {
  Internship,
  RawInternship,
  RawSearchResponse,
} from "@/app/lib/types";
import { CardSkeleton, InternshipCard } from "./InternshipCard";
import { CompareModal } from "./CompareModal";
import {
  ActiveChips,
  DEFAULT_FILTERS,
  FiltersDrawer,
  FiltersSidebar,
  type FiltersState,
} from "./Filters";
import { CompareIcon, FilterIcon, SparkleIcon } from "./icons";

const SORTS = [
  { id: "newest", label: "Newest" },
  { id: "stipend", label: "Stipend: high → low" },
  { id: "duration", label: "Duration: short → long" },
  { id: "company", label: "Company A → Z" },
] as const;
type SortId = (typeof SORTS)[number]["id"];

const SAVED_KEY = "internshala_saved_v1";

async function fetchPage(page: number): Promise<RawInternship[]> {
  const res = await fetch(`/api/internships?page=${page}`);
  if (!res.ok) throw new Error(`Page ${page} failed`);
  const data = (await res.json()) as RawSearchResponse;
  const ids = data.internship_ids ?? Object.keys(data.internships_meta ?? {});
  return ids
    .map((id) => data.internships_meta[String(id)])
    .filter(Boolean) as RawInternship[];
}

function dedupe<T extends { id: number }>(arr: T[]): T[] {
  const seen = new Set<number>();
  const out: T[] = [];
  for (const x of arr) {
    if (!seen.has(x.id)) {
      seen.add(x.id);
      out.push(x);
    }
  }
  return out;
}

function matches(i: Internship, f: FiltersState, saved: Set<number>): boolean {
  if (f.profiles.length && !f.profiles.includes(i.profile)) return false;
  if (
    f.locations.length &&
    !i.locations.some((loc) => f.locations.includes(loc))
  )
    return false;
  if (f.durations.length) {
    const maxAllowed = Math.max(...f.durations);
    if (i.durationMonths === 0 || i.durationMonths > maxAllowed) return false;
  }
  if (f.workFromHome && !i.isWorkFromHome) return false;
  if (f.partTime && !i.isPartTime) return false;
  if (f.savedOnly && !saved.has(i.id)) return false;
  if (f.preferencesOnly && !i.isPremium) return false;
  if (f.inMyCity) {
    if (i.isWorkFromHome) return false;
    if (i.isInternational) return false;
  }

  const [lo, hi] = f.stipend;
  const max = i.stipendMax || i.stipendMin;
  if (max < lo) return false;
  if (hi < 10000 && i.stipendMin > hi) return false;

  if (f.keyword.trim()) {
    const q = f.keyword.toLowerCase();
    const hay =
      `${i.title} ${i.company} ${i.profile} ${i.locations.join(" ")} ${i.badges.join(" ")}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

function sortInternships(list: Internship[], sort: SortId): Internship[] {
  const copy = [...list];
  switch (sort) {
    case "newest":
      copy.sort((a, b) => b.postedAt - a.postedAt);
      break;
    case "stipend":
      copy.sort(
        (a, b) =>
          (b.stipendMax || b.stipendMin) - (a.stipendMax || a.stipendMin),
      );
      break;
    case "duration":
      copy.sort((a, b) => a.durationMonths - b.durationMonths);
      break;
    case "company":
      copy.sort((a, b) => a.company.localeCompare(b.company));
      break;
  }
  return copy;
}

function avg(nums: number[]): number {
  if (nums.length === 0) return 0;
  return Math.round(nums.reduce((s, n) => s + n, 0) / nums.length);
}

export function SearchPage() {
  const [allRaw, setAllRaw] = useState<Internship[]>([]);
  const [loadedPages, setLoadedPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortId>("newest");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [saved, setSaved] = useState<Set<number>>(new Set());
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);

  const fetchingRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const consecutiveEmpty = useRef(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVED_KEY);
      if (raw) setSaved(new Set(JSON.parse(raw)));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify([...saved]));
    } catch {}
  }, [saved]);

  const loadNextPage = useCallback(async () => {
    if (fetchingRef.current || reachedEnd) return;
    fetchingRef.current = true;
    setFetchingMore(true);
    try {
      const nextPage = loadedPages + 1;
      const items = await fetchPage(nextPage);
      let addedNew = false;
      setAllRaw((prev) => {
        const merged = dedupe([...prev, ...items.map(normalize)]);
        addedNew = merged.length > prev.length;
        return merged;
      });
      setLoadedPages(nextPage);
      if (items.length === 0 || !addedNew) {
        consecutiveEmpty.current += 1;
        if (consecutiveEmpty.current >= 3) setReachedEnd(true);
      } else {
        consecutiveEmpty.current = 0;
      }
    } catch (e) {
      setError(String(e));
      setReachedEnd(true);
    } finally {
      fetchingRef.current = false;
      setFetchingMore(false);
      setLoading(false);
    }
  }, [loadedPages, reachedEnd]);

  useEffect(() => {
    loadNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || reachedEnd) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) loadNextPage();
      },
      { rootMargin: "400px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [loadNextPage, reachedEnd]);

  const profileOptions = useMemo(
    () => [...new Set(allRaw.map((i) => i.profile).filter(Boolean))].sort(),
    [allRaw],
  );
  const locationOptions = useMemo(
    () => [...new Set(allRaw.flatMap((i) => i.locations).filter(Boolean))].sort(),
    [allRaw],
  );

  const filtered = useMemo(() => {
    const matched = allRaw.filter((i) => matches(i, filters, saved));
    return sortInternships(matched, sort);
  }, [allRaw, filters, sort, saved]);

  const compareItems = useMemo(
    () =>
      compareIds
        .map((id) => allRaw.find((i) => i.id === id))
        .filter(Boolean) as Internship[],
    [compareIds, allRaw],
  );

  const stats = useMemo(() => {
    const wfhCount = filtered.filter((i) => i.isWorkFromHome).length;
    const stipendVals = filtered
      .map((i) => i.stipendMax || i.stipendMin)
      .filter((n) => n > 0);
    return {
      total: filtered.length,
      avgStipend: avg(stipendVals),
      wfhPct:
        filtered.length === 0
          ? 0
          : Math.round((wfhCount / filtered.length) * 100),
    };
  }, [filtered]);

  function toggleSave(id: number) {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function toggleCompare(id: number) {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-6 sm:py-6">
      <nav className="mb-3 text-xs text-muted">
        <a href="#" className="hover:text-brand">
          Home
        </a>
        <span className="mx-1.5">›</span>
        <span className="text-foreground/80">Internships</span>
      </nav>

      <div className="mb-4 text-center sm:mb-5">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          {loading
            ? "Loading internships…"
            : `${allRaw.length} Internships available`}
        </h1>
        <p className="mt-1 text-sm text-muted">
          {fetchingMore
            ? "Loading more as you scroll…"
            : "Latest internships for you"}
        </p>
      </div>

      <div className="flex gap-6">
        <FiltersSidebar
          state={filters}
          setState={setFilters}
          profileOptions={profileOptions}
          locationOptions={locationOptions}
          savedCount={saved.size}
          onClear={() => setFilters(DEFAULT_FILTERS)}
        />

        <section className="min-w-0 flex-1">
          <div className="mb-3 grid grid-cols-2 gap-2 rounded-xl border border-border bg-surface p-3 sm:grid-cols-4 sm:p-4">
            <Stat label="Showing" value={`${filtered.length}`} />
            <Stat
              label="Avg stipend"
              value={
                stats.avgStipend ? `₹${stats.avgStipend.toLocaleString()}` : "—"
              }
            />
            <Stat label="Work from home" value={`${stats.wfhPct}%`} />
            <Stat label="Saved" value={String(saved.size)} />
          </div>

          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <ActiveChips state={filters} setState={setFilters} />
            <div className="ml-auto flex items-center gap-2">
              <label className="hidden text-xs text-muted sm:inline">Sort:</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortId)}
                className="rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-foreground outline-none focus:border-brand"
                aria-label="Sort by"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-foreground lg:hidden"
              >
                <FilterIcon size={14} className="text-brand" />
                Filters
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-3 rounded-lg border border-rose-300/40 bg-rose-50 p-4 text-sm text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
              Could not load internships: {error}
            </div>
          )}

          {loading ? (
            <ul className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <li key={i}>
                  <CardSkeleton />
                </li>
              ))}
            </ul>
          ) : filtered.length === 0 ? (
            <EmptyState onClear={() => setFilters(DEFAULT_FILTERS)} />
          ) : (
            <>
              <ul className="space-y-3">
                {filtered.map((i) => (
                  <li key={i.id}>
                    <InternshipCard
                      data={i}
                      saved={saved.has(i.id)}
                      onToggleSave={() => toggleSave(i.id)}
                      compareSelected={compareIds.includes(i.id)}
                      onToggleCompare={() => toggleCompare(i.id)}
                      canAddCompare={compareIds.length < 3}
                    />
                  </li>
                ))}
              </ul>

              {!reachedEnd && (
                <div ref={sentinelRef} className="mt-4 space-y-3">
                  {fetchingMore ? (
                    Array.from({ length: 2 }).map((_, i) => (
                      <CardSkeleton key={i} />
                    ))
                  ) : (
                    <button
                      type="button"
                      onClick={loadNextPage}
                      className="mx-auto block rounded-lg border border-brand bg-brand-soft px-5 py-2 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white"
                    >
                      Load more
                    </button>
                  )}
                </div>
              )}

              <p className="mt-5 text-center text-xs text-muted">
                {reachedEnd
                  ? `That's all · ${allRaw.length} listings loaded`
                  : `Loaded ${loadedPages} ${loadedPages === 1 ? "page" : "pages"} · ${allRaw.length} listings so far`}
              </p>
            </>
          )}
        </section>
      </div>

      <FiltersDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        state={filters}
        setState={setFilters}
        profileOptions={profileOptions}
        locationOptions={locationOptions}
        savedCount={saved.size}
        onClear={() => setFilters(DEFAULT_FILTERS)}
      />

      {compareIds.length > 0 && (
        <div className="pointer-events-none fixed inset-x-0 bottom-3 z-30 flex justify-center px-3 sm:bottom-5">
          <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-border bg-surface px-3 py-2 shadow-lg sm:px-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground sm:text-sm">
              <CompareIcon size={16} className="text-brand" />
              {compareIds.length} selected
            </span>
            <button
              type="button"
              onClick={() => setCompareIds([])}
              className="text-xs text-muted hover:text-foreground"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setCompareOpen(true)}
              disabled={compareIds.length < 2}
              className="rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-white shadow disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
            >
              Compare now
            </button>
          </div>
        </div>
      )}

      <CompareModal
        open={compareOpen}
        items={compareItems}
        onClose={() => setCompareOpen(false)}
        onRemove={(id) => setCompareIds((p) => p.filter((x) => x !== id))}
      />
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] font-medium uppercase tracking-wide text-muted">
        {label}
      </span>
      <span className="text-base font-semibold text-foreground sm:text-lg">
        {value}
      </span>
    </div>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-surface p-8 text-center">
      <SparkleIcon size={28} className="mx-auto text-brand" />
      <p className="mt-2 text-sm font-medium">No internships match these filters</p>
      <p className="mt-1 text-xs text-muted">
        Try widening the stipend range or clearing some filters.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-3 rounded-md bg-brand px-3 py-1.5 text-xs font-semibold text-white"
      >
        Reset filters
      </button>
    </div>
  );
}
