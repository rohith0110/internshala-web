"use client";

import type { Internship } from "@/app/lib/types";
import {
  CalendarIcon,
  ClockIcon,
  CompareIcon,
  HeartIcon,
  HomeIcon,
  MoneyIcon,
  PinIcon,
  StarIcon,
} from "./icons";

type Props = {
  data: Internship;
  saved: boolean;
  onToggleSave: () => void;
  compareSelected: boolean;
  onToggleCompare: () => void;
  canAddCompare: boolean;
};

function CompanyAvatar({
  url,
  name,
}: {
  url: string | null;
  name: string;
}) {
  const initial = (name.trim().charAt(0) || "?").toUpperCase();
  const hue = (name.charCodeAt(0) * 7) % 360;
  return (
    <div
      className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-lg text-base font-bold text-white"
      style={{ background: `hsl(${hue}deg 45% 55%)` }}
      aria-hidden
    >
      <span>{initial}</span>
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={name}
          loading="lazy"
          className="absolute inset-0 h-full w-full bg-white object-contain"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      ) : null}
    </div>
  );
}

export function InternshipCard({
  data,
  saved,
  onToggleSave,
  compareSelected,
  onToggleCompare,
  canAddCompare,
}: Props) {
  const isNew =
    data.postedAt > 0 &&
    Date.now() / 1000 - data.postedAt < 60 * 60 * 24 * 3;

  return (
    <article
      className={`group relative rounded-xl border bg-surface p-4 shadow-sm transition hover:border-brand/50 hover:shadow-md sm:p-5 ${
        data.isPremium ? "border-amber-200 dark:border-amber-700/40" : "border-border"
      }`}
    >
      {data.isPremium && (
        <span className="absolute -top-2 left-4 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow-sm">
          <StarIcon size={9} />
          Premium
        </span>
      )}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {isNew && (
            <span className="mb-1 inline-block rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
              New
            </span>
          )}
          <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground sm:text-[17px]">
            <a
              href={data.detailsUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand"
            >
              {data.title}
            </a>
          </h3>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
            <span className="text-foreground/85">{data.company}</span>
            <span className="inline-flex items-center rounded-full border border-brand/30 px-2 py-0.5 text-[10px] font-medium text-brand">
              Actively hiring
            </span>
          </p>
        </div>
        <CompanyAvatar url={data.companyLogoUrl} name={data.company} />
      </div>

      <ul className="mt-3 grid grid-cols-1 gap-y-1.5 text-sm text-foreground/80 sm:grid-cols-3 sm:gap-x-4">
        <li className="flex items-center gap-1.5">
          {data.isWorkFromHome ? (
            <>
              <HomeIcon size={14} className="text-muted" />
              <span>Work from home</span>
            </>
          ) : (
            <>
              <PinIcon size={14} className="text-muted" />
              <span className="truncate">
                {data.locations.length > 0
                  ? data.locations.slice(0, 2).join(", ") +
                    (data.locations.length > 2
                      ? ` +${data.locations.length - 2}`
                      : "")
                  : "Location flexible"}
              </span>
            </>
          )}
        </li>
        <li className="flex items-center gap-1.5">
          <MoneyIcon size={14} className="text-muted" />
          <span className="font-medium text-foreground">{data.stipendLabel}</span>
        </li>
        <li className="flex items-center gap-1.5">
          <CalendarIcon size={14} className="text-muted" />
          <span>{data.durationLabel}</span>
        </li>
      </ul>

      {data.badges.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {data.badges.slice(0, 5).map((b) => (
            <li
              key={b}
              className="rounded-full bg-pill px-2.5 py-0.5 text-[11px] font-medium text-foreground/70"
            >
              {b}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <ClockIcon size={12} />
          {data.postedLabel ?? data.postedOn ?? "Recently posted"}
          {data.isPartTime && (
            <>
              <span className="mx-1">•</span>
              <span>Part time</span>
            </>
          )}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onToggleCompare}
            disabled={!compareSelected && !canAddCompare}
            aria-pressed={compareSelected}
            title="Compare"
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition ${
              compareSelected
                ? "bg-brand text-white"
                : "text-foreground/70 hover:bg-pill disabled:cursor-not-allowed disabled:opacity-40"
            }`}
          >
            <CompareIcon size={14} />
            Compare
          </button>
          <button
            type="button"
            onClick={onToggleSave}
            aria-pressed={saved}
            aria-label={saved ? "Unsave" : "Save"}
            className={`grid h-8 w-8 place-items-center rounded-md transition ${
              saved
                ? "text-rose-500"
                : "text-foreground/60 hover:bg-pill hover:text-rose-500"
            }`}
          >
            <HeartIcon size={16} filled={saved} />
          </button>
          <a
            href={data.detailsUrl}
            target="_blank"
            rel="noreferrer"
            className="ml-1 rounded-md bg-brand px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-brand-strong"
          >
            View details
          </a>
        </div>
      </div>
    </article>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="shimmer h-4 w-2/3 rounded" />
          <div className="shimmer h-3 w-1/3 rounded" />
        </div>
        <div className="shimmer h-11 w-11 rounded-lg" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="shimmer h-3 rounded" />
        <div className="shimmer h-3 rounded" />
        <div className="shimmer h-3 rounded" />
      </div>
      <div className="mt-4 flex gap-2">
        <div className="shimmer h-5 w-16 rounded-full" />
        <div className="shimmer h-5 w-20 rounded-full" />
        <div className="shimmer h-5 w-14 rounded-full" />
      </div>
    </div>
  );
}
