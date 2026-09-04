export type DeviceViewMode = "desktop" | "mobile-simulator";
export type ThemeMode = "light" | "dark";
export type PersonaType = "first-time-buyer" | "hdb-upgrader" | "landlord-tenant" | "all";

export interface MarketBenchmark {
  category: string;
  matureMedian: number;
  nonMatureMedian: number;
  maturePSF: number;
  nonMaturePSF: number;
  sampleEstates: string;
}

export interface SecurityCert {
  id: string;
  name: string;
  badge: string;
  certNumber: string;
  issuer: string;
  purpose: string;
  validUntil: string;
  auditStandard: string;
  verificationHash: string;
  features: string[];
}

export interface ClientReview {
  id: string;
  name: string;
  age: string;
  occupation: string;
  persona: "first-time-buyer" | "hdb-upgrader" | "landlord-tenant";
  personaLabel: string;
  propertyType: string;
  location: string;
  transactedPrice: number;
  commissionSaved: number;
  rating: number;
  date: string;
  headline: string;
  reviewText: string;
  singpassVerified: boolean;
  avatarUrl?: string;
  keyStat: string;
}

export interface SyncedDevice {
  id: string;
  name: string;
  type: "mobile" | "desktop" | "tablet";
  os: string;
  ipLocation: string;
  lastSeen: string;
}

export interface SavedCalculation {
  id: string;
  propertyType: string;
  location: string;
  price: number;
  traditionalCommission: number;
  directFee: number;
  netSavings: number;
  persona: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  sourceBadge?: string;
}
