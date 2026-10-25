export interface LanguageInfo {
  code: string;
  /** Name in its own script, shown in the picker so people can find their language without reading English. */
  native: string;
  english: string;
  /** BCP 47 tag used for text-to-speech voices. */
  speech: string;
  /** Google Fonts family for the script, loaded only when the language is chosen. */
  font?: string;
  /** Reviewed by a fluent speaker. Unreviewed languages show a note asking users to double-check. */
  reviewed: boolean;
}

// Ordered by number of speakers in India (Census 2011), English first as the link language.
export const LANGUAGES = [
  { code: 'en', native: 'English', english: 'English', speech: 'en-IN', reviewed: true },
  { code: 'hi', native: 'हिन्दी', english: 'Hindi', speech: 'hi-IN', font: 'Noto Sans Devanagari', reviewed: true },
  { code: 'bn', native: 'বাংলা', english: 'Bengali', speech: 'bn-IN', font: 'Noto Sans Bengali', reviewed: false },
  { code: 'mr', native: 'मराठी', english: 'Marathi', speech: 'mr-IN', font: 'Noto Sans Devanagari', reviewed: false },
  { code: 'te', native: 'తెలుగు', english: 'Telugu', speech: 'te-IN', font: 'Noto Sans Telugu', reviewed: false },
  { code: 'ta', native: 'தமிழ்', english: 'Tamil', speech: 'ta-IN', font: 'Noto Sans Tamil', reviewed: false },
  { code: 'gu', native: 'ગુજરાતી', english: 'Gujarati', speech: 'gu-IN', font: 'Noto Sans Gujarati', reviewed: false },
  { code: 'kn', native: 'ಕನ್ನಡ', english: 'Kannada', speech: 'kn-IN', font: 'Noto Sans Kannada', reviewed: false },
  { code: 'or', native: 'ଓଡ଼ିଆ', english: 'Odia', speech: 'or-IN', font: 'Noto Sans Oriya', reviewed: false },
  { code: 'ml', native: 'മലയാളം', english: 'Malayalam', speech: 'ml-IN', font: 'Noto Sans Malayalam', reviewed: false },
  { code: 'pa', native: 'ਪੰਜਾਬੀ', english: 'Punjabi', speech: 'pa-IN', font: 'Noto Sans Gurmukhi', reviewed: false }
] as const satisfies readonly LanguageInfo[];

export type AppLanguage = (typeof LANGUAGES)[number]['code'];

export const LANGUAGE_CODES = LANGUAGES.map((l) => l.code) as readonly AppLanguage[];

export const languageInfo = (code: AppLanguage): LanguageInfo =>
  LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];

export const isAppLanguage = (v: unknown): v is AppLanguage =>
  typeof v === 'string' && (LANGUAGE_CODES as readonly string[]).includes(v);

/** First language from the browser's preferences that we support, else English. */
export function detectLanguage(preferred: readonly string[] = typeof navigator !== 'undefined' ? navigator.languages ?? [] : []): AppLanguage {
  for (const tag of preferred) {
    const primary = tag.toLowerCase().split('-')[0];
    if (isAppLanguage(primary)) return primary;
  }
  return 'en';
}

const loadedFonts = new Set<string>();

/** Loads the script's web font on demand; phones and Windows already ship Indic fonts, this just evens out the look. */
export function ensureScriptFont(code: AppLanguage): void {
  const family = languageInfo(code).font;
  if (typeof document === 'undefined') return;
  document.documentElement.style.setProperty('--font-script', family ? `'${family}'` : `'Noto Sans Devanagari'`);
  if (!family || loadedFonts.has(family)) return;
  loadedFonts.add(family);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:wght@400;500;600;700&display=swap`;
  document.head.appendChild(link);
}
