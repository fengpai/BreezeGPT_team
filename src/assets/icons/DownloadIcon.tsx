import React from 'react';
import { useTranslation } from 'react-i18next';

const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => {
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
      <polyline points="8 17 12 21 16 17" />  <line x1="12" y1="12" x2="12" y2="21" />  <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29" />
    </svg>
  );
};

export default DownloadIcon;