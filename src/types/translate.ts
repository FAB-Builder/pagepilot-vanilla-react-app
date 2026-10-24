export interface SiteLanguage {
  code: string;
  label: string;
  native: string;
  flag: string;
}

interface TranslateElementOptions {
  pageLanguage: string;
  includedLanguages: string;
  autoDisplay: boolean;
}

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (options: TranslateElementOptions, elementId: string) => unknown;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}
