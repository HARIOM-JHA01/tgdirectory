import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Type for the language dictionary
export type LanguageDict = Record<string, string>;

// Context props
interface LanguageContextProps {
  language: string;
  l_key: string;
  setLanguage: (lang: string) => void;
  setLKey: (key: string) => void;
  dict: LanguageDict;
  t: (key: string) => string;
  loading: boolean;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: "English",
  l_key: "HK",
  setLanguage: () => { },
  setLKey: () => { },
  dict: {},
  t: (key) => key,
  loading: false,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // display name (used by UI)
  const [language, setLanguageState] = useState<string>(() => {
    return typeof window !== "undefined" ? (localStorage.getItem("language") || "HK") : "HK";
  });

  // l_key is the key used to fetch translations
  const [l_key, setLKeyState] = useState<string>(() => {
    return typeof window !== "undefined" ? (localStorage.getItem("l_key") || "HK") : "HK";
  });

  const [dict, setDict] = useState<LanguageDict>({});
  const [loading, setLoading] = useState(false);

  // update persisted display name
  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("language", lang);
    } catch {
      /* ignore */
    }
  };

  // update persisted l_key
  const setLKey = (key: string) => {
    setLKeyState(key);
    try {
      localStorage.setItem("l_key", key);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    setLoading(true);
    // Use l_key for fetching language content
    fetch(`/api/${l_key}/getDBLanguage`)
      .then((res) => res.json())
      .then((data) => setDict(data.language || {}))
      .catch(() => setDict({}))
      .finally(() => setLoading(false));
  }, [l_key]);

  const t = (key: string) => dict[key] || key;

  return (
    <LanguageContext.Provider value={{ language, l_key, setLanguage, setLKey, dict, t, loading }}>
      {children}
    </LanguageContext.Provider>
  );
};
