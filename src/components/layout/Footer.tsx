import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#12193b] text-white py-2 px-4 text-center text-sm">
      {t('POWERED')}
    </footer>
  );
};

export default Footer;