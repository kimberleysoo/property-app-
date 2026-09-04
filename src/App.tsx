/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { PriceComparisonTabs } from "./components/PriceComparisonTabs";
import { MarketDataBenchmarks } from "./components/MarketDataBenchmarks";
import { SecurityAndCertificates } from "./components/SecurityAndCertificates";
import { ClientReviews } from "./components/ClientReviews";
import { CloudSyncIndicator } from "./components/CloudSyncIndicator";
import { AiChatbot } from "./components/AiChatbot";
import { MobileAppFrame } from "./components/MobileAppFrame";
import { Footer } from "./components/Footer";
import { 
  DeviceViewMode, 
  ThemeMode, 
  PersonaType, 
  SyncedDevice, 
  SavedCalculation 
} from "./types";
import { INITIAL_SYNCED_DEVICES } from "./data/mockData";
import { MessageSquare, Cloud, ArrowUp } from "lucide-react";

export default function App() {
  const [viewMode, setViewMode] = useState<DeviceViewMode>("desktop");
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [persona, setPersona] = useState<PersonaType>("all");
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  const [devices, setDevices] = useState<SyncedDevice[]>(INITIAL_SYNCED_DEVICES);
  const [savedCalculations, setSavedCalculations] = useState<SavedCalculation[]>([
    {
      id: "calc-default-1",
      propertyType: "HDB 4-Room Model A",
      location: "Tampines St 82",
      price: 720000,
      traditionalCommission: 7848, // 1% + 9% GST
      directFee: 0,
      netSavings: 7848,
      persona: "buyer",
      timestamp: "Today, 10:14 AM"
    },
    {
      id: "calc-default-2",
      propertyType: "Private Resale Condo (D15)",
      location: "Amber Road",
      price: 2180000,
      traditionalCommission: 47524, // 2% + 9% GST
      directFee: 0,
      netSavings: 47524,
      persona: "seller",
      timestamp: "Yesterday, 4:32 PM"
    }
  ]);
  const [lastSyncedTimestamp, setLastSyncedTimestamp] = useState<string>("Synced 1 min ago (Real-Time)");

  // Sync theme with HTML document
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Scroll listener for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch initial cloud sync session
  useEffect(() => {
    fetch("/api/cloud-sync")
      .then((res) => res.json())
      .then((data) => {
        if (data.activeDevices) setDevices(data.activeDevices);
        if (data.savedCalculations && data.savedCalculations.length > 0) {
          setSavedCalculations(data.savedCalculations);
        }
        setLastSyncedTimestamp(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      })
      .catch(() => {
        // Fallback to initial state
      });
  }, []);

  // Handle saving new calculation to cloud
  const handleSaveCalculation = async (calc: Omit<SavedCalculation, "id" | "timestamp">) => {
    const newCalc: SavedCalculation = {
      ...calc,
      id: `calc-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setSavedCalculations((prev) => [newCalc, ...prev]);

    try {
      const res = await fetch("/api/cloud-sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ calculation: newCalc })
      });
      const data = await res.json();
      if (data.session) {
        setDevices(data.session.activeDevices);
        setLastSyncedTimestamp("Just now (Synced to 3 devices)");
      }
    } catch {
      setLastSyncedTimestamp("Saved locally & queued for sync");
    }
  };

  // Trigger manual cloud synchronization
  const handleTriggerSync = async () => {
    try {
      const res = await fetch("/api/cloud-sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceName: viewMode === "mobile-simulator" ? "Mobile App Simulator" : "Web Desktop Browser"
        })
      });
      const data = await res.json();
      if (data.session) {
        setDevices(data.session.activeDevices);
        setLastSyncedTimestamp("Synchronized Just Now across all 3 devices");
      }
    } catch {
      setLastSyncedTimestamp("Sync refreshed");
    }
  };

  const scrollToPricing = () => {
    const element = document.getElementById("pricing-comparison");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const mainContent = (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === "dark" ? "bg-zinc-900 text-zinc-100" : "bg-white text-black"
    }`}>
      {/* Header */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        theme={theme}
        setTheme={setTheme}
        persona={persona}
        setPersona={setPersona}
        onOpenSync={() => setIsSyncModalOpen(true)}
        onOpenAiChat={() => setIsAiChatOpen(true)}
        syncTimestamp={lastSyncedTimestamp}
      />

      <main>
        {/* Hero Section with Live Metrics */}
        <HeroSection
          persona={persona}
          setPersona={setPersona}
          theme={theme}
          onOpenAiChat={() => setIsAiChatOpen(true)}
          onScrollToPricing={scrollToPricing}
        />

        {/* Price Comparison Tabs & Interactive Calculator */}
        <PriceComparisonTabs
          theme={theme}
          onSaveCalculation={handleSaveCalculation}
        />

        {/* URA and HDB Valuation Benchmarks & Statistical Explorer */}
        <MarketDataBenchmarks
          theme={theme}
        />

        {/* Security Features & Verified Certificates */}
        <SecurityAndCertificates
          theme={theme}
        />

        {/* Authentic Client Experiences & Reviews */}
        <ClientReviews
          theme={theme}
          persona={persona}
        />
      </main>

      {/* Footer */}
      <Footer
        theme={theme}
        onOpenSync={() => setIsSyncModalOpen(true)}
        onOpenAiChat={() => setIsAiChatOpen(true)}
      />

      {/* Floating Action Buttons (when Chatbot closed) */}
      {!isAiChatOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
          {showBackToTop && (
            <button
              onClick={scrollToTop}
              title="Back to Top"
              className={`p-2.5 rounded-full border shadow-xs transition-all cursor-pointer ${
                theme === "dark"
                  ? "bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-200"
                  : "bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-700"
              }`}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          )}

          <button
            id="floating-ai-advisor-btn"
            onClick={() => setIsAiChatOpen(true)}
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-medium text-xs shadow-lg transition-transform hover:scale-105 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask PropDirect AI</span>
          </button>
        </div>
      )}

      {/* Cloud Sync Status Modal / Drawer */}
      <CloudSyncIndicator
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        theme={theme}
        devices={devices}
        savedCalculations={savedCalculations}
        onTriggerSync={handleTriggerSync}
        lastSyncedTimestamp={lastSyncedTimestamp}
      />

      {/* Grounded AI Chatbot Drawer */}
      <AiChatbot
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        theme={theme}
        persona={persona}
      />
    </div>
  );

  return (
    <MobileAppFrame
      theme={theme}
      viewMode={viewMode}
      setViewMode={setViewMode}
      onOpenAiChat={() => setIsAiChatOpen(true)}
      onOpenSync={() => setIsSyncModalOpen(true)}
    >
      {mainContent}
    </MobileAppFrame>
  );
}
