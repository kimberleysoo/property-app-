import React, { useState } from "react";
import { 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingDown, 
  Building2, 
  MapPin, 
  MessageSquare,
  PlusCircle,
  X
} from "lucide-react";
import { ThemeMode, ClientReview, PersonaType } from "../types";
import { CLIENT_REVIEWS } from "../data/mockData";

interface ClientReviewsProps {
  theme: ThemeMode;
  persona: PersonaType;
}

export const ClientReviews: React.FC<ClientReviewsProps> = ({ theme, persona }) => {
  const [activeFilter, setActiveFilter] = useState<PersonaType>(persona !== "all" ? persona : "all");
  const [reviewsList, setReviewsList] = useState<ClientReview[]>(CLIENT_REVIEWS);
  const [showAddModal, setShowAddModal] = useState(false);

  // New review form states
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewPersona, setNewReviewPersona] = useState<"first-time-buyer" | "hdb-upgrader" | "landlord-tenant">("first-time-buyer");
  const [newReviewProperty, setNewReviewProperty] = useState("");
  const [newReviewLocation, setNewReviewLocation] = useState("");
  const [newReviewSaved, setNewReviewSaved] = useState<number>(14000);
  const [newReviewHeadline, setNewReviewHeadline] = useState("");
  const [newReviewBody, setNewReviewBody] = useState("");

  const filteredReviews = reviewsList.filter((rev) => {
    if (activeFilter === "all") return true;
    return rev.persona === activeFilter;
  });

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName || !newReviewHeadline || !newReviewBody) return;

    const personaLabelMap = {
      "first-time-buyer": "First-Time HDB Resale Buyer",
      "hdb-upgrader": "HDB Upgrader to Condo",
      "landlord-tenant": "Landlord / Tenant"
    };

    const newReview: ClientReview = {
      id: `rev-${Date.now()}`,
      name: newReviewName,
      age: "Verified Client",
      occupation: "Verified Homeowner",
      persona: newReviewPersona,
      personaLabel: personaLabelMap[newReviewPersona],
      propertyType: newReviewProperty || "HDB Resale Flat",
      location: newReviewLocation || "Singapore",
      transactedPrice: 750000,
      commissionSaved: Number(newReviewSaved),
      rating: 5,
      date: "Verified Just Now",
      headline: newReviewHeadline,
      reviewText: newReviewBody,
      singpassVerified: true,
      keyStat: `S$${Number(newReviewSaved).toLocaleString()} Net Savings`
    };

    setReviewsList([newReview, ...reviewsList]);
    setShowAddModal(false);
    setNewReviewName("");
    setNewReviewHeadline("");
    setNewReviewBody("");
  };

  return (
    <section id="client-reviews" className="py-12 sm:py-16 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 mb-3">
            <Star className="w-3.5 h-3.5 text-black dark:text-white" />
            <span>Real Transacted Customer Experiences</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black dark:text-white tracking-tight">
            Client Experiences & Case Studies
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Read authentic experiences from first-time HDB buyers, HDB upgraders, landlords, and tenants 
            who transacted directly and saved thousands in agent commissions.
          </p>
        </div>

        {/* Filter Navigation and Add Review Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className={`p-1 rounded-lg border flex flex-wrap gap-1 ${
            theme === "dark" ? "bg-zinc-800 border-zinc-700" : "bg-zinc-100 border-zinc-200"
          }`}>
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                activeFilter === "all"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-xs font-semibold"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              }`}
            >
              All Clients ({reviewsList.length})
            </button>
            <button
              onClick={() => setActiveFilter("first-time-buyer")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                activeFilter === "first-time-buyer"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-xs font-semibold"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              }`}
            >
              First-Time HDB Buyers
            </button>
            <button
              onClick={() => setActiveFilter("hdb-upgrader")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                activeFilter === "hdb-upgrader"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-xs font-semibold"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              }`}
            >
              HDB Upgraders to Condo
            </button>
            <button
              onClick={() => setActiveFilter("landlord-tenant")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                activeFilter === "landlord-tenant"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-xs font-semibold"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Landlords & Tenants
            </button>
          </div>

          <button
            id="share-experience-btn"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black shadow-xs transition-all cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Share Transacted Experience</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
                theme === "dark" 
                  ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700" 
                  : "bg-white border-zinc-200 hover:border-zinc-300 shadow-xs"
              }`}
            >
              <div>
                {/* Header: Persona tag, stars */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
                    {rev.personaLabel}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-black dark:fill-white text-black dark:text-white" />
                    ))}
                  </div>
                </div>

                {/* Savings Pill */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white text-xs font-mono font-bold mb-3 border border-zinc-200 dark:border-zinc-700">
                  <TrendingDown className="w-3.5 h-3.5 text-black dark:text-white" />
                  <span>{rev.keyStat}</span>
                </div>

                <h3 className="font-bold text-base text-black dark:text-white leading-snug">
                  "{rev.headline}"
                </h3>

                <p className="mt-3 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {rev.reviewText}
                </p>
              </div>

              {/* Author & Property details footer */}
              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-black dark:text-white flex items-center gap-1">
                    <span>{rev.name}</span>
                    {rev.singpassVerified && (
                      <span title="Singpass Verified Identity">
                        <CheckCircle2 className="w-3.5 h-3.5 text-black dark:text-white inline" />
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {rev.propertyType} • {rev.location}
                  </div>
                </div>
                <div className="text-[11px] text-zinc-400 font-medium shrink-0">
                  {rev.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal to submit review */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className={`w-full max-w-lg rounded-2xl border p-6 sm:p-8 shadow-xl ${
              theme === "dark" ? "bg-zinc-900 border-zinc-800 text-zinc-100" : "bg-white border-zinc-200 text-black"
            }`}>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <h3 className="font-bold text-base text-black dark:text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-black dark:text-white" />
                  Share Your Direct Transacted Experience
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-black dark:hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddReview} className="mt-4 space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">Your Name / Initials</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jason & Kimberly Tan"
                    value={newReviewName}
                    onChange={(e) => setNewReviewName(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">Transaction Category</label>
                    <select
                      value={newReviewPersona}
                      onChange={(e) => setNewReviewPersona(e.target.value as any)}
                      className="w-full p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    >
                      <option value="first-time-buyer">First-Time HDB Buyer</option>
                      <option value="hdb-upgrader">HDB Upgrader to Condo</option>
                      <option value="landlord-tenant">Landlord / Tenant</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">Commission Saved (S$)</label>
                    <input
                      type="number"
                      required
                      placeholder="14500"
                      value={newReviewSaved}
                      onChange={(e) => setNewReviewSaved(Number(e.target.value))}
                      className="w-full p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">Property Type</label>
                    <input
                      type="text"
                      placeholder="e.g. 4-Room Model A"
                      value={newReviewProperty}
                      onChange={(e) => setNewReviewProperty(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">Town / District</label>
                    <input
                      type="text"
                      placeholder="e.g. Bishan / D15"
                      value={newReviewLocation}
                      onChange={(e) => setNewReviewLocation(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">Experience Headline</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Saved $14k in fees and completed our Option to Purchase in 10 days"
                    value={newReviewHeadline}
                    onChange={(e) => setNewReviewHeadline(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>

                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">Your Direct Experience Review</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe how direct transacting, URA benchmark data, or Singpass title verification helped your property transaction..."
                    value={newReviewBody}
                    onChange={(e) => setNewReviewBody(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-semibold transition-colors cursor-pointer"
                  >
                    Publish Verified Experience
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
