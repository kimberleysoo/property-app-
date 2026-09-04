import { SecurityCert, ClientReview, MarketBenchmark, SyncedDevice } from "../types";

export const MARKET_BENCHMARKS: MarketBenchmark[] = [
  {
    category: "3-Room HDB Resale",
    matureMedian: 485000,
    nonMatureMedian: 410000,
    maturePSF: 685,
    nonMaturePSF: 540,
    sampleEstates: "Queenstown, Toa Payoh vs Woodlands, Sembawang"
  },
  {
    category: "4-Room HDB Resale",
    matureMedian: 720000,
    nonMatureMedian: 565000,
    maturePSF: 740,
    nonMaturePSF: 580,
    sampleEstates: "Bishan, Bukit Merah vs Punggol, Sengkang"
  },
  {
    category: "5-Room HDB Resale",
    matureMedian: 890000,
    nonMatureMedian: 675000,
    maturePSF: 760,
    nonMaturePSF: 590,
    sampleEstates: "Tampines, Marine Parade vs Yishun, Jurong West"
  },
  {
    category: "Executive / Maisonette",
    matureMedian: 1080000,
    nonMatureMedian: 840000,
    maturePSF: 710,
    nonMaturePSF: 560,
    sampleEstates: "Bishan, Pasir Ris vs Woodlands, Choa Chu Kang"
  },
  {
    category: "Private Resale Condo (OCR)",
    matureMedian: 1650000,
    nonMatureMedian: 1520000,
    maturePSF: 1780,
    nonMaturePSF: 1640,
    sampleEstates: "District 19 (Hougang/Punggol), District 23 (Bukit Batok)"
  },
  {
    category: "Private Resale Condo (RCR)",
    matureMedian: 2450000,
    nonMatureMedian: 2280000,
    maturePSF: 2320,
    nonMaturePSF: 2190,
    sampleEstates: "District 15 (East Coast), District 3 (Alexandra)"
  },
  {
    category: "Private Resale Condo (CCR)",
    matureMedian: 3600000,
    nonMatureMedian: 3200000,
    maturePSF: 2850,
    nonMaturePSF: 2680,
    sampleEstates: "District 9 (Orchard), District 10 (Tanglin/Bukit Timah)"
  }
];

export const SECURITY_CERTS: SecurityCert[] = [
  {
    id: "govtech-singpass",
    name: "GovTech Singpass MyInfo Partner",
    badge: "Official Identity Partner",
    certNumber: "SG-GT-MYINFO-2025-9812",
    issuer: "Government Technology Agency of Singapore (GovTech)",
    purpose: "Biometric identity verification and SLA title deed cross-checking to prevent impersonation and fake listings.",
    validUntil: "31 Dec 2027",
    auditStandard: "GovTech Tier-1 Identity Verification & OIDC Secure Token Standard",
    verificationHash: "SHA256: 8f4b10e52a97c8d20387b99c011e4f93821a73cb",
    features: [
      "100% verified NRIC / FIN identity for all transacting parties",
      "Direct API query to SLA (Singapore Land Authority) land title registers",
      "Automated Anti-Money Laundering (AML) & Counter Financing of Terrorism (CFT) screen",
      "Eliminates fictitious dummy listings and unauthorized sub-letting"
    ]
  },
  {
    id: "iso-27001",
    name: "ISO/IEC 27001:2022 Certified",
    badge: "Banking-Grade ISMS",
    certNumber: "ISMS-SG-774921",
    issuer: "TÜV SÜD PSB Singapore",
    purpose: "Information security management system ensuring complete protection of financial, loan, and personal data.",
    validUntil: "15 Apr 2027",
    auditStandard: "ISO/IEC 27001:2022 Stage 2 Surveillance Audit",
    verificationHash: "SHA256: 43a290bc91ff48a73b2201948834db7a9203cd84",
    features: [
      "AES-256 at-rest database encryption across all records",
      "TLS 1.3 in-transit encryption with strict HSTS policies",
      "Role-based access controls with hardware-isolated secret management",
      "Annual independent penetration testing by CREST-certified auditors"
    ]
  },
  {
    id: "imda-dptm",
    name: "IMDA Data Protection Trustmark (DPTM)",
    badge: "Singapore PDPA Verified",
    certNumber: "DPTM-SG-2024-0418",
    issuer: "Infocomm Media Development Authority (IMDA)",
    purpose: "Validation of robust data protection practices in strict compliance with the Singapore Personal Data Protection Act (PDPA).",
    validUntil: "30 Nov 2026",
    auditStandard: "IMDA Accountability Agent Assessment Scheme",
    verificationHash: "SHA256: 7b89d41f5309cb9e84715f204ba38920155b9e01",
    features: [
      "No selling or sharing of user telephone numbers or income records",
      "Automated consent revocation and zero spam policy",
      "Strict data retention limits following transaction completion",
      "Monitored by designated Data Protection Officer (DPO)"
    ]
  },
  {
    id: "sla-escrow",
    name: "SLA-Compliant Legal Escrow Protection",
    badge: "Conveyancing Regulated",
    certNumber: "SG-LAW-ESCROW-V8",
    issuer: "Singapore Academy of Law & Law Society Regulated Trust Accounts",
    purpose: "Protection of 1% Option-to-Purchase (OTP) deposit and 4% Exercise fees held in certified conveyancing accounts.",
    validUntil: "Continuous Statutory Compliance",
    auditStandard: "Legal Profession (Conveyancing Money) Rules 2011",
    verificationHash: "SHA256: e924a73b40091ff38b93940175bca203947812cd",
    features: [
      "Zero cash-in-hand transactions; all deposits routed through certified trust accounts",
      "Release of funds conditioned on official HDB or SLA completion endorsement",
      "Insured conveyancing lawyer representation for both parties",
      "Statutory dispute resolution and compensation fund backing"
    ]
  }
];

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: "rev-1",
    name: "Marcus Tan & Cheryl Lee",
    age: "31 & 29",
    occupation: "Software Engineer & UX Designer",
    persona: "first-time-buyer",
    personaLabel: "First-Time HDB Resale Buyers",
    propertyType: "4-Room HDB Model A (990 sqft)",
    location: "Tampines St 82 (District 18)",
    transactedPrice: 710000,
    commissionSaved: 15478,
    rating: 5,
    date: "Transacted Jan 2026",
    headline: "Saved $15.4k in buyer fees and negotiated directly using URA median PSF data.",
    reviewText: "As tech professionals in our late 20s with a combined income around S$13k, we were ready to buy our first home within 4 months. We viewed flats ourselves on weekends and hated the thought of paying a 1% buyer agent commission plus GST for someone to just submit portal paperwork. With SG PropDirect, we pulled the transacted PSF for Tampines, verified the seller's title via Singpass, and used the standardized digital Option to Purchase. The S$15,478 saved paid for our entire built-in carpentry renovation!",
    singpassVerified: true,
    keyStat: "S$15,478 Net Savings"
  },
  {
    id: "rev-2",
    name: "Desmond & Janice Lim",
    age: "42 & 39",
    occupation: "Finance Director & Senior Marketing Lead",
    persona: "hdb-upgrader",
    personaLabel: "HDB Upgrader to Private Condo",
    propertyType: "Sold 5-Room HDB ($860k) → Bought 3BR Resale Condo ($2.18M)",
    location: "Sold: Bishan St 13 → Bought: Amber Road (District 15)",
    transactedPrice: 2180000,
    commissionSaved: 46870,
    rating: 5,
    date: "Transacted Feb 2026",
    headline: "Seamless transition, ABSD timeline guidance, and $46,870 combined commission saved.",
    reviewText: "We owned our 5-room HDB in Bishan for 9 years and wanted to upgrade our family to a private condo near East Coast. Traditional agents quoted us 2% to sell our HDB and urged us to rush, which would have cost over S$18,700 in seller commission alone, plus high transaction friction. We listed directly on PropDirect, matched with a pre-approved buyer in 11 days, and purchased our Amber Road unit directly. The AI property assistant accurately explained the 6-month ABSD remission timeline, and our synchronized dashboard kept every document up-to-date across my laptop and phone.",
    singpassVerified: true,
    keyStat: "S$46,870 Combined Savings"
  },
  {
    id: "rev-3",
    name: "Mr. Ronald Tan",
    age: "58",
    occupation: "Retired SME Director & Property Investor",
    persona: "landlord-tenant",
    personaLabel: "Private & HDB Landlord",
    propertyType: "2 Rental Units (Novena & Queenstown)",
    location: "Lincoln Road (D11) & Stirling Road (D3)",
    transactedPrice: 4200,
    commissionSaved: 9156,
    rating: 5,
    date: "Transacted Dec 2025",
    headline: "Direct lease renewals with Singpass KYC. No more paying 1-month rent to middlemen.",
    reviewText: "Every two years when tenancy agreements expired, traditional property agents asked for 1 month's rent + 9% GST just to print out the CEA standard agreement. On two units renting at $4,200/mo, that was over $9,100 vanished! On SG PropDirect, I connected directly with verified expat and local tenants, verified employment and work passes seamlessly, stamped the digital e-tenancy via IRAS integration, and saved 100% of the commission fee.",
    singpassVerified: true,
    keyStat: "S$9,156 Saved per Cycle"
  },
  {
    id: "rev-4",
    name: "Priya Sundaram & Sarah Lee",
    age: "27 & 28",
    occupation: "Data Analysts (Tech MNC)",
    persona: "landlord-tenant",
    personaLabel: "Tenants / Working Professionals",
    propertyType: "3-Room Apartment Rental",
    location: "Tanjong Pagar / Spottiswoode Park (District 2)",
    transactedPrice: 3800,
    commissionSaved: 4142,
    rating: 5,
    date: "Transacted Jan 2026",
    headline: "Zero tenant commission, direct landlord chat, and verified ownership proof.",
    reviewText: "As renters in central Singapore, we frequently encountered agents asking for half-month or full-month commission just to show us a unit. On this platform, we could see the verified Singpass owner badge, negotiate directly in the chat, and sign the digital lease with legal inventory checklists. It was completely stress-free.",
    singpassVerified: true,
    keyStat: "S$4,142 Zero Agent Fee"
  },
  {
    id: "rev-5",
    name: "Kelvin & Valerie Ng",
    age: "34 & 32",
    occupation: "Civil Servant & Pharmacist",
    persona: "first-time-buyer",
    personaLabel: "First-Time Resale HDB Buyers",
    propertyType: "5-Room Premium Flat (1,216 sqft)",
    location: "Punggol Central (Waterway Terraces)",
    transactedPrice: 760000,
    commissionSaved: 16568,
    rating: 5,
    date: "Transacted Nov 2025",
    headline: "Realistic valuation benchmarking prevented us from paying crazy COV (Cash-Over-Valuation).",
    reviewText: "We were afraid of overpaying because of hype. The URA/HDB transacted benchmark on the platform clearly indicated the median PSF in Punggol was S$625. We offered fair market value without any inflated agent markup. Transparent, reliable, and saved us S$16,568.",
    singpassVerified: true,
    keyStat: "S$16,568 Net Savings"
  }
];

export const INITIAL_SYNCED_DEVICES: SyncedDevice[] = [
  {
    id: "dev-iphone",
    name: "iPhone 16 Pro (Mobile App)",
    type: "mobile",
    os: "iOS 18.3",
    ipLocation: "Singapore (Singtel 5G)",
    lastSeen: "Active Now"
  },
  {
    id: "dev-macbook",
    name: "MacBook Pro 16\" M3 Max",
    type: "desktop",
    os: "macOS Sequoia",
    ipLocation: "Singapore (StarHub Fibre)",
    lastSeen: "Active Now"
  },
  {
    id: "dev-ipad",
    name: "iPad Air M2 (Tablet App)",
    type: "tablet",
    os: "iPadOS 18.2",
    ipLocation: "Singapore (MyRepublic)",
    lastSeen: "Synced 4m ago"
  }
];
