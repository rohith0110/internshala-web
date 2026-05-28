import type { SVGProps } from "react";

const base = "shrink-0";

export function Icon({
  path,
  className = "",
  size = 16,
  ...rest
}: { path: React.ReactNode; size?: number; className?: string } & Omit<
  SVGProps<SVGSVGElement>,
  "path"
>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${base} ${className}`}
      {...rest}
    >
      {path}
    </svg>
  );
}

export const HomeIcon = (p: { size?: number; className?: string }) => (
  <Icon
    {...p}
    path={
      <>
        <path d="M3 11l9-8 9 8" />
        <path d="M5 9.5V21h14V9.5" />
      </>
    }
  />
);

export const MoneyIcon = (p: { size?: number; className?: string }) => (
  <Icon
    {...p}
    path={
      <>
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M6 9v6M18 9v6" />
      </>
    }
  />
);

export const CalendarIcon = (p: { size?: number; className?: string }) => (
  <Icon
    {...p}
    path={
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 11h18" />
      </>
    }
  />
);

export const PinIcon = (p: { size?: number; className?: string }) => (
  <Icon
    {...p}
    path={
      <>
        <path d="M12 21s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12z" />
        <circle cx="12" cy="9" r="2.5" />
      </>
    }
  />
);

export const ClockIcon = (p: { size?: number; className?: string }) => (
  <Icon
    {...p}
    path={
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    }
  />
);

export const SearchIcon = (p: { size?: number; className?: string }) => (
  <Icon
    {...p}
    path={
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </>
    }
  />
);

export const FilterIcon = (p: { size?: number; className?: string }) => (
  <Icon
    {...p}
    path={
      <>
        <path d="M3 5h18l-7 9v6l-4-2v-4z" />
      </>
    }
  />
);

export const SunIcon = (p: { size?: number; className?: string }) => (
  <Icon
    {...p}
    path={
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    }
  />
);

export const MoonIcon = (p: { size?: number; className?: string }) => (
  <Icon
    {...p}
    path={<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />}
  />
);

export const HeartIcon = ({
  filled = false,
  ...p
}: { size?: number; className?: string; filled?: boolean }) => (
  <svg
    width={p.size ?? 16}
    height={p.size ?? 16}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`shrink-0 ${p.className ?? ""}`}
  >
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

export const CloseIcon = (p: { size?: number; className?: string }) => (
  <Icon
    {...p}
    path={
      <>
        <path d="M6 6l12 12M18 6L6 18" />
      </>
    }
  />
);

export const SparkleIcon = (p: { size?: number; className?: string }) => (
  <Icon
    {...p}
    path={
      <>
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
      </>
    }
  />
);

export const CompareIcon = (p: { size?: number; className?: string }) => (
  <Icon
    {...p}
    path={
      <>
        <path d="M3 6h7M3 12h7M3 18h7" />
        <path d="M14 6h7M14 12h7M14 18h7" />
        <path d="M12 3v18" />
      </>
    }
  />
);

export const ChevronDown = (p: { size?: number; className?: string }) => (
  <Icon {...p} path={<path d="M6 9l6 6 6-6" />} />
);

export const MenuIcon = (p: { size?: number; className?: string }) => (
  <Icon
    {...p}
    path={
      <>
        <path d="M4 6h16M4 12h16M4 18h16" />
      </>
    }
  />
);

export const StarIcon = (p: { size?: number; className?: string }) => (
  <Icon
    {...p}
    path={
      <path
        d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.7L12 16.6 6.8 19l1-5.7L3.5 9.2l5.9-.9z"
        fill="currentColor"
      />
    }
  />
);

export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`block bg-no-repeat ${className}`}
      style={{
        width: 113,
        height: 31,
        backgroundImage: "url('/internshala-sprite.png')",
        backgroundSize: "452px",
        backgroundPosition: "0px 0px",
      }}
      role="img"
      aria-label="Internshala"
    />
  );
}
