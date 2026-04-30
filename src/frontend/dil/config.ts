import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import az from "./dilleri/az.json";
import en from "./dilleri/en.json";
import ru from "./dilleri/ru.json";

// Çoxdilli dəstək (AZ standartdır, EN və RU də mövcuddur).
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      az: { translation: az },
      en: { translation: en },
      ru: { translation: ru },
    },
    fallbackLng: "az",
    supportedLngs: ["az", "en", "ru"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "kendim-dil",
    },
  });

export default i18n;
