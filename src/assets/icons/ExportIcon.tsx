import React from 'react';
import { useTranslation } from 'react-i18next';

const ExportArrow = (props: React.SVGProps<SVGSVGElement>) => {
  const { t } = useTranslation();
  return (
    <svg className="h-6 w-6"  
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      strokeWidth="2" 
      stroke="currentColor" 
      fill="none" 
      strokeLinecap="round" 
      strokeLinejoin="round">  
      <title>{t('downloadChat')}</title>
      <path stroke="none" d="M0 0h24v24H0z"/>  
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />  
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  
      <line x1="12" y1="11" x2="12" y2="17" />  
      <polyline points="9 14 12 17 15 14" />
    </svg>
  );
};

export default ExportArrow;