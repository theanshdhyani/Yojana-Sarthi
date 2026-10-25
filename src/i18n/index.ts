import { en, Messages, MessageKey } from './messages/en';
import { hi } from './messages/hi';
import { AppLanguage } from './languages';
import { Scheme, SchemeCategory } from '../types/scheme';

export type { MessageKey, Messages };
export { formatMessage, formatMsg, msg } from './format';
export type { Msg, MsgParam } from './format';
export * from './languages';

/** The essentials of each scheme and document, translated per language. Longer fields fall back to English. */
export interface SchemeText {
  name: string;
  benefitHeadline: string;
  simpleSummary: string;
  eligibility: string;
}
export interface DocText {
  name: string;
  shortDesc: string;
}
export interface LocaleContent {
  schemes: Record<string, SchemeText>;
  documents: Record<string, DocText>;
}
export interface LocaleBundle {
  messages: Messages;
  content: LocaleContent;
}

// English and Hindi ship in the main bundle (default + most common fallback); every other
// language is its own chunk, downloaded only when chosen and then cached for offline use.
const lazyLocales = import.meta.glob<{ default: LocaleBundle }>('./locales/*.ts');

export const BUILTIN_MESSAGES: Partial<Record<AppLanguage, Messages>> = { en, hi };

export async function loadLocale(code: AppLanguage): Promise<LocaleBundle | null> {
  const loader = lazyLocales[`./locales/${code}.ts`];
  if (!loader) return null;
  return (await loader()).default;
}

export const hasLocaleFile = (code: AppLanguage) => `./locales/${code}.ts` in lazyLocales;

const CATEGORY_KEYS: Record<SchemeCategory, MessageKey> = {
  agriculture: 'agricultureFarming',
  health: 'healthMedical',
  housing: 'housingShelter',
  women_children: 'womenChildren',
  education: 'educationLearning',
  livelihood_business: 'livelihoodMsme',
  social_security: 'socialSecurity',
  clean_energy: 'cleanEnergy'
};

/**
 * Picks the right text for a piece of content in the current language:
 * English and Hindi come from the data files, other languages from their locale bundle,
 * and anything not yet translated falls back to English (`isFallback` reports when that happens).
 */
export function makeLocalizer(lang: AppLanguage, messages: Messages, content: LocaleContent | null) {
  const native = lang === 'en' || lang === 'hi';
  const pick = (enText: string, hiText: string) => (lang === 'hi' ? hiText : enText);

  const schemeText = (s: Scheme): SchemeText | undefined => (native ? undefined : content?.schemes[s.id]);
  const docText = (id: string): DocText | undefined => (native ? undefined : content?.documents[id]);

  return {
    /** True when long-form text (steps, rejection tips, ministry names) is shown in English. */
    isFallback: !native,
    category: (c: SchemeCategory) => messages[CATEGORY_KEYS[c]] || en[CATEGORY_KEYS[c]],
    schemeName: (s: Scheme) => schemeText(s)?.name ?? pick(s.name, s.nameHindi),
    schemeBenefit: (s: Scheme) => schemeText(s)?.benefitHeadline ?? pick(s.benefitHeadline, s.benefitHeadlineHindi),
    schemeSimple: (s: Scheme) => schemeText(s)?.simpleSummary ?? pick(s.simpleLanguageSummary, s.simpleLanguageSummaryHindi),
    /** The regular summary; translated languages use their plain-language summary instead of English. */
    schemeSummary: (s: Scheme) => schemeText(s)?.simpleSummary ?? pick(s.summary, s.summaryHindi),
    schemeEligibility: (s: Scheme) => schemeText(s)?.eligibility ?? pick(s.eligibilityDescription, s.eligibilityDescriptionHindi),
    docName: (id: string, enText: string, hiText: string) => docText(id)?.name ?? pick(enText, hiText),
    docShortDesc: (id: string, enText: string, hiText: string) => docText(id)?.shortDesc ?? pick(enText, hiText),
    /** Long-form fields available only in English and Hindi. */
    long: (enText: string, hiText: string) => pick(enText, hiText),
    longList: (enList: string[], hiList: string[]) => (lang === 'hi' ? hiList : enList),
    /** State names: Hindi shows both scripts; other languages keep the English name everyone recognises. */
    state: (name: string, nameHindi: string) => (lang === 'hi' ? `${name} (${nameHindi})` : name)
  };
}

export type Localizer = ReturnType<typeof makeLocalizer>;
