import React from "react";
import { ShieldCheck, Lock, ExternalLink, Heart } from "lucide-react";
import { ThemeMode } from "../types";

interface FooterProps {
  theme: ThemeMode;
  onOpenSync: () => void;
  onOpenAiChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ theme, onOpenSync, onOpenAiChat }) => {
  return (
    <footer className={`border-t transition-colors ${
      theme === "dark" 
        ? "bg-black border-zinc-800 text-zinc-400" 
        : "bg-zinc-50 border-zinc-200 text-zinc-600"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Purpose */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-black dark:bg-white flex items-center justify-center text-white dark:text-black">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-black dark:text-white">
                SG PropDirect
              </span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Singapore's verified direct property transacting platform. 
              Eliminating 1%–2% commission fees with GovTech Singpass authentication, 
              live URA valuation benchmarks, and standardized digital contracts.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white"></span>
              <span>Cloud Sync Engine Active</span>
            </div>
          </div>

          {/* Col 2: Direct Solutions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-black dark:text-white mb-3">
              Direct Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#pricing-comparison" className="hover:text-black dark:hover:text-white transition-colors">
                  First-Time HDB Buyers (28–38 yrs)
                </a>
              </li>
              <li>
                <a href="#pricing-comparison" className="hover:text-black dark:hover:text-white transition-colors">
                  HDB Upgraders to Private Condo
                </a>
              </li>
              <li>
                <a href="#pricing-comparison" className="hover:text-black dark:hover:text-white transition-colors">
                  Landlord & Tenant Direct Tenancies
                </a>
              </li>
              <li>
                <a href="#pricing-comparison" className="hover:text-black dark:hover:text-white transition-colors">
                  Commission Net Savings Calculator
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Regulatory & Official Sources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-black dark:text-white mb-3">
              Official Data & Standards
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#market-benchmarks" className="hover:text-black dark:hover:text-white transition-colors">
                  URA REALIS Historical Transacted PSF
                </a>
              </li>
              <li>
                <a href="#market-benchmarks" className="hover:text-black dark:hover:text-white transition-colors">
                  HDB Resale Price Index Benchmarks
                </a>
              </li>
              <li>
                <a href="#security-certificates" className="hover:text-black dark:hover:text-white transition-colors">
                  GovTech Singpass MyInfo Integration
                </a>
              </li>
              <li>
                <a href="#security-certificates" className="hover:text-black dark:hover:text-white transition-colors">
                  SLA Legal Conveyancing Escrow Rules
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Security & Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-black dark:text-white mb-3">
              Platform Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenAiChat} className="hover:text-black dark:hover:text-white transition-colors text-left cursor-pointer">
                  AI Property Advisor (Gemini 2.5 Flash)
                </button>
              </li>
              <li>
                <button onClick={onOpenSync} className="hover:text-black dark:hover:text-white transition-colors text-left cursor-pointer">
                  Cross-Device Cloud Sync Center
                </button>
              </li>
              <li>
                <a href="#security-certificates" className="hover:text-black dark:hover:text-white transition-colors">
                  ISO/IEC 27001 Security Audit
                </a>
              </li>
              <li>
                <a href="#client-reviews" className="hover:text-black dark:hover:text-white transition-colors">
                  Verified Client Reviews
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer Bar */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-400 space-y-2 leading-relaxed">
          <p>
            <strong>Regulatory & Compliance Notice:</strong> SG PropDirect is a direct technological platform connecting verified property owners, prospective buyers, landlords, and tenants in Singapore. SG PropDirect does not act as an estate agent under the Estate Agents Act (Cap. 95A). All transacted prices, median PSF calculations, and housing statistics are pulled directly from public records provided by the Urban Redevelopment Authority (URA) and the Housing & Development Board (HDB). Legal conveyancing procedures are executed through independent conveyancing law firms accredited by the Law Society of Singapore under statutory conveyancing money rules.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 text-zinc-400 text-xs gap-2">
            <span>© {new Date().getFullYear()} SG PropDirect Technologies Pte. Ltd. All rights reserved.</span>
            <span>Singpass MyInfo Verified • ISO/IEC 27001 Certified • PDPA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
