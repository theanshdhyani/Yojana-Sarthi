import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, PhoneCall, AlertTriangle, ExternalLink } from 'lucide-react';

export const AppFooter: React.FC = () => {
  const { setCurrentView, settings, t } = useApp();

  return (
    <footer className="mt-20 border-t border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] text-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        {/* Anti-Scam Guidance Strip */}
        <div className="mb-12 p-5 sm:p-6 rounded-2xl border border-[var(--warning-border)] bg-[var(--warning-bg)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-xl bg-amber-100/90 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-300/60 dark:border-amber-900/40 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <p className="font-bold text-[var(--warning-text)] text-sm sm:text-base">
                {settings.language === 'hi' 
                  ? 'सरकारी योजनाओं के लिए किसी भी बिचौलिये या एजेंट को पैसे न दें।' 
                  : 'Never pay unofficial agents or middlemen for government welfare benefits.'}
              </p>
              <p className="text-xs sm:text-sm text-[var(--warning-desc)] leading-relaxed">
                {settings.language === 'hi'
                  ? 'सभी आधिकारिक योजना पोर्टल .gov.in या .nic.in पर समाप्त होते हैं। साइबर धोखाधड़ी होने पर तुरंत 1930 डायल करें।'
                  : 'Official government portals always end with .gov.in or .nic.in. Report extortion or cyber frauds immediately at 1930.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="tel:1930"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[var(--accent-saffron)] hover:bg-[var(--accent-saffron-hover)] text-white text-xs font-semibold transition-colors shadow-2xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{settings.language === 'hi' ? 'साइबर हेल्पलाइन 1930' : 'Cyber Helpline: 1930'}</span>
            </a>
          </div>
        </div>

        {/* Primary Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-serif font-bold text-[var(--text-primary)]">
                Yojana Sarthi
              </span>
              <span className="text-xs font-sans font-semibold text-[var(--accent-saffron)]">
                योजना सारथी
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
              {settings.language === 'hi'
                ? 'भारतीय नागरिकों के लिए एक स्वतंत्र, पारदर्शी और गरिमापूर्ण डिजिटल लोक सेवा मार्गदर्शक।'
                : 'A calm, independent civic guide helping citizens understand, prepare and access welfare entitlements.'}
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--accent-green-text)] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[var(--accent-green)]" />
              <span>{t('trustPrivate')}</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-3">
              {settings.language === 'hi' ? 'मुख्य साधन' : 'Tools & Services'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentView('questionnaire')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  {t('navFindSchemes')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('all_schemes')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  {t('navAllSchemes')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('document_checker')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  {t('navDocumentChecker')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('tracker')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  {t('navTracker')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('family_mode')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  {t('navFamilyMode')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('nearby_help')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  {t('navNearbyHelp')}
                </button>
              </li>
            </ul>
          </div>

          {/* Official Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-3">
              {settings.language === 'hi' ? 'राष्ट्रीय पोर्टल' : 'Official Portals'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://www.india.gov.in" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1">
                  <span>National Portal of India</span>
                  <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
                </a>
              </li>
              <li>
                <a href="https://pmkisan.gov.in" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1">
                  <span>PM-KISAN Portal</span>
                  <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
                </a>
              </li>
              <li>
                <a href="https://beneficiary.nha.gov.in" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1">
                  <span>Ayushman PM-JAY</span>
                  <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
                </a>
              </li>
              <li>
                <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1">
                  <span>Cyber Crime Reporting (1930)</span>
                  <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Privacy & Legal notice */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-3">
              {settings.language === 'hi' ? 'नागरिक सुरक्षा' : 'Citizen Safety'}
            </h4>
            <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
              {settings.language === 'hi'
                ? 'योजना सारथी किसी भी प्रकार का व्यक्तिगत डेटा अपने सर्वर पर स्टोर नहीं करता। सभी गणनाएं सीधे आपके वेब ब्राउज़र में स्थानीय रूप से निष्पादित होती हैं।'
                : 'Yojana Sarthi does not store sensitive citizen data on external servers. All eligibility rules run locally in your browser.'}
            </p>
            <div className="mt-3 pt-3 border-t border-[var(--border-hairline)] text-xs text-[var(--text-muted)]">
              <span>National Civic-Tech Initiative</span>
              <span className="mx-1.5">·</span>
              <span>2026</span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};
