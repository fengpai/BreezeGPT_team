import React, { useEffect, useRef, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import useStore from '@store/store';

import ScrollToBottomButton from './ScrollToBottomButton';
import ChatTitle from './ChatTitle';
import NewMessageButton from './Message/NewMessageButton';
import NewMessageButtonBtm from './Message/NewMessageButtonBtm';

import CrossIcon from '@icon/CrossIcon';

import useSubmit from '@hooks/useSubmit';
import DownloadChat from './DownloadChat';
import CloneChat from './CloneChat';
import ShareGPT from '@components/ShareGPT';
import Message from './Message/Message';
import MessageChat from './Message/MessageChat';

const ChatContent = ({
  sticky,
}: {
  sticky?: boolean;
}) => {
  const inputRole = useStore((state) => state.inputRole);
  const setError = useStore((state) => state.setError);
  const messages = useStore((state) =>
    state.chats &&
    state.chats.length > 0 &&
    state.currentChatIndex >= 0 &&
    state.currentChatIndex < state.chats.length
      ? state.chats[state.currentChatIndex].messages
      : []
  );

  const stickyIndex = useStore((state) =>
    state.chats &&
    state.chats.length > 0 &&
    state.currentChatIndex >= 0 &&
    state.currentChatIndex < state.chats.length
      ? state.chats[state.currentChatIndex].messages.length
      : 0
  );
  const advancedMode = useStore((state) => state.advancedMode);
  const generating = useStore.getState().generating;
  const hideSideMenu = useStore((state) => state.hideSideMenu);
  const saveRef = useRef<HTMLDivElement>(null);
  const newEditIndex = useStore((state) => state.newEditIndex);
  const setNewEditIndex = useStore((state) => state.setNewEditIndex);
  //console.log("edit index:"+newEditIndex)
  // clear error at the start of generating new messages
  useEffect(() => {
    if (generating) {
      setError('');
    }
  }, [generating]);

  const { error } = useSubmit();
  return (
    <div className='flex-1 overflow-hidden'>
      <ScrollToBottom
        className='h-full dark:bg-gray-800'
        followButtonClassName='hidden'
      >
        <ScrollToBottomButton />
        <div className='flex flex-col items-center text-sm dark:bg-gray-800'>
          <div
            className='flex flex-col items-center text-sm dark:bg-gray-800 w-full mb-1000'
            ref={saveRef}
          >
            {<ChatTitle />}
            {!generating && advancedMode && messages?.length === 0 && (
              <NewMessageButton messageIndex={-1} />
            )}
            {messages?.map((message, index) => (
              <React.Fragment key={index}>
                <Message
                  role={message.role}
                  content={message.content}
                  messageIndex={index}
                  initialIsEdit={index === newEditIndex}
                />
                {/* {!generating && advancedMode && (messages?.length <= index+1) && <NewMessageButton messageIndex={index} />} */}
              </React.Fragment>
            ))}
            { advancedMode && messages?.length !== 0 &&(<NewMessageButtonBtm messageIndex={messages?.length}/>)}

            <div className="w-full h-96 md:h-96 flex-shrink-0"></div>
          </div>

          <div className='absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent bg-vert-dark-gradient dark:md:bg-vert-dark-gradient'>
          {advancedMode && (<Message
              role={inputRole}
              content=''
              messageIndex={stickyIndex}
              sticky
            />)}
          {advancedMode || (<MessageChat
              role={inputRole}
              content=''
              messageIndex={stickyIndex}
              sticky
            />)}
            {error !== '' && (
              <div className='relative py-2 px-3 w-3/5 mt-3 max-md:w-11/12 border rounded-md border-red-500 bg-red-500/10'>
                <div className='text-gray-600 dark:text-gray-100 text-sm whitespace-pre-wrap'>
                  {error}
                </div>
                <div
                  className='text-white absolute top-1 right-1 cursor-pointer'
                  onClick={() => {
                    setError('');
                  }}
                >
                  <CrossIcon />
                </div>
              </div>
            )}
            {/* <div className='w-full h-10'></div> */}
          </div>
          <div
              className={`mt-4 m-auto absolute bottom-0 right-0 mr-4 mb-4 ${
                hideSideMenu
                  ? 'md:max-w-5xl lg:max-w-5xl xl:max-w-6xl'
                  : 'md:max-w-3xl lg:max-w-3xl xl:max-w-4xl'
              }`}
            >
              {useStore.getState().generating || (
                <div className='md:w-[calc(100%)] gap-2 flex-wrap justify-center hidden md:flex'>
                  <DownloadChat saveRef={saveRef} />
                  <ShareGPT/>
                  <CloneChat />
                </div>
              )}
            </div>

        </div>
      </ScrollToBottom>

    </div>
  );
};

export default ChatContent;
