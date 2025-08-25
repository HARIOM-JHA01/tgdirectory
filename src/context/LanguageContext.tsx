import { useState, useEffect, ReactNode } from "react";
import { LanguageContext, LanguageDict } from "./I18nContext";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // display name (used by UI)
  const [language, setLanguageState] = useState<string>(() => {
    return typeof window !== "undefined" ? (localStorage.getItem("language") || "English") : "English";
  });

  // l_key is the key used to fetch translations
  const [l_key, setLKeyState] = useState<string>(() => {
    return typeof window !== "undefined" ? (localStorage.getItem("l_key") || "EN") : "EN";
  });

  const [dict, setDict] = useState<LanguageDict>({});
  const [loading, setLoading] = useState(false);

  interface LanguageData {
    l_key: string;
    m_key: string;
    message: string;
  }

  const [allLanguageData, setAllLanguageData] = useState<LanguageData[]>([]);

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

  // Fetch all language data on mount
  useEffect(() => {
    setLoading(true);
    fetch("https://telegramdirectory.org/api/getAllLanguageDB")
      .then((res) => res.json())
      .then((data: LanguageData[]) => {
        setAllLanguageData(Array.isArray(data) ? data : []);
      })
      .catch(() => setAllLanguageData([]))
      .finally(() => setLoading(false));
  }, []);

  // Update dict when l_key or allLanguageData changes
  useEffect(() => {
    if (!allLanguageData.length) return;
    const filtered = allLanguageData.filter((item) => item.l_key === l_key);
    const dictObj: LanguageDict = {};
    filtered.forEach((item) => {
      dictObj[item.m_key] = item.message;
    });
    setDict(dictObj);
  }, [l_key, allLanguageData]);

  const t = (key: string) => dict[key] || key;

  return (
    <LanguageContext.Provider value={{ language, l_key, setLanguage, setLKey, dict, t, loading }}>
      {children}
    </LanguageContext.Provider>
  );
};
