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

export interface HdbResaleRecord {
  _id: number;
  month: string;
  town: string;
  flat_type: string;
  block: string;
  street_name: string;
  storey_range: string;
  floor_area_sqm: string;
  floor_area_sqft?: number;
  flat_model: string;
  lease_commence_date: string;
  remaining_lease: string;
  resale_price: string | number;
  psf?: number;
  commission_saved?: number;
}

export interface HdbApiResponse {
  success: boolean;
  records: HdbResaleRecord[];
  total: number;
  limit: number;
  offset: number;
  filters?: Record<string, string>;
  datasetId: string;
  lastUpdated?: string;
}

export interface UraTransactionRecord {
  id: string;
  project: string;
  street: string;
  marketSegment: "CCR" | "RCR" | "OCR" | string;
  district: string;
  propertyType: string;
  tenure: string;
  contractDate: string;
  contractDateFormatted: string;
  typeOfSale: string;
  typeOfSaleLabel: "New Sale" | "Sub Sale" | "Resale" | string;
  price: number;
  areaSqm: number;
  areaSqft: number;
  psf: number;
  floorRange: string;
  noOfUnits: number;
  commissionSaved: number;
  batch: number;
}

export interface UraApiResponse {
  success: boolean;
  configured: boolean;
  totalProjects: number;
  totalTransactions: number;
  batchesLoaded: number[];
  records: UraTransactionRecord[];
  lastUpdated: string;
  message?: string;
}
