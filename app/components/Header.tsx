"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  BrandLogo,
  ChevronDown,
  CloseIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
} from "./icons";

type MenuSection = {
  heading: string;
  links: { label: string; href: string; tag?: string }[];
};

const INTERNSHIPS_MENU: MenuSection[] = [
  {
    heading: "Top Locations",
    links: [
      { label: "Work from Home", href: "https://internshala.com/internships/work-from-home-internships/" },
      { label: "Internship in Bangalore", href: "https://internshala.com/internships/internship-in-bangalore/" },
      { label: "Internship in Delhi", href: "https://internshala.com/internships/internship-in-delhi/" },
      { label: "Internship in Hyderabad", href: "https://internshala.com/internships/internship-in-hyderabad/" },
      { label: "Internship in Mumbai", href: "https://internshala.com/internships/internship-in-mumbai/" },
      { label: "Internship in Chennai", href: "https://internshala.com/internships/internship-in-chennai/" },
      { label: "Internship in Pune", href: "https://internshala.com/internships/internship-in-pune/" },
      { label: "International Internship", href: "https://internshala.com/internships/international-internship/" },
    ],
  },
  {
    heading: "Profile",
    links: [
      { label: "Computer Science", href: "https://internshala.com/internships/computer-science-internship/" },
      { label: "Marketing", href: "https://internshala.com/internships/marketing-internship/" },
      { label: "Finance", href: "https://internshala.com/internships/finance-internship/" },
      { label: "Graphic Design", href: "https://internshala.com/internships/graphic-design-internship/" },
      { label: "HR", href: "https://internshala.com/internships/hr-internship/" },
      { label: "Digital Marketing", href: "https://internshala.com/internships/digital-marketing-internship/" },
      { label: "Content Writing", href: "https://internshala.com/internships/content-writing-internship/" },
    ],
  },
  {
    heading: "Top Categories",
    links: [
      { label: "Engineering", href: "https://internshala.com/internships/engineering-internship/" },
      { label: "Business / MBA", href: "https://internshala.com/internships/mba-internship/" },
      { label: "Humanities", href: "https://internshala.com/internships/humanities-internship/" },
      { label: "Science", href: "https://internshala.com/internships/science-internship/" },
      { label: "With Job Offer", href: "https://internshala.com/internships/ppo-true/" },
      { label: "Part-Time", href: "https://internshala.com/internships/part-time-jobs/" },
      { label: "For Women", href: "https://internshala.com/internships-for-women/" },
    ],
  },
];

const COURSES_MENU: MenuSection[] = [
  {
    heading: "Certification Courses",
    links: [
      { label: "AI & Machine Learning", href: "https://trainings.internshala.com/artificial-intelligence-and-machine-learning-course/", tag: "Trending" },
      { label: "Microsoft Generative AI", href: "https://trainings.internshala.com/upgrad_course/" },
      { label: "Python Programming", href: "https://trainings.internshala.com/python-course/" },
      { label: "Core Java", href: "https://trainings.internshala.com/java-course/" },
      { label: "React Course", href: "https://trainings.internshala.com/react-course/" },
      { label: "Full Stack Web Dev", href: "https://trainings.internshala.com/web-development-course/" },
      { label: "Digital Marketing", href: "https://trainings.internshala.com/digital-marketing-course/" },
    ],
  },
  {
    heading: "Career Launchpads",
    links: [
      { label: "Web Development", href: "https://trainings.internshala.com/web-developer-launchpad/" },
      { label: "Data Science", href: "https://trainings.internshala.com/data-science-launchpad/" },
      { label: "Digital Marketing", href: "https://trainings.internshala.com/digital-marketing-launchpad/" },
      { label: "HR Management", href: "https://trainings.internshala.com/human-resource-management-launchpad/" },
    ],
  },
  {
    heading: "Online Degrees",
    links: [
      { label: "Online MBA", href: "https://internshala.com/onlinedegrees/online-mba/" },
      { label: "Online BCA", href: "https://internshala.com/onlinedegrees/online-bca/" },
      { label: "Online MCA", href: "https://internshala.com/onlinedegrees/online-mca/" },
      { label: "Online BBA", href: "https://internshala.com/onlinedegrees/online-bba/" },
    ],
  },
];

const JOBS_MENU: MenuSection[] = [
  {
    heading: "Top Locations",
    links: [
      { label: "Work from home", href: "https://internshala.com/jobs/work-from-home/" },
      { label: "Bangalore", href: "https://internshala.com/jobs/jobs-in-bangalore/" },
      { label: "Delhi", href: "https://internshala.com/jobs/jobs-in-delhi/" },
      { label: "Hyderabad", href: "https://internshala.com/jobs/jobs-in-hyderabad/" },
      { label: "Mumbai", href: "https://internshala.com/jobs/jobs-in-mumbai/" },
      { label: "Pune", href: "https://internshala.com/jobs/jobs-in-pune/" },
      { label: "Chennai", href: "https://internshala.com/jobs/jobs-in-chennai/" },
    ],
  },
  {
    heading: "Top Categories",
    links: [
      { label: "Data Entry", href: "https://internshala.com/jobs/data-entry-jobs/" },
      { label: "Content Writing", href: "https://internshala.com/jobs/content-writing-jobs/" },
      { label: "Digital Marketing", href: "https://internshala.com/jobs/digital-marketing-jobs/" },
      { label: "Data Science", href: "https://internshala.com/jobs/data-science-jobs/" },
      { label: "HR Jobs", href: "https://internshala.com/jobs/hr-jobs/" },
      { label: "MBA Jobs", href: "https://internshala.com/jobs/mba-jobs/" },
      { label: "Part Time", href: "https://internshala.com/jobs/part-time-jobs/" },
    ],
  },
  {
    heading: "Fresher Jobs",
    links: [
      { label: "Work from home", href: "https://internshala.com/fresher-jobs/work-from-home/" },
      { label: "Bangalore", href: "https://internshala.com/fresher-jobs/jobs-in-bangalore/" },
      { label: "Delhi", href: "https://internshala.com/fresher-jobs/jobs-in-delhi/" },
      { label: "MBA Fresher Jobs", href: "https://internshala.com/fresher-jobs/mba-jobs/" },
      { label: "View all fresher jobs", href: "https://internshala.com/fresher-jobs/" },
    ],
  },
];

function NavDropdown({
  label,
  sections,
  active = false,
  badge,
}: {
  label: string;
  sections: MenuSection[];
  active?: boolean;
  badge?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openSoon() {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  }
  function closeSoon() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 120);
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={openSoon}
      onMouseLeave={closeSoon}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition ${
          active
            ? "text-brand border-b-2 border-brand"
            : "text-foreground/85 hover:text-brand"
        }`}
        aria-expanded={open}
      >
        {label}
        {badge && (
          <span className="ml-1 rounded-sm bg-warn px-1 py-0.5 text-[9px] font-bold uppercase text-white">
            {badge}
          </span>
        )}
        <ChevronDown size={14} className={open ? "rotate-180 transition" : "transition"} />
      </button>

      {open && (
        <div
          className="absolute left-1/2 top-full z-40 mt-1 w-[min(720px,90vw)] -translate-x-1/2 rounded-xl border border-border bg-surface p-4 shadow-2xl"
          onMouseEnter={openSoon}
          onMouseLeave={closeSoon}
        >
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {sections.map((sec) => (
              <div key={sec.heading}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                  {sec.heading}
                </p>
                <ul className="space-y-1.5">
                  {sec.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-foreground/80 hover:text-brand"
                      >
                        {l.label}
                        {l.tag && (
                          <span className="rounded-full bg-brand-soft px-1.5 py-0.5 text-[9px] font-semibold text-brand">
                            {l.tag}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!open || !mounted) return null;
  const menus: { title: string; sections: MenuSection[] }[] = [
    { title: "Internships", sections: INTERNSHIPS_MENU },
    { title: "Courses", sections: COURSES_MENU },
    { title: "Jobs", sections: JOBS_MENU },
  ];
  return createPortal(
    <div
      className="fixed z-50 md:hidden"
      style={{ top: 0, right: 0, bottom: 0, left: 0 }}
    >
      <div
        className="absolute bg-black/40"
        style={{ top: 0, right: 0, bottom: 0, left: 0 }}
        onClick={onClose}
      />
      <div
        className="absolute w-[88%] max-w-sm overflow-y-auto bg-surface shadow-2xl"
        style={{ top: 0, bottom: 0, left: 0 }}
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <BrandLogo />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-pill"
          >
            <CloseIcon size={18} />
          </button>
        </div>
        <div className="p-4">
          {menus.map((m) => (
            <details
              key={m.title}
              className="mb-2 rounded-lg border border-border bg-background open:bg-surface"
            >
              <summary className="cursor-pointer list-none px-3 py-2.5 text-sm font-semibold text-foreground">
                <span className="flex items-center justify-between">
                  {m.title}
                  <ChevronDown size={14} />
                </span>
              </summary>
              <div className="space-y-3 px-3 pb-3">
                {m.sections.map((sec) => (
                  <div key={sec.heading}>
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
                      {sec.heading}
                    </p>
                    <ul className="space-y-1">
                      {sec.links.map((l) => (
                        <li key={l.href}>
                          <a
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-foreground/80 hover:text-brand"
                          >
                            {l.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </details>
          ))}
          <div className="mt-4 flex gap-2">
            <a
              href="#"
              className="flex-1 rounded-md border border-brand py-2 text-center text-sm font-semibold text-brand"
            >
              Login
            </a>
            <a
              href="#"
              className="flex-1 rounded-md bg-brand py-2 text-center text-sm font-semibold text-white"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function Header() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface/85 backdrop-blur supports-[backdrop-filter]:bg-surface/70">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-3 sm:px-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="grid h-9 w-9 place-items-center rounded-md text-foreground/80 hover:bg-pill md:hidden"
          >
            <MenuIcon size={20} />
          </button>
          <a href="/" className="flex items-center">
            <BrandLogo className="dark:[filter:invert(0.92)_hue-rotate(180deg)_saturate(1.4)]" />
          </a>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          <NavDropdown
            label="Internships"
            sections={INTERNSHIPS_MENU}
            active
          />
          <NavDropdown label="Courses" sections={COURSES_MENU} badge="OFFER" />
          <NavDropdown label="Jobs" sections={JOBS_MENU} />
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground/70 transition hover:text-brand"
          >
            {dark ? <SunIcon size={16} /> : <MoonIcon size={16} />}
          </button>
          <a
            href="#"
            className="hidden rounded-md border border-brand px-3 py-1.5 text-sm font-semibold text-brand hover:bg-brand-soft sm:inline-flex"
          >
            Login
          </a>
          <a
            href="#"
            className="rounded-md bg-brand px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-strong"
          >
            Register
          </a>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
