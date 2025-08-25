import { createContext } from "react";

// Type for the language dictionary
export type LanguageDict = Record<string, string>;

// Context props
export interface LanguageContextProps {
  language: string;
  l_key: string;
  setLanguage: (lang: string) => void;
  setLKey: (key: string) => void;
  dict: LanguageDict;
  t: (key: string) => string;
  loading: boolean;
}

export const LanguageContext = createContext<LanguageContextProps>({
  language: "English",
  l_key: "EN",
  setLanguage: () => {},
  setLKey: () => {},
  dict: {},
  t: (key) => key,
  loading: false,
});