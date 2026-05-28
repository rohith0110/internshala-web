import type { Internship, RawInternship } from "./types";

const LOGO_BASE = "https://internshala-uploads.internshala.com/logo%2F";

function parseDurationMonths(label: string | null | undefined): number {
  if (!label) return 0;
  const m = label.match(/(\d+(?:\.\d+)?)/);
  return m ? Number(m[1]) : 0;
}

function logoUrl(filename: string | null): string | null {
  if (!filename) return null;
  const direct = `${LOGO_BASE}${encodeURIComponent(filename)}.webp`;
  return `/api/logo?src=${encodeURIComponent(direct)}`;
}

function detailUrl(slug: string | null): string {
  if (!slug) return "https://internshala.com/internships/";
  if (slug.startsWith("http")) return slug;
  return `https://internshala.com/internship/detail/${slug}`;
}

export function normalize(raw: RawInternship): Internship {
  const stipendMin = raw.stipend?.salaryValue1 ?? 0;
  const stipendMax = raw.stipend?.salaryValue2 ?? stipendMin;
  const rawBadges = Array.isArray(raw.labels_app_in_card)
    ? raw.labels_app_in_card
    : [];
  const badges = rawBadges
    .filter((v): v is string => typeof v === "string" && v.length > 0)
    .filter((v, i, a) => a.indexOf(v) === i);

  return {
    id: raw.id,
    title: raw.title,
    company: (raw.company_name ?? "").trim(),
    companyLogoUrl: logoUrl(raw.company_logo),
    detailsUrl: detailUrl(raw.url),
    profile: raw.profile_name,
    durationMonths: parseDurationMonths(raw.duration),
    durationLabel: raw.duration,
    stipendMin,
    stipendMax,
    stipendLabel: raw.stipend?.salary ?? "Unpaid",
    stipendType: raw.stipend?.scale ?? "permonth",
    locations: raw.location_names ?? [],
    isWorkFromHome: !!raw.work_from_home,
    isPartTime: !!raw.part_time,
    isPremium: !!raw.is_premium,
    isInternational: !!raw.is_international_job,
    postedOn: raw.posted_on,
    postedAt: raw.postedOnDateTime ?? 0,
    postedLabel: raw.posted_by_label,
    startDate: raw.start_date,
    applicationDeadline: raw.application_deadline,
    badges,
  };
}
