import React, { useState } from "react";
import { 
  ShieldCheck, 
  Lock, 
  FileCheck2, 
  KeyRound, 
  CheckCircle2, 
  ExternalLink, 
  X, 
  QrCode, 
  Fingerprint, 
  Server,
  Building,
  Scale
} from "lucide-react";
import { ThemeMode, SecurityCert } from "../types";
import { SECURITY_CERTS } from "../data/mockData";

interface SecurityAndCertificatesProps {
  theme: ThemeMode;
}

export const SecurityAndCertificates: React.FC<SecurityAndCertificatesProps> = ({ theme }) => {
  const [selectedCert, setSelectedCert] = useState<SecurityCert | null>(null);

  return (
    <section id="security-certificates" className="py-12 sm:py-16 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
            <span>Singapore Regulatory & Security Compliance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black dark:text-white tracking-tight">
            Security Features & Verified Certificates
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Every transaction is safeguarded by GovTech Singpass MyInfo biometric authentication, 
            ISO/IEC 27001 audited encryption, and Singapore Academy of Law conveyancing escrow accounts.
          </p>
        </div>

        {/* 4 Major Certificate Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SECURITY_CERTS.map((cert) => (
            <div
              key={cert.id}
              className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
                theme === "dark" 
                  ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700" 
                  : "bg-white border-zinc-200 hover:border-zinc-300 shadow-xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-black dark:text-white border border-zinc-200 dark:border-zinc-700">
                    {cert.id === "govtech-singpass" ? (
                      <Fingerprint className="w-4 h-4 text-black dark:text-white" />
                    ) : cert.id === "iso-27001" ? (
                      <Server className="w-4 h-4 text-black dark:text-white" />
                    ) : cert.id === "imda-dptm" ? (
                      <Lock className="w-4 h-4 text-black dark:text-white" />
                    ) : (
                      <Scale className="w-4 h-4 text-black dark:text-white" />
                    )}
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 text-black dark:bg-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-zinc-600 dark:text-zinc-400" />
                    Verified
                  </span>
                </div>

                <h3 className="font-bold text-base text-black dark:text-white">
                  {cert.name}
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">
                  Cert: {cert.certNumber}
                </p>

                <p className="mt-3 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {cert.purpose}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  id={`btn-verify-cert-${cert.id}`}
                  onClick={() => setSelectedCert(cert)}
                  className="w-full py-2 px-3 rounded-lg text-xs font-medium text-black dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileCheck2 className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Inspect Audit Certificate</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Security Architecture Guarantees Summary */}
        <div className={`mt-10 p-6 sm:p-8 rounded-2xl border ${
          theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-zinc-50 border-zinc-200"
        }`}>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white flex items-center justify-center shrink-0 mt-0.5 border border-zinc-300 dark:border-zinc-700">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-black dark:text-white">
                  Zero Fake Listings Policy
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                  100% of property addresses and ownership details are cross-referenced with the Singapore Land Authority (SLA) registry before publication.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white flex items-center justify-center shrink-0 mt-0.5 border border-zinc-300 dark:border-zinc-700">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-black dark:text-white">
                  Bank-Grade TLS & AES-256
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                  End-to-end encrypted chats, digital lease signing, and confidential financial documents isolated with hardware key management.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white flex items-center justify-center shrink-0 mt-0.5 border border-zinc-300 dark:border-zinc-700">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-black dark:text-white">
                  Statutory Escrow Money Rules
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                  All 1% Option Fees and 4% Exercise deposits are held under Legal Profession (Conveyancing Money) Rules with zero direct cash risk.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal: Certificate Verification Details */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className={`w-full max-w-lg rounded-2xl border p-6 sm:p-8 shadow-xl transition-all ${
              theme === "dark" ? "bg-zinc-900 border-zinc-800 text-zinc-100" : "bg-white border-zinc-200 text-black"
            }`}>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-black dark:text-white">
                      {selectedCert.name}
                    </h3>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-black dark:text-white" />
                      Status: {selectedCert.badge}
                    </span>
                  </div>
                </div>

                <button
                  id="close-cert-modal-btn"
                  onClick={() => setSelectedCert(null)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-5 space-y-3.5 text-xs">
                <div>
                  <span className="text-zinc-400 uppercase tracking-widest text-[10px] font-semibold">Issuing Authority:</span>
                  <div className="font-medium text-black dark:text-white mt-0.5">{selectedCert.issuer}</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-zinc-400 uppercase tracking-widest text-[10px] font-semibold">Certificate Number:</span>
                    <div className="font-mono font-medium text-black dark:text-white mt-0.5">{selectedCert.certNumber}</div>
                  </div>
                  <div>
                    <span className="text-zinc-400 uppercase tracking-widest text-[10px] font-semibold">Valid Through:</span>
                    <div className="font-medium text-black dark:text-white mt-0.5">{selectedCert.validUntil}</div>
                  </div>
                </div>

                <div>
                  <span className="text-zinc-400 uppercase tracking-widest text-[10px] font-semibold">Compliance Audit Standard:</span>
                  <div className="font-medium text-black dark:text-white mt-0.5">{selectedCert.auditStandard}</div>
                </div>

                <div>
                  <span className="text-zinc-400 uppercase tracking-widest text-[10px] font-semibold">Cryptographic Ledger Hash:</span>
                  <div className="font-mono text-[11px] p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 break-all select-all mt-0.5">
                    {selectedCert.verificationHash}
                  </div>
                </div>

                <div>
                  <span className="text-zinc-400 uppercase tracking-widest text-[10px] font-semibold">Enforced Security Features:</span>
                  <ul className="mt-1.5 space-y-1.5">
                    {selectedCert.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-700 dark:text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-black dark:text-white shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
                <button
                  id="cert-modal-done-btn"
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black text-xs font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  Close Verification Window
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
