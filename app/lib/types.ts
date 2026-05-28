export type RawLocation = {
  string: string;
  link: string | null;
  country: string | null;
  region: string | null;
  locationName: string;
};

export type RawStipend = {
  salary: string;
  salaryValue1: number | null;
  salaryValue2: number | null;
  salaryType: string;
  currency: string;
  scale: string;
};

export type RawInternship = {
  id: number;
  title: string;
  company_name: string;
  company_logo: string | null;
  company_url: string | null;
  url: string;
  profile_name: string;
  duration: string;
  stipend: RawStipend;
  start_date: string;
  posted_on: string;
  posted_by_label: string | null;
  postedOnDateTime: number;
  application_deadline: string;
  expires_at: string;
  location_names: string[];
  locations: RawLocation[];
  work_from_home: boolean;
  part_time: boolean;
  is_premium: boolean;
  is_active: boolean;
  labels: unknown[];
  labels_app_in_card: string[];
  is_international_job: boolean;
};

export type RawSearchResponse = {
  internships_meta: Record<string, RawInternship>;
  internship_ids: number[];
};

export type Internship = {
  id: number;
  title: string;
  company: string;
  companyLogoUrl: string | null;
  detailsUrl: string;
  profile: string;
  durationMonths: number;
  durationLabel: string;
  stipendMin: number;
  stipendMax: number;
  stipendLabel: string;
  stipendType: string;
  locations: string[];
  isWorkFromHome: boolean;
  isPartTime: boolean;
  isPremium: boolean;
  isInternational: boolean;
  postedOn: string;
  postedAt: number;
  postedLabel: string | null;
  startDate: string;
  applicationDeadline: string;
  badges: string[];
};
