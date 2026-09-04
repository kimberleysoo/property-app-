import React from "react";
import { 
  ShieldCheck, 
  Smartphone, 
  Monitor, 
  Sun, 
  Moon, 
  Cloud, 
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { DeviceViewMode, ThemeMode, PersonaType } from "../types";

interface HeaderProps {
  viewMode: DeviceViewMode;
  setViewMode: (mode: DeviceViewMode) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  persona: PersonaType;
  setPersona: (persona: PersonaType) => void;
  onOpenSync: () => void;
  onOpenAiChat: () => void;
  syncTimestamp: string;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  theme,
  setTheme,
  onOpenSync,
  onOpenAiChat,
}) => {
  return (
    <header className={`sticky top-0 z-40 border-b transition-colors duration-200 ${
      theme === "dark" 
        ? "bg-zinc-950/95 border-zinc-800 text-zinc-100" 
        : "bg-white/95 border-zinc-200 text-zinc-900 backdrop-blur-md"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 focus:outline-none group">
              <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black font-extrabold text-sm tracking-tight transition-transform group-hover:scale-105">
                P
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-black dark:text-white">
                  SG PropDirect
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hidden sm:inline-block">
                  0% Commission
                </span>
              </div>
            </a>
          </div>

          {/* Clean Navigation Links - Simplified & User Friendly */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            <a 
              href="#pricing-comparison" 
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a 
              href="#market-benchmarks" 
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Market Data
            </a>
            <a 
              href="#security-certificates" 
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Security
            </a>
            <a 
              href="#client-reviews" 
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Reviews
            </a>
          </nav>

          {/* Clean Right Controls (View Switcher, Cloud Sync, Theme, AI Advisor) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Switcher: Desktop Web vs Mobile App */}
            <div className={`p-1 rounded-lg border flex items-center gap-0.5 text-xs ${
              theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-zinc-100 border-zinc-200"
            }`}>
              <button
                id="view-desktop-btn"
                onClick={() => setViewMode("desktop")}
                title="View Desktop Layout"
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  viewMode === "desktop"
                    ? "bg-black dark:bg-white text-white dark:text-black shadow-xs font-semibold"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white font-medium"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
              <button
                id="view-mobile-btn"
                onClick={() => setViewMode("mobile-simulator")}
                title="View Mobile App Layout"
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  viewMode === "mobile-simulator"
                    ? "bg-black dark:bg-white text-white dark:text-black shadow-xs font-semibold"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white font-medium"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>

            {/* Cloud Sync Status Indicator */}
            <button
              id="cloud-sync-btn"
              onClick={onOpenSync}
              title="Cloud Sync Status"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                theme === "dark"
                  ? "bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300"
                  : "bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-700 shadow-2xs"
              }`}
            >
              <Cloud className="w-3.5 h-3.5 text-zinc-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100"></span>
              <span className="hidden lg:inline">Synced</span>
            </button>

            {/* AI Advisor Button */}
            <button
              id="header-ai-advisor-btn"
              onClick={onOpenAiChat}
              className="flex items-center gap-1.5 bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Advisor</span>
            </button>

            {/* Theme Toggle (Dark / Light) */}
            <button
              id="theme-toggle-btn"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              title={`Switch to ${theme === "light" ? "Dark" : "Light"} mode`}
              aria-label="Toggle color theme"
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                theme === "dark"
                  ? "bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300"
                  : "bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-700"
              }`}
            >
              {theme === "light" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
