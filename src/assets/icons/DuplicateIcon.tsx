import React from 'react';
import { useTranslation } from 'react-i18next';

const DupArrow = (props: React.SVGProps<SVGSVGElement>) => {
  const { t } = useTranslation();
  return (
  <svg className="h-6 w-6"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <title>{t('cloneChat')}</title>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
  </svg>
  );
};

export default DupArrow;