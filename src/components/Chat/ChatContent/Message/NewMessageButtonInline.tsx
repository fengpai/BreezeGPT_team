import React from 'react';
import useStore from '@store/store';

import PlusIcon from '@icon/PlusIcon';

import { ChatInterface } from '@type/chat';
import { generateDefaultChat } from '@constants/chat';
import BaseButton from './View/Button/BaseButton';

const NewMessageButtonInline = React.memo(
  ({ messageIndex }: { messageIndex: number }) => {
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
        updatedChats[currentChatIndex].messages.splice(messageIndex + 1, 0, {
          content: '',
          role: 'user',
        });
        setNewEditIndex(messageIndex+1);
        setChats(updatedChats);
      }
    };

    return (
      <>
        <BaseButton icon={<PlusIcon />} onClick={addMessage} />
      </>
    );
  }
);

export default NewMessageButtonInline;
