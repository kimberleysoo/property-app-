import React, { useState } from "react";
import { 
  Cloud, 
  Smartphone, 
  Monitor, 
  Tablet, 
  RefreshCw, 
  CheckCircle2, 
  X, 
  Laptop, 
  Wifi, 
  ShieldCheck,
  Clock,
  HardDrive
} from "lucide-react";
import { ThemeMode, SyncedDevice, SavedCalculation } from "../types";

interface CloudSyncIndicatorProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  devices: SyncedDevice[];
  savedCalculations: SavedCalculation[];
  onTriggerSync: () => Promise<void>;
  lastSyncedTimestamp: string;
}

export const CloudSyncIndicator: React.FC<CloudSyncIndicatorProps> = ({
  isOpen,
  onClose,
  theme,
  devices,
  savedCalculations,
  onTriggerSync,
  lastSyncedTimestamp
}) => {
  const [syncing, setSyncing] = useState(false);
  const [syncSuccessMessage, setSyncSuccessMessage] = useState("");

  if (!isOpen) return null;

  const handleManualSync = async () => {
    setSyncing(true);
    await onTriggerSync();
    setTimeout(() => {
      setSyncing(false);
      setSyncSuccessMessage("Continuous Multi-Device State Synced!");
      setTimeout(() => setSyncSuccessMessage(""), 4000);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className={`w-full max-w-xl rounded-2xl border p-6 sm:p-8 shadow-xl transition-all ${
        theme === "dark" ? "bg-zinc-900 border-zinc-800 text-zinc-100" : "bg-white border-zinc-200 text-zinc-900"
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-black dark:text-white flex items-center gap-2">
                Seamless Multi-Device Cloud Sync
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white animate-pulse"></span>
                <span>Active Encrypted Cloud Session</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sync Status Banner */}
        <div className="mt-5 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 text-xs flex items-center justify-between">
          <div>
            <div className="text-zinc-400 flex items-center gap-1.5 text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>Last Cloud Sync:</span>
            </div>
            <div className="font-mono font-medium text-zinc-800 dark:text-zinc-200 mt-0.5">
              {lastSyncedTimestamp || "Just now"}
            </div>
          </div>

          <button
            onClick={handleManualSync}
            disabled={syncing}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-medium text-xs shadow-xs transition-all disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin" : ""}`} />
            <span>{syncing ? "Syncing..." : "Sync Devices Now"}</span>
          </button>
        </div>

        {syncSuccessMessage && (
          <div className="mt-3 p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-black dark:text-white text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-black dark:text-white shrink-0" />
            <span>{syncSuccessMessage}</span>
          </div>
        )}

        {/* Connected Devices List */}
        <div className="mt-6">
          <div className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3 flex items-center justify-between">
            <span>Synchronized Devices ({devices.length})</span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal">Real-Time State Replicated</span>
          </div>

          <div className="space-y-2">
            {devices.map((device) => (
              <div
                key={device.id}
                className={`p-3.5 rounded-lg border flex items-center justify-between text-xs ${
                  theme === "dark" ? "bg-zinc-800/40 border-zinc-800" : "bg-white border-zinc-200 shadow-xs"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white">
                    {device.type === "mobile" ? (
                      <Smartphone className="w-4 h-4" />
                    ) : device.type === "tablet" ? (
                      <Tablet className="w-4 h-4" />
                    ) : (
                      <Laptop className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-black dark:text-white">
                      {device.name}
                    </div>
                    <div className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5">
                      {device.os} • {device.ipLocation}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                    {device.lastSeen}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Synced Calculations on Cloud */}
        <div className="mt-6">
          <div className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">
            Synchronized Calculations & Shortlists ({savedCalculations.length})
          </div>

          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {savedCalculations.map((calc) => (
              <div
                key={calc.id}
                className={`p-3 rounded-lg border flex items-center justify-between text-xs ${
                  theme === "dark" ? "bg-zinc-800/40 border-zinc-800" : "bg-zinc-50 border-zinc-200"
                }`}
              >
                <div>
                  <span className="font-semibold text-black dark:text-white">
                    {calc.propertyType}
                  </span>
                  <div className="text-[11px] text-zinc-500">
                    Transacted Price: S${calc.price.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-black dark:text-white">
                    +S${calc.netSavings.toLocaleString()} saved
                  </span>
                  <div className="text-[10px] text-zinc-400">
                    Commission: S$0
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
