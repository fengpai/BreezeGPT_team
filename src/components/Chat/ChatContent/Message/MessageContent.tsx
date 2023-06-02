import React, { useEffect, useState } from 'react';
import useStore from '@store/store';

import ContentView from './View/ContentView';
import EditView from './View/EditView';

const MessageContent = ({
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

  // useEffect(() => {
  //   setIsEdit(sticky || initialIsEdit);
  //   console.log('changing isEdit to: '+initialIsEdit)
  // }, [sticky, initialIsEdit]);
  
  // console.log('initial edit: '+initialIsEdit)
  // console.log('is edit:'+isEdit)

  return (
    <div className='relative flex flex-col lg:w-[calc(100%)]'>
      {advancedMode && <div className='flex flex-grow flex-col gap-3'></div>}
      {isEdit ? (
        <EditView
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
  );
};

export default MessageContent;
