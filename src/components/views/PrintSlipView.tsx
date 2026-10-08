import React from 'react';
import { useApp } from '../../context/AppContext';
import { Printer, ArrowLeft, ShieldCheck, CheckSquare, Square, Download } from 'lucide-react';
import { MASTER_DOCUMENTS } from '../../data/documentsData';

export const PrintSlipView: React.FC = () => {
  const { 
    evaluatedResults, 
    answers, 
    readyDocumentIds, 
    setCurrentView, 
    settings, 
    t 
  } = useApp();

  const handlePrint = () => {
    window.print();
  };

  const allEligible = [...evaluatedResults.strongMatches, ...evaluatedResults.possibleMatches];
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  const slipId = `YS-SLIP-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      
      {/* On-screen control bar (Hidden on print) */}
      <div className="flex items-center justify-between no-print border-b border-[var(--border-hairline)] pb-4">
        <button
          onClick={() => setCurrentView('results')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{settings.language === 'hi' ? 'परिणामों पर वापस' : 'Back to Results'}</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent-saffron)] hover:bg-[var(--accent-saffron-hover)] text-white text-xs font-semibold transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>{t('printNow')}</span>
          </button>
        </div>
      </div>

      {/* PRINT SLIP CONTAINER - Designed specifically for crisp physical black & white paper output */}
      <div className="bg-white text-black p-8 sm:p-12 rounded-xl border border-slate-300 shadow-sm space-y-6 text-sm font-sans">
        
        {/* Slip Header */}
        <div className="border-b-2 border-black pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-serif font-bold tracking-tight">
                YOJANA SARTHI
              </span>
              <span className="text-sm font-sans font-semibold text-slate-800">
                योजना सारथी
              </span>
            </div>
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-600 mt-0.5">
              Citizen Welfare Eligibility & Document Advisory Slip
            </p>
            <p className="text-[11px] text-slate-500">
              नागरिक पात्रता एवं आवश्यक दस्तावेज़ परामर्श पर्ची (जन सेवा केंद्र / पंचायत संदर्भ)
            </p>
          </div>

          <div className="text-right text-xs space-y-0.5">
            <div><strong>Slip ID:</strong> <span className="font-mono">{slipId}</span></div>
            <div><strong>Date:</strong> <span className="tabular-nums">{dateStr}</span></div>
            <div><strong>Validation:</strong> Free Advisory (No Fee)</div>
          </div>
        </div>

        {/* Section 1: Citizen Profile Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider bg-slate-100 p-1.5 border-l-4 border-black">
            1. Citizen Profile Summary (नागरिक प्रोफ़ाइल विवरण)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs p-2">
            <div><strong>Age:</strong> {answers.age ?? 'Not specified'} years</div>
            <div><strong>Gender:</strong> {answers.gender ?? 'All'}</div>
            <div><strong>State:</strong> {answers.state ?? 'All-India'}</div>
            <div><strong>Area:</strong> {answers.residenceArea ?? 'Both'}</div>
            <div><strong>Occupation:</strong> {answers.occupation?.replace(/_/g, ' ') ?? 'General'}</div>
            <div><strong>Category:</strong> {answers.socialCategory ?? 'General'}</div>
            <div><strong>Income Bracket:</strong> {answers.annualIncomeBracket?.replace(/_/g, ' ') ?? 'Standard'}</div>
            <div><strong>Ration Card:</strong> {answers.hasRationCard ?? 'Standard'}</div>
          </div>
        </div>

        {/* Section 2: Recommended Schemes Table */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider bg-slate-100 p-1.5 border-l-4 border-black">
            2. Matched Government Schemes (पात्र सरकारी योजनाएं)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300">
                  <th className="p-2 border-r border-slate-300">Scheme Name & Ministry</th>
                  <th className="p-2 border-r border-slate-300">Entitlement / Benefit</th>
                  <th className="p-2 border-r border-slate-300">Official Portal</th>
                  <th className="p-2">Helpline</th>
                </tr>
              </thead>
              <tbody>
                {allEligible.map((item, idx) => (
                  <tr key={item.scheme.id} className="border-b border-slate-200">
                    <td className="p-2 border-r border-slate-200">
                      <strong>{item.scheme.name}</strong>
                      <div className="text-[10px] text-slate-600">{item.scheme.nameHindi}</div>
                    </td>
                    <td className="p-2 border-r border-slate-200 font-medium text-slate-800">
                      {item.scheme.benefitHeadline}
                    </td>
                    <td className="p-2 border-r border-slate-200 font-mono text-[11px]">
                      {item.scheme.officialPortalUrl.replace('https://', '')}
                    </td>
                    <td className="p-2 font-mono text-[11px]">
                      {item.scheme.helplinePhone.split('/')[0]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Document Readiness Checklist */}
        <div className="space-y-2 print-break-inside-avoid">
          <h3 className="text-xs font-bold uppercase tracking-wider bg-slate-100 p-1.5 border-l-4 border-black">
            3. Required Documents Readiness Checklist (दस्तावेज़ तैयारी सूची)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs p-1">
            {MASTER_DOCUMENTS.map((doc) => {
              const isReady = readyDocumentIds.includes(doc.id);
              return (
                <div key={doc.id} className="flex items-start gap-2 p-1.5 border border-slate-200 rounded">
                  <span className="font-mono text-sm">{isReady ? '[✓]' : '[  ]'}</span>
                  <div>
                    <div className="font-semibold">{doc.name}</div>
                    <div className="text-[10px] text-slate-600">
                      Office: {doc.issuingAuthority} · Fee: {doc.cost}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: Citizen Safety & Anti-Fraud Notice */}
        <div className="border border-black p-3 rounded space-y-1 text-xs print-break-inside-avoid">
          <div className="font-bold uppercase tracking-wide flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Anti-Fraud & Citizen Safety Advisory (धोखाधड़ी से सुरक्षा सूचना)</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-700">
            • All official schemes are applied either directly through certified portals ending in <strong>.gov.in / .nic.in</strong> or at recognized <strong>Common Service Centers (CSC) / Panchayat Secretariats</strong>.
            <br />
            • Never hand over money, blank cheques, or Aadhaar OTPs to private middlemen.
            <br />
            • In case of fraudulent demands or cyber scams, report directly to the National Cybercrime Portal at <strong>cybercrime.gov.in</strong> or call toll-free helpline <strong>1930</strong>.
          </p>
        </div>

        {/* Footer verification note */}
        <div className="text-[10px] text-slate-500 pt-3 border-t border-slate-300 flex justify-between items-center">
          <span>Generated via Yojana Sarthi Digital Civic Platform · Private by Design</span>
          <span>Sign / Stamp: _______________________</span>
        </div>

      </div>

    </div>
  );
};
