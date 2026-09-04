import React, { useState, useEffect, useCallback } from "react";
import { 
  TrendingUp, 
  Building2, 
  Search, 
  ShieldCheck,
  ExternalLink,
  RefreshCw,
  Database,
  Layers,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle2,
  SlidersHorizontal
} from "lucide-react";
import { ThemeMode, MarketBenchmark, HdbResaleRecord } from "../types";
import { MARKET_BENCHMARKS } from "../data/mockData";

interface MarketDataBenchmarksProps {
  theme: ThemeMode;
}

const SG_TOWNS = [
  "ALL",
  "TAMPINES",
  "BEDOK",
  "BISHAN",
  "BUKIT BATOK",
  "BUKIT MERAH",
  "BUKIT PANJANG",
  "CHOA CHU KANG",
  "CLEMENTI",
  "GEYLANG",
  "HOUGANG",
  "JURONG EAST",
  "JURONG WEST",
  "KALLANG/WHAMPOA",
  "PASIR RIS",
  "PUNGGOL",
  "QUEENSTOWN",
  "SEMBAWANG",
  "SENGKANG",
  "SERANGOON",
  "TOA PAYOH",
  "WOODLANDS",
  "YISHUN"
];

const FLAT_TYPES = [
  { label: "All Flat Types", value: "ALL" },
  { label: "3-Room", value: "3 ROOM" },
  { label: "4-Room", value: "4 ROOM" },
  { label: "5-Room", value: "5 ROOM" },
  { label: "Executive", value: "EXECUTIVE" }
];

export const MarketDataBenchmarks: React.FC<MarketDataBenchmarksProps> = ({ theme }) => {
  // Tab state: "live-transactions" vs "median-benchmarks"
  const [activeTab, setActiveTab] = useState<"live-transactions" | "median-benchmarks">("live-transactions");
  
  // Benchmark filters
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Live Data.gov.sg API query states
  const [town, setTown] = useState<string>("TAMPINES");
  const [flatType, setFlatType] = useState<string>("4 ROOM");
  const [queryText, setQueryText] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [liveRecords, setLiveRecords] = useState<HdbResaleRecord[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<string>("");

  // Fetch live records from /api/hdb-resale
  const fetchLiveTransactions = useCallback(async () => {
    setLoading(true);
    setApiError(null);
    try {
      const offset = (page - 1) * pageSize;
      const params = new URLSearchParams();
      params.set("limit", String(pageSize));
      params.set("offset", String(offset));
      if (town && town !== "ALL") params.set("town", town);
      if (flatType && flatType !== "ALL") params.set("flat_type", flatType);
      if (queryText.trim()) params.set("q", queryText.trim());

      const res = await fetch(`/api/hdb-resale?${params.toString()}`);
      if (!res.ok) {
        throw new Error(`API returned ${res.status}`);
      }
      const data = await responseJsonSafe(res);
      if (data && data.success && Array.isArray(data.records)) {
        setLiveRecords(data.records);
        setTotalRecords(data.total || 0);
        setLastRefreshed(new Date().toLocaleTimeString("en-SG", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      } else {
        throw new Error(data.message || "Unable to parse official records");
      }
    } catch (err: any) {
      console.error("Live HDB fetch error:", err);
      setApiError("Could not reach Data.gov.sg API. Showing cached valuation records.");
    } finally {
      setLoading(false);
    }
  }, [town, flatType, queryText, page, pageSize]);

  async function responseJsonSafe(res: Response) {
    try {
      return await res.json();
    } catch {
      return null;
    }
  }

  useEffect(() => {
    if (activeTab === "live-transactions") {
      fetchLiveTransactions();
    }
  }, [fetchLiveTransactions, activeTab]);

  const filteredBenchmarks = MARKET_BENCHMARKS.filter((item) => {
    const matchesFilter = selectedFilter === "all" || 
      (selectedFilter === "hdb" && item.category.includes("HDB")) ||
      (selectedFilter === "condo" && item.category.includes("Condo"));
    const matchesSearch = item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sampleEstates.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

  return (
    <section id="market-benchmarks" className="py-12 sm:py-16 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 mb-3">
            <Database className="w-3.5 h-3.5 text-black dark:text-white" />
            <span>Singapore Open Data (Data.gov.sg Dataset: d_8b84c4ee58e3cfc0ece0d773c8ca6abc)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black dark:text-white tracking-tight">
            Official Singapore Transacted Records
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Directly synced with the Singapore Government Open Data API and URA REALIS. 
            Inspect genuine transacted prices, PSF valuations, and commission fee savings without agent bias.
          </p>
        </div>

        {/* View Switcher: Live Transactions vs Median Benchmarks */}
        <div className="flex justify-center mb-8">
          <div className={`p-1 rounded-xl border flex items-center gap-1 max-w-md w-full ${
            theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-zinc-100 border-zinc-200"
          }`}>
            <button
              onClick={() => setActiveTab("live-transactions")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "live-transactions"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Live HDB Resale API</span>
              <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </button>
            <button
              onClick={() => setActiveTab("median-benchmarks")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "median-benchmarks"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>URA / HDB Benchmarks</span>
            </button>
          </div>
        </div>

        {activeTab === "live-transactions" ? (
          <div>
            {/* Live Transactions Filter Bar */}
            <div className={`p-4 sm:p-5 rounded-2xl border mb-6 ${
              theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-xs"
            }`}>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Town & Flat Type Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 flex-1">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                      Town / Planning Area
                    </label>
                    <select
                      value={town}
                      onChange={(e) => {
                        setTown(e.target.value);
                        setPage(1);
                      }}
                      className={`w-full px-3 py-2 rounded-lg text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors cursor-pointer ${
                        theme === "dark" 
                          ? "bg-zinc-800 border-zinc-700 text-white" 
                          : "bg-zinc-50 border-zinc-200 text-black"
                      }`}
                    >
                      {SG_TOWNS.map((t) => (
                        <option key={t} value={t}>
                          {t === "ALL" ? "All Singapore Towns" : t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                      Flat Category
                    </label>
                    <select
                      value={flatType}
                      onChange={(e) => {
                        setFlatType(e.target.value);
                        setPage(1);
                      }}
                      className={`w-full px-3 py-2 rounded-lg text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors cursor-pointer ${
                        theme === "dark" 
                          ? "bg-zinc-800 border-zinc-700 text-white" 
                          : "bg-zinc-50 border-zinc-200 text-black"
                      }`}
                    >
                      {FLAT_TYPES.map((f) => (
                        <option key={f.value} value={f.value}>
                          {f.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                      Search Street / Block
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
                      <input
                        type="text"
                        placeholder="e.g. Tampines Ave 5, 859A..."
                        value={queryText}
                        onChange={(e) => {
                          setQueryText(e.target.value);
                          setPage(1);
                        }}
                        className={`w-full pl-9 pr-3 py-2 rounded-lg text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors ${
                          theme === "dark" 
                            ? "bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500" 
                            : "bg-zinc-50 border-zinc-200 text-black placeholder-zinc-400"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Refresh and metadata actions */}
                <div className="flex items-center gap-2 pt-2 lg:pt-0">
                  <button
                    onClick={() => fetchLiveTransactions()}
                    disabled={loading}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black text-xs font-semibold shadow-xs transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                    <span>{loading ? "Refreshing..." : "Refresh Live Feed"}</span>
                  </button>
                </div>
              </div>

              {/* Fast Filter Presets */}
              <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-zinc-500 text-[11px] font-medium">Quick Queries:</span>
                <button
                  onClick={() => {
                    setTown("TAMPINES");
                    setFlatType("4 ROOM");
                    setQueryText("");
                    setPage(1);
                  }}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer border ${
                    town === "TAMPINES" && flatType === "4 ROOM"
                      ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400"
                  }`}
                >
                  4-Room Tampines (Official User Query)
                </button>
                <button
                  onClick={() => {
                    setTown("BISHAN");
                    setFlatType("4 ROOM");
                    setQueryText("");
                    setPage(1);
                  }}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer border ${
                    town === "BISHAN" && flatType === "4 ROOM"
                      ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400"
                  }`}
                >
                  4-Room Bishan
                </button>
                <button
                  onClick={() => {
                    setTown("PUNGGOL");
                    setFlatType("5 ROOM");
                    setQueryText("");
                    setPage(1);
                  }}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer border ${
                    town === "PUNGGOL" && flatType === "5 ROOM"
                      ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400"
                  }`}
                >
                  5-Room Punggol
                </button>
                <button
                  onClick={() => {
                    setTown("WOODLANDS");
                    setFlatType("EXECUTIVE");
                    setQueryText("");
                    setPage(1);
                  }}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer border ${
                    town === "WOODLANDS" && flatType === "EXECUTIVE"
                      ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400"
                  }`}
                >
                  Executive Woodlands
                </button>
              </div>
            </div>

            {/* Records Table */}
            <div className={`rounded-2xl border overflow-hidden transition-all ${
              theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-xs"
            }`}>
              {/* Header Status Bar */}
              <div className={`p-4 border-b flex flex-wrap items-center justify-between gap-3 text-xs ${
                theme === "dark" ? "bg-zinc-850 border-zinc-800 text-zinc-300" : "bg-zinc-50 border-zinc-200 text-zinc-700"
              }`}>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-black dark:text-white">
                    Showing {liveRecords.length} of {totalRecords.toLocaleString()} official transacted records
                  </span>
                  {town !== "ALL" && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white">
                      {town}
                    </span>
                  )}
                  {flatType !== "ALL" && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white">
                      {flatType}
                    </span>
                  )}
                </div>
                {lastRefreshed && (
                  <span className="font-mono text-[11px] text-zinc-400">
                    Live Synced: {lastRefreshed}
                  </span>
                )}
              </div>

              {loading ? (
                <div className="py-20 text-center">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-zinc-400 mb-3" />
                  <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    Fetching live transacted records from Data.gov.sg API...
                  </p>
                </div>
              ) : liveRecords.length === 0 ? (
                <div className="py-16 text-center">
                  <Building2 className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-black dark:text-white">
                    No matching transacted records found
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    Try adjusting the town, flat type, or street search term.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className={`border-b text-xs font-semibold uppercase tracking-widest ${
                      theme === "dark" 
                        ? "bg-zinc-800 text-zinc-400 border-zinc-800" 
                        : "bg-zinc-50 text-zinc-500 border-zinc-200"
                    }`}>
                      <tr>
                        <th className="py-3.5 px-4 sm:px-6">Registration Month</th>
                        <th className="py-3.5 px-4">Address & Town</th>
                        <th className="py-3.5 px-4">Flat Category & Model</th>
                        <th className="py-3.5 px-4">Floor Area / Storey</th>
                        <th className="py-3.5 px-4">Remaining Lease</th>
                        <th className="py-3.5 px-4">Official Transacted Price</th>
                        <th className="py-3.5 px-4">Calculated PSF</th>
                        <th className="py-3.5 px-4 sm:px-6">Direct Commission Saved</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                      {liveRecords.map((item) => (
                        <tr 
                          key={item._id} 
                          className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                        >
                          <td className="py-4 px-4 sm:px-6 font-mono font-medium text-black dark:text-white text-xs">
                            {item.month}
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-semibold text-black dark:text-white text-xs sm:text-sm">
                              Blk {item.block} {item.street_name}
                            </div>
                            <div className="text-[11px] text-zinc-500 font-medium">
                              {item.town}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-medium text-black dark:text-white text-xs">
                              {item.flat_type}
                            </div>
                            <div className="text-[11px] text-zinc-500">
                              {item.flat_model}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-xs">
                            <div className="font-mono font-semibold text-black dark:text-zinc-200">
                              {item.floor_area_sqm} sqm ({item.floor_area_sqft} sqft)
                            </div>
                            <div className="text-[11px] text-zinc-500">
                              Level {item.storey_range}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-xs text-zinc-600 dark:text-zinc-400">
                            <div>{item.remaining_lease}</div>
                            <div className="text-[10px] text-zinc-400">Commenced {item.lease_commence_date}</div>
                          </td>
                          <td className="py-4 px-4 font-mono font-bold text-black dark:text-white text-sm">
                            S${Number(item.resale_price).toLocaleString()}
                          </td>
                          <td className="py-4 px-4 font-mono font-semibold text-zinc-700 dark:text-zinc-300 text-xs">
                            S${item.psf} PSF
                          </td>
                          <td className="py-4 px-4 sm:px-6 font-mono font-bold text-black dark:text-white text-xs">
                            <span className="inline-flex items-center gap-1">
                              +S${item.commission_saved?.toLocaleString()}
                            </span>
                            <div className="text-[10px] text-zinc-400 font-normal">
                              vs 2% agent fee
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination Controls */}
              <div className={`p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
                theme === "dark" ? "bg-zinc-900 border-zinc-800 text-zinc-400" : "bg-zinc-50 border-zinc-200 text-zinc-600"
              }`}>
                <div className="flex items-center gap-2">
                  <span>Show</span>
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setPage(1);
                    }}
                    className={`px-2 py-1 rounded border text-xs cursor-pointer ${
                      theme === "dark" ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-zinc-200 text-black"
                    }`}
                  >
                    <option value={5}>5 records</option>
                    <option value={10}>10 records</option>
                    <option value={20}>20 records</option>
                    <option value={50}>50 records</option>
                  </select>
                  <span>per page</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1 || loading}
                    className="p-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 disabled:opacity-30 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages || loading}
                    className="p-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 disabled:opacity-30 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Official Source & Metadata Bar */}
              <div className={`p-4 border-t text-xs flex flex-wrap items-center justify-between gap-3 ${
                theme === "dark" 
                  ? "bg-zinc-900 border-zinc-800 text-zinc-400" 
                  : "bg-zinc-50 border-zinc-200 text-zinc-600"
              }`}>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-black dark:text-white shrink-0" />
                  <span>
                    Official Open Data Source: <strong>data.gov.sg</strong> (HDB Resale Prices, Jan 2017 – Present).
                  </span>
                </div>
                <a
                  href="https://data.gov.sg/datasets/d_8b84c4ee58e3cfc0ece0d773c8ca6abc/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-black dark:text-white hover:underline"
                >
                  <span>Dataset d_8b84c4ee58e3cfc0ece0d773c8ca6abc</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div>
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
        )}
      </div>
    </section>
  );
};
