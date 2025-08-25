import { useContext } from "react";
import { LanguageContext } from "./I18nContext";

export const useLanguage = () => useContext(LanguageContext);
