import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en.json";
import translationSV from "./locales/sv.json";

const resources = {
  en: {
    translation: translationEN,
  },
  sv: {
    translation: translationSV,
  },
};

const savedLanguage = localStorage.getItem("language");

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage || "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;