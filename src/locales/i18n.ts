import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./lang/en.json";
import esTranslations from "./lang/es.json";
import itTranslations from "./lang/it.json";
import jaTranslations from "./lang/ja.json";

const resources = {
  it: {
    translation: itTranslations,
  },
  en: {
    translation: enTranslations,
  },
  es: {
    translation: esTranslations,
  },
  ja: {
    translation: jaTranslations,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "it",
  fallbackLng: "it",
  supportedLngs: ["it", "en", "es", "ja"],
  defaultNS: "translation",
  ns: ["translation"],
  //   detection: {
  //     order: ["localStorage", "navigator"],
  //     caches: ["localStorage"],
  //   },
  // React already escapes values to prevent XSS
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
