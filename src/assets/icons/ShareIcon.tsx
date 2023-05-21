import React from 'react';
import { useTranslation } from 'react-i18next';

const ShareIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const { t } = useTranslation();
  return (
    <svg className="h-5 w-5"  
      viewBox="0 0 24 24"  
      fill="none"  
      stroke="currentColor"  
      strokeWidth="2"  
      strokeLinecap="round"  
      strokeLinejoin="round">  
      <title>{t('postOnShareGPT.title')}</title>
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />  
      <polyline points="16 6 12 2 8 6" />  
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
};

export default ShareIcon;