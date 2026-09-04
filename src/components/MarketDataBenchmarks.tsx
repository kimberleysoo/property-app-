import React, { useState } from "react";
import { 
  TrendingUp, 
  Building2, 
  MapPin, 
  Search, 
  Info, 
  ArrowUpRight, 
  BarChart3, 
  ExternalLink,
  ShieldCheck
} from "lucide-react";
import { ThemeMode, MarketBenchmark } from "../types";
import { MARKET_BENCHMARKS } from "../data/mockData";

interface MarketDataBenchmarksProps {
  theme: ThemeMode;
}

export const MarketDataBenchmarks: React.FC<MarketDataBenchmarksProps> = ({ theme }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredBenchmarks = MARKET_BENCHMARKS.filter((item) => {
    const matchesFilter = selectedFilter === "all" || 
      (selectedFilter === "hdb" && item.category.includes("HDB")) ||
      (selectedFilter === "condo" && item.category.includes("Condo"));
    const matchesSearch = item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sampleEstates.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="market-benchmarks" className="py-12 sm:py-16 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 mb-3">
            <TrendingUp className="w-3.5 h-3.5 text-black dark:text-white" />
            <span>Official URA REALIS & HDB Market Data</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black dark:text-white tracking-tight">
            Transacted Valuation Benchmarks
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Unbiased pricing transparency directly from Urban Redevelopment Authority (URA) and Housing & Development Board (HDB) records. 
            Negotiate with confidence without inflated agent markups.
          </p>
        </div>

        {/* Filter & Search Bar - Sleek Interface Grouping */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          {/* Quick Filters */}
          <div className={`p-1 rounded-lg border flex items-center gap-1 ${
            theme === "dark" ? "bg-zinc-800 border-zinc-700" : "bg-zinc-100 border-zinc-200"
          }`}>
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                selectedFilter === "all"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-xs font-semibold"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              }`}
            >
              All Property Classes
            </button>
            <button
              onClick={() => setSelectedFilter("hdb")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                selectedFilter === "hdb"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-xs font-semibold"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              }`}
            >
              HDB Resale Flats
            </button>
            <button
              onClick={() => setSelectedFilter("condo")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                selectedFilter === "condo"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-xs font-semibold"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Private Condominiums
            </button>
          </div>

          {/* Search by estate/town */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search town, estate, or district..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 rounded-lg text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors ${
                theme === "dark" 
                  ? "bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500" 
                  : "bg-white border-zinc-200 text-black placeholder-zinc-400"
              }`}
            />
          </div>
        </div>

        {/* Benchmarks Table */}
        <div className={`rounded-2xl border overflow-hidden transition-all ${
          theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-xs"
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className={`border-b text-xs font-semibold uppercase tracking-widest ${
                theme === "dark" 
                  ? "bg-zinc-800 text-zinc-400 border-zinc-800" 
                  : "bg-zinc-50 text-zinc-500 border-zinc-200"
              }`}>
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Property Category</th>
                  <th className="py-3.5 px-4">Mature Estate / Prime Median</th>
                  <th className="py-3.5 px-4">Mature Median PSF</th>
                  <th className="py-3.5 px-4">Non-Mature / Suburb Median</th>
                  <th className="py-3.5 px-4">Non-Mature Median PSF</th>
                  <th className="py-3.5 px-4 sm:px-6">Key Sample Estates</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filteredBenchmarks.map((item, idx) => (
                  <tr 
                    key={idx} 
                    className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  >
                    <td className="py-4 px-4 sm:px-6 font-semibold text-black dark:text-white">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-black dark:text-white shrink-0" />
                        <span>{item.category}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-black dark:text-zinc-100">
                      S${item.matureMedian.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 font-mono text-zinc-700 dark:text-zinc-300 font-semibold">
                      S${item.maturePSF} PSF
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-zinc-700 dark:text-zinc-300">
                      S${item.nonMatureMedian.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 font-mono text-zinc-600 dark:text-zinc-400 font-semibold">
                      S${item.nonMaturePSF} PSF
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-xs text-zinc-600 dark:text-zinc-400">
                      {item.sampleEstates}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer note grounding data in official sources */}
          <div className={`p-4 border-t text-xs flex flex-wrap items-center justify-between gap-3 ${
            theme === "dark" 
              ? "bg-zinc-900 border-zinc-800 text-zinc-400" 
              : "bg-zinc-50 border-zinc-200 text-zinc-600"
          }`}>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-black dark:text-white" />
              <span>Data source: Urban Redevelopment Authority (URA REALIS) & Housing & Development Board (HDB Resale Statistics).</span>
            </div>
            <span className="font-mono text-[11px]">Updated Q1 2026 Official Batch</span>
          </div>
        </div>
      </div>
    </section>
  );
};
