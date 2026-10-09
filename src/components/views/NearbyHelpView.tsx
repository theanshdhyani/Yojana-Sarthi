import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Clock, 
  Copy, 
  Check, 
  Search, 
  ExternalLink,
  ShieldCheck,
  Building
} from 'lucide-react';
import { HELP_CENTERS_DIRECTORY } from '../../data/helpCentersData';
import { INDIAN_STATES_DISTRICTS } from '../../data/statesAndDistricts';
import { CenterType } from '../../types/helpCenter';

export const NearbyHelpView: React.FC = () => {
  const { settings, addToast, t } = useApp();

  const [selectedState, setSelectedState] = useState<string>('Uttar Pradesh');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const currentStateObj = INDIAN_STATES_DISTRICTS.find((s) => s.state === selectedState);
  const districtList = currentStateObj ? currentStateObj.districts : [];

  const filteredCenters = HELP_CENTERS_DIRECTORY.filter((c) => {
    const matchesState = !selectedState || c.state === selectedState;
    const matchesDistrict = selectedDistrict === 'all' || c.district === selectedDistrict;
    const matchesType = selectedType === 'all' || c.type === selectedType;
    return matchesState && matchesDistrict && matchesType;
  });

  const handleCopyAddress = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addToast(t('addressCopied'), 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      
      {/* Editorial Header */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-700 dark:text-orange-400">
            {settings.language === 'hi' ? 'स्थानीय सहायता केंद्र' : 'Civic Assistance Directory'}
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
            {t('nearbyHelpTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            {t('nearbyHelpSubtitle')}
          </p>
        </div>

        {/* Filter Controls Bar with Apple Glassmorphism */}
        <div className="p-5 sm:p-6 rounded-3xl glass-toolbar grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs shadow-xs">
          <div>
            <label className="block font-semibold text-[var(--text-primary)] mb-1">
              {t('selectState')}
            </label>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedDistrict('all');
              }}
              className="w-full p-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-primary)]"
            >
              {INDIAN_STATES_DISTRICTS.map((s) => (
                <option key={s.state} value={s.state}>
                  {s.state} ({s.stateHindi})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-[var(--text-primary)] mb-1">
              {t('selectDistrict')}
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-primary)]"
            >
              <option value="all">{settings.language === 'hi' ? 'सभी जिले' : 'All Districts'}</option>
              {districtList.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name} ({d.nameHindi})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-[var(--text-primary)] mb-1">
              {t('filterCenterType')}
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-primary)]"
            >
              <option value="all">{settings.language === 'hi' ? 'सभी केंद्र प्रकार' : 'All Center Types'}</option>
              <option value="csc">Common Service Center (CSC / जन सेवा केंद्र)</option>
              <option value="bdo">Block Development Office (BDO / विकास खंड)</option>
              <option value="gram_panchayat">Gram Panchayat Kendra / सचिवालय</option>
              <option value="anganwadi">Anganwadi ICDS Hub / केंद्र</option>
              <option value="tehsil_office">Tehsildar / Revenue RTPS Office</option>
              <option value="lead_bank">Lead District Bank Center</option>
            </select>
          </div>
        </div>
      </div>

      {/* Centers Results List */}
      {filteredCenters.length > 0 ? (
        <div className="space-y-4">
          {filteredCenters.map((center) => (
            <div
              key={center.id}
              className="bobbin-surface-card p-6 sm:p-7 rounded-3xl space-y-4 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200">
                      {settings.language === 'hi' ? center.typeLabelHindi : center.typeLabel}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">
                      {center.district}, {center.state}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[var(--text-primary)]">
                    {settings.language === 'hi' ? center.nameHindi : center.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`tel:${center.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-saffron)] text-white text-xs font-semibold hover:bg-[var(--accent-saffron-hover)] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{t('callCenter')}</span>
                  </a>

                  <button
                    onClick={() => handleCopyAddress(center.id, `${center.name}, ${center.address}`)}
                    className="p-2 rounded-lg border border-[var(--border-hairline)] hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)] transition-colors"
                    title={t('copyAddress')}
                  >
                    {copiedId === center.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Address & Timings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[var(--text-secondary)] pt-2 border-t border-[var(--border-hairline)]">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    {settings.language === 'hi' ? center.addressHindi : center.address}
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">{center.operatingHours}</p>
                    {center.contactPerson && (
                      <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                        Officer / VLE: {center.contactPerson}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Services Offered Pills */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  {settings.language === 'hi' ? 'उपलब्ध नागरिक सेवाएं:' : 'Key Services Provided:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(settings.language === 'hi' ? center.servicesProvidedHindi : center.servicesProvided).map((srv, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-[var(--bg-subtle)] text-[11px] text-[var(--text-secondary)] border border-[var(--border-hairline)]"
                    >
                      {srv}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-3">
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            {settings.language === 'hi' ? 'इस जिले में कोई केंद्र सूचीबद्ध नहीं है' : 'No centers found matching this filter'}
          </p>
          <p className="text-xs text-[var(--text-secondary)]">
            {settings.language === 'hi' 
              ? 'कृपया राज्य या जिले का चयन बदलें या आधिकारिक सीएससी लोकेटर देखें।' 
              : 'Try selecting a different district or check the central digital seva portal.'}
          </p>
          <a
            href="https://locator.csccloud.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-saffron)] underline"
          >
            <span>Open National CSC Locator (locator.csccloud.in)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

    </div>
  );
};
