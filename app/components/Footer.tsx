"use client";

import {
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
  LinkedinIcon,
} from "./icons";

export function Footer() {
  return (
    <footer className="w-full bg-[#1a1a1a] text-gray-400 py-10 md:py-14 border-t border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Desktop Footer Columns - Visible on larger screens */}
        <div className="hidden md:grid grid-cols-4 gap-8 pb-10 border-b border-zinc-800/80">
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">Internshala</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://internshala.com/about_us/?utm_source=is_footer" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  About us
                </a>
              </li>
              <li>
                <a href="https://internshala.com/careers/?utm_source=is_footer" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  We're hiring
                </a>
              </li>
              <li>
                <a href="https://internshala.com/hire-talent/?utm_source=is_footer" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Hire interns for your company
                </a>
              </li>
              <li>
                <a href="https://internshala.com/post-job/?utm_source=is_footer" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Post a Job
                </a>
              </li>
              <li>
                <a href="https://internshala.com/competitions/?utm_source=is_footer" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Competitions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://blog.internshala.com/internshala-editorials/team-diary/?utm_source=is_footer" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Team Diary
                </a>
              </li>
              <li>
                <a href="https://blog.internshala.com/?utm_source=is_footer" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="https://internshala.com/products_services/?utm_source=is_footer" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Our Services
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">Legal & Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://internshala.com/terms/?utm_source=is_footer" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="https://internshala.com/privacy/?utm_source=is_footer" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="https://internshala.com/contact/?utm_source=is_footer" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Contact us
                </a>
              </li>
              <li>
                <a href="https://internshala-uploads.internshala.com/annual-return/Annual+Return_FY+24-25_Signed.pdf" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Annual Returns
                </a>
              </li>
              <li>
                <a href="https://internshala.com/grievance_redressal/?utm_source=is_footer" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Grievance Redressal
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://internshala.com/sitemap/?utm_source=is_footer" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Sitemap
                </a>
              </li>
              <li>
                <a href="https://internshala.com/college_registration/associate/?utm_source=footer" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  College TPO registration
                </a>
              </li>
              <li>
                <a href="https://internshala.com/companies/?utm_source=footer" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  List of Companies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Footer Layout - Simplified view with links separated by divider */}
        <div className="block md:hidden pb-8 border-b border-zinc-800/80 text-center">
          <h4 className="text-white font-semibold text-sm mb-3">About Internshala</h4>
          <div className="flex flex-wrap justify-center items-center gap-y-2.5 text-xs px-2">
            <a href="https://internshala.com/about_us/?utm_source=is_footer" className="hover:text-white transition-colors">About us</a>
            <span className="text-zinc-700 px-2">|</span>
            <a href="https://internshala.com/careers/?utm_source=is_footer" className="hover:text-white transition-colors">We're hiring</a>
            <span className="text-zinc-700 px-2">|</span>
            <a href="https://internshala.com/hire-talent/?utm_source=is_footer" className="hover:text-white transition-colors">Hire interns</a>
            <span className="text-zinc-700 px-2">|</span>
            <a href="https://blog.internshala.com/internshala-editorials/team-diary/?utm_source=is_footer" className="hover:text-white transition-colors">Team Diary</a>
            <span className="text-zinc-700 px-2">|</span>
            <a href="https://blog.internshala.com/?utm_source=is_footer" className="hover:text-white transition-colors">Blog</a>
            <span className="text-zinc-700 px-2">|</span>
            <a href="https://internshala.com/products_services/?utm_source=is_footer" className="hover:text-white transition-colors">Our Services</a>
            <span className="text-zinc-700 px-2">|</span>
            <a href="https://internshala.com/terms/?utm_source=is_footer" className="hover:text-white transition-colors">Terms</a>
            <span className="text-zinc-700 px-2">|</span>
            <a href="https://internshala.com/privacy/?utm_source=is_footer" className="hover:text-white transition-colors">Privacy</a>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-y-2.5 text-xs px-2 mt-3.5">
            <a href="https://internshala.com/contact/?utm_source=is_footer" className="hover:text-white transition-colors">Contact us</a>
            <span className="text-zinc-700 px-2">|</span>
            <a href="https://internshala-uploads.internshala.com/annual-return/Annual+Return_FY+24-25_Signed.pdf" className="hover:text-white transition-colors">Annual Returns</a>
            <span className="text-zinc-700 px-2">|</span>
            <a href="https://internshala.com/grievance_redressal/?utm_source=is_footer" className="hover:text-white transition-colors">Grievance Redressal</a>
            <span className="text-zinc-700 px-2">|</span>
            <a href="https://internshala.com/competitions/?utm_source=is_footer" className="hover:text-white transition-colors">Competitions</a>
          </div>
        </div>

        {/* Bottom Area - Socials, App Download Badges, Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* App Stores */}
          <div className="flex items-center gap-3">
            <a 
              href="https://play.google.com/store/apps/details?id=com.internshala.app" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-block transition-transform active:scale-95 hover:opacity-90"
              aria-label="Download Internshala Android App"
            >
              <img 
                src="https://internshala.com/static/images/footer/google_play_store.png" 
                alt="Google Play Store" 
                className="h-10 object-contain"
              />
            </a>
            <a 
              href="https://apps.apple.com/in/app/internshala/id1535785002" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-block transition-transform active:scale-95 hover:opacity-90"
              aria-label="Download Internshala iOS App"
            >
              <img 
                src="https://internshala.com/static/images/footer/apple_app_store.png" 
                alt="Apple App Store" 
                className="h-10 object-contain"
              />
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-5">
            <a 
              href="https://www.instagram.com/internshala/?utm_source=IS_footer" 
              target="_blank" 
              rel="noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={22} />
            </a>
            <a 
              href="https://twitter.com/Internshala?utm_source=IS_footer" 
              target="_blank" 
              rel="noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <TwitterIcon size={22} />
            </a>
            <a 
              href="https://www.youtube.com/c/internshalaofficial?utm_source=IS_footer" 
              target="_blank" 
              rel="noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="YouTube"
            >
              <YoutubeIcon size={22} />
            </a>
            <a 
              href="https://www.linkedin.com/company/internshala/?utm_source=is-footer" 
              target="_blank" 
              rel="noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={22} />
            </a>
          </div>

          {/* Copyright Info */}
          <div className="text-xs text-gray-500 text-center md:text-right leading-relaxed">
            © Copyright 2026 Internshala <br className="hidden md:block" />
            (Scholiverse Educare Private Limited)
          </div>

        </div>

      </div>
    </footer>
  );
}
