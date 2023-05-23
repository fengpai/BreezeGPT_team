import React from 'react';
import useStore from '@store/store';
import { useTranslation } from 'react-i18next';

const StopGeneratingButton = () => {
  const setGenerating = useStore((state) => state.setGenerating);
  const generating = useStore((state) => state.generating);
  const { t } = useTranslation();

  return generating ? (
      <button className='btn relative btn-neutral border-1 md:border' onClick={() => setGenerating(false)}>
        <div className='flex w-full items-center justify-center gap-2'>
          <svg
            stroke='currentColor'
            fill='none'
            strokeWidth='1.5'
            viewBox='0 0 24 24'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='h-3 w-3'
            height='1em'
            width='1em'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect x='3' y='3' width='18' height='18' rx='2' ry='2'></rect>
          </svg>
          {t('stopGenerating')}
        </div>
      </button>
  ) : (
    <></>
  );
};

export default StopGeneratingButton;
