import { EN } from "../../constants/localization/languages";

export const LS_KEY = "pancakeswap_language";

export const fetchLocale = async (locale) => {
  return {};
};

export const getLanguageCodeFromLS = () => {
  try {
    const codeFromStorage = localStorage.getItem(LS_KEY);

    return codeFromStorage || EN.locale;
  } catch {
    return EN.locale;
  }
};
