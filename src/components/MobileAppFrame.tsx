import React from "react";
import { 
  Smartphone, 
  Monitor, 
  Wifi, 
  Battery, 
  Signal, 
  Home, 
  Calculator, 
  ShieldCheck, 
  MessageSquare, 
  Cloud,
  ChevronLeft
} from "lucide-react";
import { ThemeMode, DeviceViewMode } from "../types";

interface MobileAppFrameProps {
  children: React.ReactNode;
  theme: ThemeMode;
  viewMode: DeviceViewMode;
  setViewMode: (mode: DeviceViewMode) => void;
  onOpenAiChat: () => void;
  onOpenSync: () => void;
}

export const MobileAppFrame: React.FC<MobileAppFrameProps> = ({
  children,
  theme,
  viewMode,
  setViewMode,
  onOpenAiChat,
  onOpenSync,
}) => {
  if (viewMode === "desktop") {
    return <>{children}</>;
  }

  return (
    <div className={`min-h-screen py-6 sm:py-10 px-2 sm:px-4 flex flex-col items-center justify-center transition-colors ${
      theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-slate-100 text-slate-900"
    }`}>
      {/* Top Banner Explaining the Mobile App Simulator View */}
      <div className="max-w-md w-full mb-4 flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-slate-900 text-white text-xs shadow-sm">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-indigo-400" />
          <span className="font-medium">Simulating Native Singapore Mobile App</span>
        </div>
        <button
          onClick={() => setViewMode("desktop")}
          className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Exit to Desktop</span>
        </button>
      </div>

      {/* Realistic Smartphone Frame */}
      <div className="relative w-full max-w-[420px] h-[860px] max-h-[90vh] rounded-[48px] border-[10px] border-slate-900 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col bg-white dark:bg-slate-900">
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute top-0 left-0 right-0 h-10 z-50 flex items-center justify-between px-7 text-[11px] font-medium text-slate-800 dark:text-slate-200 pointer-events-none">
          <span>9:41</span>
          <div className="w-24 h-5 bg-black rounded-full mx-auto -mt-1 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ml-auto mr-2"></div>
          </div>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Scrollable App Body */}
        <div className="flex-1 overflow-y-auto pt-10 pb-16">
          {children}
        </div>

        {/* Simulated Native Mobile Bottom Tab Bar */}
        <div className={`absolute bottom-0 left-0 right-0 h-16 border-t z-50 flex items-center justify-around px-4 backdrop-blur-md ${
          theme === "dark" 
            ? "bg-slate-900/95 border-slate-800 text-slate-400" 
            : "bg-white/95 border-slate-200 text-slate-600"
        }`}>
          <a href="#" className="flex flex-col items-center gap-1 text-indigo-600 dark:text-indigo-400">
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-bold">Home</span>
          </a>

          <a href="#pricing-comparison" className="flex flex-col items-center gap-1 hover:text-indigo-600 transition-colors">
            <Calculator className="w-5 h-5" />
            <span className="text-[10px] font-medium">Pricing</span>
          </a>

          <button 
            onClick={onOpenAiChat}
            className="flex flex-col items-center gap-1 hover:text-indigo-600 transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center shadow-xs">
              <MessageSquare className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-medium text-slate-900 dark:text-slate-100">AI Chat</span>
          </button>

          <a href="#security-certificates" className="flex flex-col items-center gap-1 hover:text-indigo-600 transition-colors">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px] font-medium">Security</span>
          </a>

          <button 
            onClick={onOpenSync}
            className="flex flex-col items-center gap-1 hover:text-indigo-600 transition-colors cursor-pointer"
          >
            <Cloud className="w-5 h-5 text-emerald-500" />
            <span className="text-[10px] font-medium">Sync</span>
          </button>
        </div>
      </div>
    </div>
  );
};
