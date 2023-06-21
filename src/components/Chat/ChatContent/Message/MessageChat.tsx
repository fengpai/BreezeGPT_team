import React, { useState } from 'react';
import useStore from '@store/store';

import Avatar from './Avatar';
import MessageContent from './MessageContent';

import { Role } from '@type/chat';
import RoleSelector from './RoleSelector';

import NewMessageButton from './NewMessageButton';
import EditView from './View/EditView';

// const backgroundStyle: { [role in Role]: string } = {
//   user: 'dark:bg-gray-800',
//   assistant: 'bg-gray-50 dark:bg-gray-650',
//   system: 'bg-gray-50 dark:bg-gray-650',
// };
const backgroundStyle = ['dark:bg-gray-800', 'bg-gray-50 dark:bg-gray-650'];

const MessageChat = React.memo(
  ({
    role,
    content,
    messageIndex,
    sticky = false,
    initialIsEdit = false,
  }: {
    role: Role;
    content: string;
    messageIndex: number;
    sticky?: boolean;
    initialIsEdit?: boolean;
  }) => {
    const hideSideMenu = useStore((state) => state.hideSideMenu);
    const advancedMode = useStore((state) => state.advancedMode);
    const [isEdit, setIsEdit] = useState<boolean>(sticky);
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
          {/* <Avatar role={role} messageIndex={messageIndex} sticky={sticky}/> */}
          <div className='w-[calc(100%)] '>
            {/* {advancedMode &&
              <RoleSelector
                role={role}
                messageIndex={messageIndex}
                sticky={sticky}
              />} */}
            <EditView
              content={content}
              setIsEdit={setIsEdit}
              messageIndex={messageIndex}
              sticky={sticky}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default MessageChat;
