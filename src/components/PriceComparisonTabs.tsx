import React, { useState } from "react";
import { 
  Check, 
  X, 
  DollarSign, 
  Calculator, 
  ArrowRight, 
  Info, 
  ShieldCheck, 
  Cloud, 
  Save, 
  Sparkles,
  TrendingDown,
  Building,
  Home,
  Key
} from "lucide-react";
import { ThemeMode, SavedCalculation } from "../types";

interface PriceComparisonTabsProps {
  theme: ThemeMode;
  onSaveCalculation: (calc: Omit<SavedCalculation, "id" | "timestamp">) => void;
}

export const PriceComparisonTabs: React.FC<PriceComparisonTabsProps> = ({
  theme,
  onSaveCalculation
}) => {
  const [activeTab, setActiveTab] = useState<"buying" | "selling" | "rental" | "calculator">("buying");

  // Calculator states
  const [calcPropertyType, setCalcPropertyType] = useState<"hdb-resale" | "private-condo" | "rental">("hdb-resale");
  const [calcRole, setCalcRole] = useState<"buyer" | "seller" | "landlord" | "tenant">("buyer");
  const [calcPrice, setCalcPrice] = useState<number>(780000);
  const [calcMonthlyRent, setCalcMonthlyRent] = useState<number>(3800);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Accurate Singapore CEA Commission & GST calculations:
  // Traditional Seller Agent: 2.0% + 9% GST = 2.18%
  // Traditional Buyer Agent: 1.0% + 9% GST = 1.09% (frequently charged on HDB resale)
  // Traditional Landlord/Tenant: 1 month rent + 9% GST on 2-year lease = 1.09 months
  const traditionalFee = calcPropertyType === "rental"
    ? Math.round(calcMonthlyRent * 1.09)
    : calcRole === "seller"
      ? Math.round(calcPrice * 0.0218)
      : Math.round(calcPrice * 0.0109);

  const directPlatformFee = 0;
  const netSavings = traditionalFee - directPlatformFee;

  const handleSaveCalc = () => {
    onSaveCalculation({
      propertyType: calcPropertyType === "rental" ? "Residential Rental" : calcPropertyType === "hdb-resale" ? "HDB Resale" : "Private Condo",
      location: "Singapore Benchmark",
      price: calcPropertyType === "rental" ? calcMonthlyRent : calcPrice,
      traditionalCommission: traditionalFee,
      directFee: directPlatformFee,
      netSavings: netSavings,
      persona: calcRole
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <section id="pricing-comparison" className="py-12 sm:py-16 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 mb-3">
            <DollarSign className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
            <span>CEA Commission Standards vs Direct Platform</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black dark:text-white tracking-tight">
            Transparent Price Comparison
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Compare actual transaction outlays. Traditional estate agents charge 1% to 2% plus 9% Singapore GST. 
            SG PropDirect provides direct verification, digital contracts, and URA market data for S$0 commission.
          </p>
        </div>

        {/* Tab Navigation Controls - Clean Grey/White/Black Button Group */}
        <div className="flex justify-center mb-8">
          <div className={`p-1 rounded-lg border flex flex-wrap justify-center gap-1 max-w-full ${
            theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-zinc-100 border-zinc-200"
          }`}>
            <button
              id="tab-buying-btn"
              onClick={() => setActiveTab("buying")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === "buying"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-xs font-semibold"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white font-medium"
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Buying</span>
            </button>

            <button
              id="tab-selling-btn"
              onClick={() => setActiveTab("selling")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === "selling"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-xs font-semibold"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white font-medium"
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Selling</span>
            </button>

            <button
              id="tab-rental-btn"
              onClick={() => setActiveTab("rental")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === "rental"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-xs font-semibold"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white font-medium"
              }`}
            >
              <Key className="w-4 h-4" />
              <span>Rental</span>
            </button>

            <button
              id="tab-calculator-btn"
              onClick={() => setActiveTab("calculator")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === "calculator"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-xs font-semibold"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white font-medium"
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Calculator</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Buying Comparison */}
        {activeTab === "buying" && (
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Traditional Agent Model */}
            <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
              theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-xs"
            }`}>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                    Traditional Agency Model
                  </span>
                  <h3 className="text-xl font-bold text-black dark:text-white mt-1">
                    Buyer Representation
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-black dark:text-white">
                    1.0% + 9% GST
                  </div>
                  <span className="text-xs text-zinc-500">Standard CEA Practice</span>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <X className="w-5 h-5 text-zinc-400 dark:text-zinc-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black dark:text-white">Hefty S$7,500 – S$16,000+ Commission:</strong>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      On a standard S$750k 4-room resale HDB, you pay S$8,175. On an S$1.5M condo, fees reach S$16,350.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <X className="w-5 h-5 text-zinc-400 dark:text-zinc-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black dark:text-white">Conflict of Interest in Price Negotiation:</strong>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Percentage-based commission incentivizes agents to close at higher prices for larger payouts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <X className="w-5 h-5 text-zinc-400 dark:text-zinc-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black dark:text-white">Restricted Property Viewings:</strong>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Agents may filter out direct owner-listings or co-broke units that offer lower commission splits.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl">
                <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  Average Buyer Outlay on S$800,000 Resale HDB:
                </div>
                <div className="text-2xl font-bold text-black dark:text-white mt-1">
                  S$8,720 Deducted
                </div>
              </div>
            </div>

            {/* SG PropDirect Model - Sleek Monochromatic Card */}
            <div className={`p-6 sm:p-8 rounded-2xl border-2 border-black dark:border-white relative transition-all ${
              theme === "dark" ? "bg-zinc-900 shadow-sm" : "bg-white shadow-xs"
            }`}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-wider shadow-xs">
                Zero Commission Platform
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                    SG PropDirect Direct
                  </span>
                  <h3 className="text-xl font-bold text-black dark:text-white mt-1">
                    Direct Buyer Access
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-black dark:text-white">
                    S$0<span className="text-sm font-normal text-zinc-500"> Fee</span>
                  </div>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold">100% Free for Buyers</span>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-black dark:text-white shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black dark:text-white">Direct Owner Negotiation:</strong>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Chat directly with Singpass-verified title owners without agent gatekeeping or manipulation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-black dark:text-white shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black dark:text-white">Official URA Benchmark Valuation:</strong>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Access actual historical and real-time transacted PSF data to avoid paying Cash-Over-Valuation (COV).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-black dark:text-white shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black dark:text-white">Standardized Digital e-OTP:</strong>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Legally compliant CEA/HDB standardized Option-to-Purchase generated digitally with SLA title registry verification.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
                <div className="text-xs text-zinc-600 dark:text-zinc-300 font-medium">
                  Your Net Commission Savings on S$800,000 Resale HDB:
                </div>
                <div className="text-2xl font-bold text-black dark:text-white mt-1">
                  S$8,720 Saved (100% Retained)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Selling Comparison */}
        {activeTab === "selling" && (
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Traditional Seller Agent */}
            <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
              theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-xs"
            }`}>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                    Traditional Agency Model
                  </span>
                  <h3 className="text-xl font-bold text-black dark:text-white mt-1">
                    Seller Commission
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-black dark:text-white">
                    2.0% + 9% GST
                  </div>
                  <span className="text-xs text-zinc-500">2.18% Effective Rate</span>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <X className="w-5 h-5 text-zinc-400 dark:text-zinc-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black dark:text-white">Massive S$18,500 – S$48,000 Fee Deduction:</strong>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      On an S$850k 5-room HDB: S$18,530. On an S$2.2M condo: S$47,960 deducted directly from your sales proceeds.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <X className="w-5 h-5 text-zinc-400 dark:text-zinc-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black dark:text-white">Exclusive Agency Lock-In Contracts:</strong>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      3-month exclusive agreements legally block you from marketing your own property or entertaining direct buyers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <X className="w-5 h-5 text-zinc-400 dark:text-zinc-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black dark:text-white">Substantial Drag on HDB Upgrading Equity:</strong>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Eating into the cash proceeds needed for downpayment on your next private condo.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl">
                <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  Seller Deductions on S$900,000 HDB Sale:
                </div>
                <div className="text-2xl font-bold text-black dark:text-white mt-1">
                  -S$19,620 in Agent Fees
                </div>
              </div>
            </div>

            {/* SG PropDirect Seller Model - Sleek Monochromatic Card */}
            <div className={`p-6 sm:p-8 rounded-2xl border-2 border-black dark:border-white relative transition-all ${
              theme === "dark" ? "bg-zinc-900 shadow-sm" : "bg-white shadow-xs"
            }`}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-wider shadow-xs">
                Zero Seller Commission
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                    SG PropDirect Direct Sale
                  </span>
                  <h3 className="text-xl font-bold text-black dark:text-white mt-1">
                    Direct Seller Listing
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-black dark:text-white">
                    S$0<span className="text-sm font-normal text-zinc-500"> Fee</span>
                  </div>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold">Keep 100% of Proceeds</span>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-black dark:text-white shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black dark:text-white">Direct Exposure to 14,000+ Pre-Approved Buyers:</strong>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      First-time HDB buyers with active HFE letters and pre-qualified bank in-principle approvals.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-black dark:text-white shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black dark:text-white">Automated Valuation & Pricing Benchmarks:</strong>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Live URA and HDB median PSF data ensures you price competitively to sell fast without undercutting value.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-black dark:text-white shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black dark:text-white">Optional S$599 Legal Conveyancing Partner:</strong>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Licensed Singapore conveyancing law firm handles official completion, CPF refund filing, and mortgage discharge.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
                <div className="text-xs text-zinc-600 dark:text-zinc-300 font-medium">
                  Your Net Profit Kept on S$900,000 Sale:
                </div>
                <div className="text-2xl font-bold text-black dark:text-white mt-1">
                  +S$19,620 More Cash In Hand
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Rental Comparison */}
        {activeTab === "rental" && (
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Traditional Rental Agent */}
            <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
              theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-xs"
            }`}>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                    Traditional Rental Agent
                  </span>
                  <h3 className="text-xl font-bold text-black dark:text-white mt-1">
                    Tenancy Commission
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-black dark:text-white">
                    1 Month + GST
                  </div>
                  <span className="text-xs text-zinc-500">Per 2-Year Lease Cycle</span>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <X className="w-5 h-5 text-zinc-400 dark:text-zinc-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black dark:text-white">Recurring S$3,500 – S$5,500 Loss Every 2 Years:</strong>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Landlords surrender 4.16% of total annual rental yield to an agent just to sign standard tenancy paperwork.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <X className="w-5 h-5 text-zinc-400 dark:text-zinc-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black dark:text-white">Rental Scams & Ghost Agents:</strong>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Tenants risk losing security deposits to fraudulent listings lacking official SLA title ownership checks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <X className="w-5 h-5 text-zinc-400 dark:text-zinc-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black dark:text-white">Tenant Agent Fees:</strong>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Renters paying below S$4,000/mo are frequently charged half-month or full-month commission by tenant agents.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl">
                <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  Landlord Deducted on S$4,200/mo Unit (2-yr Lease):
                </div>
                <div className="text-2xl font-bold text-black dark:text-white mt-1">
                  -S$4,578 Lost to Commission
                </div>
              </div>
            </div>

            {/* SG PropDirect Rental - Sleek Monochromatic Card */}
            <div className={`p-6 sm:p-8 rounded-2xl border-2 border-black dark:border-white relative transition-all ${
              theme === "dark" ? "bg-zinc-900 shadow-sm" : "bg-white shadow-xs"
            }`}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-wider shadow-xs">
                Direct Lease Agreements
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                    SG PropDirect Rental
                  </span>
                  <h3 className="text-xl font-bold text-black dark:text-white mt-1">
                    Direct Landlord-Tenant
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-black dark:text-white">
                    S$0<span className="text-sm font-normal text-zinc-500"> Fee</span>
                  </div>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold">Both Parties Save 100%</span>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-black dark:text-white shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black dark:text-white">GovTech Singpass KYC & SLA Ownership:</strong>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Zero fake listings. Landlord title deed validated against official SLA records; tenant NRIC verified.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-black dark:text-white shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black dark:text-white">CEA-Standard Digital E-Tenancy:</strong>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Standardized clauses covering minor repair caps (S$150), aircon servicing intervals, and diplomatic clauses.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-black dark:text-white shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black dark:text-white">Integrated IRAS Digital Stamp Duty:</strong>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      One-click official stamp duty submission directly to Inland Revenue Authority of Singapore.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
                <div className="text-xs text-zinc-600 dark:text-zinc-300 font-medium">
                  Landlord Extra Rental Yield Kept:
                </div>
                <div className="text-2xl font-bold text-black dark:text-white mt-1">
                  +S$4,578 Saved per Lease Cycle
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Interactive Net Savings Calculator */}
        {activeTab === "calculator" && (
          <div className="max-w-4xl mx-auto">
            <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
              theme === "dark" 
                ? "bg-zinc-900 border-zinc-800 shadow-sm" 
                : "bg-white border-zinc-200 shadow-xs"
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-black dark:text-white flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-black dark:text-white" />
                    Interactive Net Savings Calculator
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Calculate your exact savings based on official Singapore CEA commission standards (2% seller, 1% buyer, 1-mo rent).
                  </p>
                </div>

                <button
                  id="calc-save-sync-btn"
                  onClick={handleSaveCalc}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black text-xs font-semibold shadow-xs transition-all cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{savedSuccess ? "Saved & Synced!" : "Save to Cloud Session"}</span>
                </button>
              </div>

              {/* Calculator Controls */}
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-5">
                  {/* Property Type Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">
                      1. Property Category
                    </label>
                    <div className={`p-1 rounded-lg border flex gap-1 ${
                      theme === "dark" ? "bg-zinc-800 border-zinc-700" : "bg-zinc-100 border-zinc-200"
                    }`}>
                      <button
                        onClick={() => setCalcPropertyType("hdb-resale")}
                        className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all cursor-pointer ${
                          calcPropertyType === "hdb-resale"
                            ? "bg-black dark:bg-white text-white dark:text-black shadow-xs font-semibold"
                            : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                        }`}
                      >
                        HDB Resale
                      </button>
                      <button
                        onClick={() => setCalcPropertyType("private-condo")}
                        className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all cursor-pointer ${
                          calcPropertyType === "private-condo"
                            ? "bg-black dark:bg-white text-white dark:text-black shadow-xs font-semibold"
                            : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                        }`}
                      >
                        Private Condo
                      </button>
                      <button
                        onClick={() => setCalcPropertyType("rental")}
                        className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all cursor-pointer ${
                          calcPropertyType === "rental"
                            ? "bg-black dark:bg-white text-white dark:text-black shadow-xs font-semibold"
                            : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                        }`}
                      >
                        Rental Lease
                      </button>
                    </div>
                  </div>

                  {/* Role Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">
                      2. Your Transaction Role
                    </label>
                    {calcPropertyType !== "rental" ? (
                      <div className={`p-1 rounded-lg border flex gap-1 ${
                        theme === "dark" ? "bg-zinc-800 border-zinc-700" : "bg-zinc-100 border-zinc-200"
                      }`}>
                        <button
                          onClick={() => setCalcRole("buyer")}
                          className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all cursor-pointer ${
                            calcRole === "buyer"
                              ? "bg-black dark:bg-white text-white dark:text-black shadow-xs font-semibold"
                              : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                          }`}
                        >
                          Buyer (1% + GST)
                        </button>
                        <button
                          onClick={() => setCalcRole("seller")}
                          className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all cursor-pointer ${
                            calcRole === "seller"
                              ? "bg-black dark:bg-white text-white dark:text-black shadow-xs font-semibold"
                              : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                          }`}
                        >
                          Seller (2% + GST)
                        </button>
                      </div>
                    ) : (
                      <div className={`p-1 rounded-lg border flex gap-1 ${
                        theme === "dark" ? "bg-zinc-800 border-zinc-700" : "bg-zinc-100 border-zinc-200"
                      }`}>
                        <button
                          onClick={() => setCalcRole("landlord")}
                          className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all cursor-pointer ${
                            calcRole === "landlord"
                              ? "bg-black dark:bg-white text-white dark:text-black shadow-xs font-semibold"
                              : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                          }`}
                        >
                          Landlord (1 Mo Rent)
                        </button>
                        <button
                          onClick={() => setCalcRole("tenant")}
                          className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all cursor-pointer ${
                            calcRole === "tenant"
                              ? "bg-black dark:bg-white text-white dark:text-black shadow-xs font-semibold"
                              : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                          }`}
                        >
                          Tenant (Zero Fee)
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Price / Rent Input & Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                        {calcPropertyType === "rental" ? "Monthly Rental Rate" : "Property Price"}
                      </label>
                      <span className="font-mono text-base font-bold text-black dark:text-white">
                        S${(calcPropertyType === "rental" ? calcMonthlyRent : calcPrice).toLocaleString()}
                      </span>
                    </div>

                    {calcPropertyType !== "rental" ? (
                      <div>
                        <input
                          id="price-range-slider"
                          type="range"
                          min="400000"
                          max="3500000"
                          step="10000"
                          value={calcPrice}
                          onChange={(e) => setCalcPrice(Number(e.target.value))}
                          aria-label="Property Transacted Price slider"
                          className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-black dark:accent-white"
                        />
                        <div className="flex justify-between text-[11px] text-zinc-400 mt-1 font-mono">
                          <span>S$400k (3-Room)</span>
                          <span>S$850k (5-Room)</span>
                          <span>S$1.8M (Condo)</span>
                          <span>S$3.5M+</span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <input
                          id="rental-range-slider"
                          type="range"
                          min="1800"
                          max="12000"
                          step="100"
                          value={calcMonthlyRent}
                          onChange={(e) => setCalcMonthlyRent(Number(e.target.value))}
                          aria-label="Monthly Rental Rate slider"
                          className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-black dark:accent-white"
                        />
                        <div className="flex justify-between text-[11px] text-zinc-400 mt-1 font-mono">
                          <span>S$1,800/mo</span>
                          <span>S$4,200/mo</span>
                          <span>S$7,500/mo</span>
                          <span>S$12,000/mo</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Calculation Results Card */}
                <div className={`p-6 rounded-xl border flex flex-col justify-between ${
                  theme === "dark" ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"
                }`}>
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-700">
                      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        Traditional Agent Fee (+9% GST)
                      </span>
                      <span className="text-sm font-bold text-zinc-600 dark:text-zinc-300 font-mono">
                        -S${traditionalFee.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-zinc-200 dark:border-zinc-700">
                      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        SG PropDirect Platform Fee
                      </span>
                      <span className="text-sm font-bold text-black dark:text-white font-mono">
                        S$0.00
                      </span>
                    </div>

                    <div className="mt-4 pt-2">
                      <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                        Total Net Direct Savings
                      </span>
                      <div className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white font-mono mt-1">
                        S${netSavings.toLocaleString()}
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                        Zero commission deducted. 100% of your hard-earned equity stays in your bank account.
                      </p>
                    </div>
                  </div>

                  {/* Real-world Singapore Context */}
                  <div className={`mt-6 p-4 rounded-xl border text-xs leading-relaxed ${
                    theme === "dark" 
                      ? "bg-zinc-800 border-zinc-700 text-zinc-300" 
                      : "bg-white border-zinc-200 text-zinc-700 shadow-xs"
                  }`}>
                    <div className="font-semibold flex items-center gap-1.5 mb-1 text-black dark:text-white">
                      <Sparkles className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                      What S${netSavings.toLocaleString()} buys in Singapore:
                    </div>
                    {netSavings > 25000 ? (
                      <span>Covers a complete 3-bedroom interior renovation & carpentry, plus air-conditioning installation.</span>
                    ) : netSavings > 12000 ? (
                      <span>Equivalent to approximately 10 to 14 months of monthly HDB housing loan instalments.</span>
                    ) : (
                      <span>Covers your full legal conveyancing fees, home insurance, and brand new kitchen appliances.</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
