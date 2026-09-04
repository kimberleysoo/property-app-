import React from "react";
import { 
  ShieldCheck, 
  ArrowRight, 
  TrendingDown, 
  CheckCircle2, 
  Building2, 
  Users, 
  FileLock2, 
  Sparkles,
  Calculator,
  Lock
} from "lucide-react";
import { PersonaType, ThemeMode } from "../types";

interface HeroSectionProps {
  persona: PersonaType;
  setPersona: (p: PersonaType) => void;
  theme: ThemeMode;
  onOpenAiChat: () => void;
  onScrollToPricing: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  persona,
  setPersona,
  theme,
  onOpenAiChat,
  onScrollToPricing
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simplified, Clean Persona Filter Tabs */}
        <div className="flex justify-center mb-6">
          <div className={`inline-flex p-1 rounded-lg border max-w-full overflow-x-auto ${
            theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-zinc-100 border-zinc-200"
          }`}>
            <button
              id="persona-tab-all"
              onClick={() => setPersona("all")}
              className={`px-3.5 py-1.5 rounded-md text-xs whitespace-nowrap transition-all cursor-pointer ${
                persona === "all"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-xs font-semibold"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white font-medium"
              }`}
            >
              All Direct Solutions
            </button>
            <button
              id="persona-tab-first-time"
              onClick={() => setPersona("first-time-buyer")}
              className={`px-3.5 py-1.5 rounded-md text-xs whitespace-nowrap transition-all cursor-pointer ${
                persona === "first-time-buyer"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-xs font-semibold"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white font-medium"
              }`}
            >
              First-Time Buyers
            </button>
            <button
              id="persona-tab-upgrader"
              onClick={() => setPersona("hdb-upgrader")}
              className={`px-3.5 py-1.5 rounded-md text-xs whitespace-nowrap transition-all cursor-pointer ${
                persona === "hdb-upgrader"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-xs font-semibold"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white font-medium"
              }`}
            >
              HDB Upgraders
            </button>
            <button
              id="persona-tab-landlord"
              onClick={() => setPersona("landlord-tenant")}
              className={`px-3.5 py-1.5 rounded-md text-xs whitespace-nowrap transition-all cursor-pointer ${
                persona === "landlord-tenant"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-xs font-semibold"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white font-medium"
              }`}
            >
              Landlords & Tenants
            </button>
          </div>
        </div>

        {/* Hero Main Content */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Subtle Verification Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 mb-5">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
            <span>GovTech Singpass Verified • Live URA Benchmarks • 0% Commission</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-black dark:text-white leading-[1.12]">
            {persona === "first-time-buyer" ? (
              <>
                Buy Your First Resale HDB.{" "}
                <span className="text-zinc-500 dark:text-zinc-400">
                  Zero Agent Fees.
                </span>
              </>
            ) : persona === "hdb-upgrader" ? (
              <>
                Upgrade From HDB to Condo.{" "}
                <span className="text-zinc-500 dark:text-zinc-400">
                  Save S$38,000+ in Fees.
                </span>
              </>
            ) : persona === "landlord-tenant" ? (
              <>
                Direct Singapore Tenancies.{" "}
                <span className="text-zinc-500 dark:text-zinc-400">
                  Zero 1-Month Agent Deductions.
                </span>
              </>
            ) : (
              <>
                Direct Property Platform.{" "}
                <span className="text-zinc-500 dark:text-zinc-400">
                  Zero Commission Fees.
                </span>
              </>
            )}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            {persona === "first-time-buyer" ? (
              "Tailored for Singapore couples aged 28–38. View properties yourselves without paying S$10,000–S$18,000 for standard portal submissions. Connect directly with verified title owners, benchmark URA transacted PSF, and submit e-OTPs securely."
            ) : persona === "hdb-upgrader" ? (
              "Designed for established homeowners selling an HDB flat to purchase a private resale condominium. Benefit from precise ABSD 6-month remission guidance, CPF return projections, and zero agent commission loss."
            ) : persona === "landlord-tenant" ? (
              "Direct lease execution when tenancies expire or when looking for a home. Singpass MyInfo verifies true landlord ownership, eliminating rental scams. Automated CEA-standard digital contracts, IRAS e-stamping, and zero agent fees."
            ) : (
              "Experience seamless cloud synchronization across web and mobile. Direct negotiation, SLA title verification, and standardized digital contracts between buyers, sellers, landlords, and tenants."
            )}
          </p>

          {/* Action CTAs - Sleek Grey/White/Black Button Styling */}
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              id="hero-compare-pricing-btn"
              onClick={onScrollToPricing}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-semibold text-sm shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Net Savings</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="hero-ai-advisor-btn"
              onClick={onOpenAiChat}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-lg border font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                theme === "dark"
                  ? "bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-200"
                  : "bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-900 shadow-2xs"
              }`}
            >
              <Sparkles className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              <span>Ask PropDirect AI</span>
            </button>
          </div>

          {/* Trust badges row */}
          <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              <span>GovTech Singpass Partner</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              <span>URA Live REALIS API Integrated</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              <span>SLA Title Registry Verified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              <span>ISO 27001 & SOC 2 Audited</span>
            </div>
          </div>
        </div>

        {/* Sleek Live Statistics Metric Grid */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`p-6 rounded-2xl border transition-all ${
            theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-xs"
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                Saved Fees
              </span>
              <TrendingDown className="w-4 h-4 text-zinc-500" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-bold text-black dark:text-white">
              S$18.45M+
            </div>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Zero commission across 1,420+ transacted Singapore properties.
            </p>
          </div>

          <div className={`p-6 rounded-2xl border transition-all ${
            theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-xs"
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                Direct Platform
              </span>
              <CheckCircle2 className="w-4 h-4 text-zinc-500" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-bold text-black dark:text-white">
              S$0.00
            </div>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Free listing, direct messaging, and URA transacted benchmark access.
            </p>
          </div>

          <div className={`p-6 rounded-2xl border transition-all ${
            theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-xs"
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                Title Checks
              </span>
              <FileLock2 className="w-4 h-4 text-zinc-500" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-bold text-black dark:text-white">
              100% SLA Checked
            </div>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Every seller and landlord verified against Singapore Land Authority records.
            </p>
          </div>

          <div className={`p-6 rounded-2xl border transition-all ${
            theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-xs"
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                Transact Time
              </span>
              <Building2 className="w-4 h-4 text-zinc-500" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-bold text-black dark:text-white">
              14 Days
            </div>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              From viewing to e-OTP signature, compared to traditional 45 days.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
