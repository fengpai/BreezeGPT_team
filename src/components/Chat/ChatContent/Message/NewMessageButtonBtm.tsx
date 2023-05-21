import React, {useState} from 'react';
import useStore from '@store/store';

import PlusIcon from '@icon/PlusIcon';

import { ChatInterface, Role } from '@type/chat';
import { generateDefaultChat } from '@constants/chat';

const NewMessageButtonBtm = React.memo(
  ({ 
    messageIndex,
  }: { 
    messageIndex: number;
  }) => {
    const setChats = useStore((state) => state.setChats);
    const currentChatIndex = useStore((state) => state.currentChatIndex);
    const setCurrentChatIndex = useStore((state) => state.setCurrentChatIndex);
    const newEditIndex = useStore((state) => state.newEditIndex);
    const setNewEditIndex = useStore((state) => state.setNewEditIndex);

    const addChat = () => {
      const chats = useStore.getState().chats;
      if (chats) {
        const updatedChats: ChatInterface[] = JSON.parse(JSON.stringify(chats));
        let titleIndex = 1;
        let title = `New Chat ${titleIndex}`;

        while (chats.some((chat) => chat.title === title)) {
          titleIndex += 1;
          title = `New Chat ${titleIndex}`;
        }

        updatedChats.unshift(generateDefaultChat(title));
        setChats(updatedChats);
        setCurrentChatIndex(0);
      }
    };

    const addMessage = () => {
      if (currentChatIndex === -1) {
        addChat();
      } else {
        const updatedChats: ChatInterface[] = JSON.parse(
          JSON.stringify(useStore.getState().chats)
        );
        const msgLength = updatedChats[currentChatIndex].messages.length
        let previousRole = updatedChats[currentChatIndex].messages[msgLength-1].role
        let curruntRole = 'user'
        if(previousRole === 'user'){
          curruntRole = 'assistant'
        }

        updatedChats[currentChatIndex].messages.splice(messageIndex + 1, 0, {
          content: '',
            role: curruntRole as Role
        });
        setNewEditIndex(messageIndex);
        setChats(updatedChats);
      }
    };

    return (
      <div className='h-0 w-0 relative'>
        <div
          className='absolute top-0 right-0 translate-x-1/2 translate-y-[-50%] text-gray-600 dark:text-white cursor-pointer bg-gray-200 dark:bg-gray-600/80 rounded-full p-1 text-sm hover:bg-gray-300 dark:hover:bg-gray-800/80 transition-bg duration-200'
          onClick={addMessage}
        >
          <PlusIcon />
        </div>
      </div>
    );
  }
);

export default NewMessageButtonBtm;
