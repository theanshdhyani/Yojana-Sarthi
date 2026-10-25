import type { AppLanguage } from '../i18n/languages';

export type { AppLanguage };

export type AppFontSize = 'normal' | 'large' | 'extra-large';

export interface UserPreferences {
  language: AppLanguage;
  simpleLanguageMode: boolean; // "सरल भाषा मोड"
  fontSize: AppFontSize;
  highContrast: boolean;
  reducedMotion: boolean;
  theme: 'light' | 'dark';
  voiceSpeed: number; // 0.8 to 1.2
}
