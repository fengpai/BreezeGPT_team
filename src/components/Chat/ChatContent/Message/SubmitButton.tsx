import React, { useEffect, useState } from 'react';
import useStore from '@store/store';

import ContentView from './View/ContentView';
import SubmitArea from './View/SubmitArea';

const SubmitButton = ({
  role,
  content,
  messageIndex,
  sticky = false,
  initialIsEdit = false,
}: {
  role: string;
  content: string;
  messageIndex: number;
  sticky?: boolean;
  initialIsEdit?: boolean;
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(sticky || initialIsEdit);
  const advancedMode = useStore((state) => state.advancedMode);
  const hideSideMenu = useStore((state) => state.hideSideMenu);

  // useEffect(() => {
  //   setIsEdit(sticky || initialIsEdit);
  //   console.log('changing isEdit to: '+initialIsEdit)
  // }, [sticky, initialIsEdit]);
  
  // console.log('initial edit: '+initialIsEdit)
  // console.log('is edit:'+isEdit)

  return (
    <div
      className={`w-full border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group`}
    >
      <div
        className={`text-base gap-4 md:gap-6 m-auto p-4 md:py-6 flex transition-all ease-in-out ${
          hideSideMenu
            ? 'md:max-w-5xl lg:max-w-5xl xl:max-w-6xl'
            : 'md:max-w-3xl lg:max-w-3xl xl:max-w-4xl'
        }`}
      >
        <div className='w-[calc(100%-50px)] '>

          <div className='relative flex flex-col lg:w-[calc(100%)]'>
            {advancedMode && <div className='flex flex-grow flex-col gap-3'></div>}
            {isEdit ? (
              <SubmitArea
                content={content}
                setIsEdit={setIsEdit}
                messageIndex={messageIndex}
                sticky={sticky}
              />
            ) : (
              <ContentView
                role={role}
                content={content}
                setIsEdit={setIsEdit}
                messageIndex={messageIndex}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitButton;
