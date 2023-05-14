import React, { createContext, useCallback, useEffect, useState } from "react";
import { EN, languages } from "../../constants/localization/languages";
import { LS_KEY, fetchLocale, getLanguageCodeFromLS } from "./helpers";

const initialState = {
  isFetching: true,
  currentLanguage: EN,
};

export const languageMap = new Map();
languageMap.set(EN.locale, {});

export const LanguageContext = createContext(undefined);

export const LanguageProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    const codeFromStorage = getLanguageCodeFromLS();

    return {
      ...initialState,
      currentLanguage: languages[codeFromStorage],
    };
  });
  const { currentLanguage } = state;

  useEffect(() => {
    const fetchInitialLocales = async () => {
      const codeFromStorage = getLanguageCodeFromLS();

      if (codeFromStorage !== EN.locale) {
        const enLocale = languageMap.get(EN.locale);
        const currentLocale = await fetchLocale(codeFromStorage);
        languageMap.set(codeFromStorage, { ...enLocale, ...currentLocale });
      }

      setState((prevState) => ({
        ...prevState,
        isFetching: false,
      }));
    };

    fetchInitialLocales();
  }, [setState]);

  const setLanguage = async (language) => {
    if (!languageMap.has(language.locale)) {
      setState((prevState) => ({
        ...prevState,
        isFetching: true,
      }));

      const locale = await fetchLocale(language.locale);
      const enLocale = languageMap.get(EN.locale);

      languageMap.set(language.locale, { ...enLocale, ...locale });
      localStorage.setItem(LS_KEY, language.locale);

      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        currentLanguage: language,
      }));
    } else {
      localStorage.setItem(LS_KEY, language.locale);
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        currentLanguage: language,
      }));
    }
  };

  const translate = useCallback(
    (key, data) => {
      const translationSet = languageMap.has(currentLanguage.locale)
        ? languageMap.get(currentLanguage.locale)
        : languageMap.get(EN.locale);
      const translatedText = translationSet[key] || key;

      const includesVariable = translatedText.match(/%\S+?%/gm);

      if (includesVariable && data) {
        let interpolatedText = translatedText;
        Object.keys(data).forEach((dataKey) => {
          const templateKey = new RegExp(`%${dataKey}%`, "g");
          interpolatedText = interpolatedText.replace(
            templateKey,
            data[dataKey].toString()
          );
        });

        return interpolatedText;
      }

      return translatedText;
    },
    [currentLanguage]
  );

  return (
    <LanguageContext.Provider value={{ ...state, setLanguage, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
};
