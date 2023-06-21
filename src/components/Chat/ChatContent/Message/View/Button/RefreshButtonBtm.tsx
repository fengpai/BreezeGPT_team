import React from 'react';

import RefreshIcon from '@icon/RefreshIcon';

import BaseButton from './BaseButton';

const RefreshButtonBtm = ({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <>
        <div className='text-gray-400 flex self-end lg:self-center justify-center gap-3 md:gap-4  visible mb-3'>
            <button className='btn relative btn-neutral border-1 md:border'  onClick={onClick}>
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
                    <polyline points='1 4 1 10 7 10'></polyline>
                    <polyline points='23 20 23 14 17 14'></polyline>
                    <path d='M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15'></path>
                </svg>
                重新生成回答
                </div>
            </button>
        </div>
    </>
    );
};

export default RefreshButtonBtm;
