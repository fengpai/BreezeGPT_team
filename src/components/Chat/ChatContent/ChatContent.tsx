import React, { useEffect, useRef, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import useStore from '@store/store';
import { useTranslation } from 'react-i18next';

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
import SubmitButton from './Message/SubmitButton';

import { Dial } from "flowbite";
import type { DialOptions, DialInterface } from "flowbite";

const ChatContent = ({
  sticky,
}: {
  sticky?: boolean;
}) => {
  const { t } = useTranslation();
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
  const inputFunction = useStore((state) => state.inputFunction);
  const hideSideMenu = useStore((state) => state.hideSideMenu);
  const saveRef = useRef<HTMLDivElement>(null);
  const newEditIndex = useStore((state) => state.newEditIndex);
  const setNewEditIndex = useStore((state) => state.setNewEditIndex);
  const _functionContent = useStore((state) => state.functionContent);
  const updateFunction = useStore((state) => state.updateFunction);

  //console.log("edit index:"+newEditIndex)
  // clear error at the start of generating new messages
  useEffect(() => {
    if (generating) {
      setError('');
    }
  }, [generating]);

  const { error } = useSubmit();

  // Create ref objects for each required DOM element
  const parentElRef = useRef(null);
  const triggerElRef = useRef(null);
  const targetElRef = useRef(null);

  // Add dialOpen state
  const [dialOpen, setDialOpen] = useState(false);

  useEffect(() => {
    // Ensure that all elements are present before initializing the Dial
    if (parentElRef.current && triggerElRef.current && targetElRef.current) {
      // Define options
      const options: DialOptions = {
        triggerType: 'hover',
        onHide: () => {
          setDialOpen(false);
        },
        onShow: () => {
          setDialOpen(true);
        },
        onToggle: () => {
          console.log('speed dial is toggled')
        }
      };

      // Initialize the Dial
      const dial: DialInterface = new Dial(parentElRef.current, triggerElRef.current, targetElRef.current, options);

      // Show the dial
      //dial.show();
    }
  }, [generating]);

  return (
    <div className='flex-1 overflow-hidden'>
      <ScrollToBottom
        className='h-full dark:bg-gray-800'
        followButtonClassName='hidden'
      >
        {!dialOpen && <ScrollToBottomButton />}
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
            {!generating && advancedMode && messages?.length !== 0 &&(<NewMessageButtonBtm messageIndex={messages?.length}/>)}
            {inputFunction && advancedMode && (
            <div className="w-full border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group">
              <div className='text-base gap-4 md:gap-6 m-auto p-4 md:py-6 flex transition-all ease-in-out md:max-w-3xl lg:max-w-3xl xl:max-w-4xl'>
                <textarea
                  rows={10}
                  className='m-0 p-3 w-full resize-none focus:ring-0  focus:border-gray-400 focus:outline-none focus-visible:ring-0 dark:bg-transparent border-b border-black/20 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group'
                  style={{ maxHeight: '500px', height: '500px', overflowY: 'hidden' }}
                  onChange={(e) => {
                    updateFunction(e.target.value);
                  }}
                  placeholder = {t('fnCallPlaceholder') as string}
                  value={_functionContent}
                ></textarea>
              </div>
            </div>)}


            <div className="w-full h-60 md:h-60 flex-shrink-0"></div>
          </div>

          <div className='absolute bottom-0 border-0 left-0 w-full md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent bg-vert-dark-gradient dark:md:bg-vert-dark-gradient'>
          {/* {advancedMode && (<Message
              role={inputRole}
              content=''
              messageIndex={stickyIndex}
              sticky
            />)} */}
          {advancedMode && (<SubmitButton
            role={inputRole}
            content=""
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
                // <div className='md:w-[calc(100%)] gap-2 flex-wrap justify-center hidden md:flex'>
                //   <DownloadChat saveRef={saveRef} />
                //   <ShareGPT/>
                //   <CloneChat />
                // </div>

                <div id="dialParent" ref={parentElRef} data-dial-init className="fixed right-4 bottom-6 group hidden md:block">
                    <div id="dialContent" ref={targetElRef} className="flex-col justify-end hidden py-1 mb-4 space-y-2 bg-white border border-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                        <ul className="text-sm text-black dark:text-gray-300">
                            <li>
                              <a href="#" className="block hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                <DownloadChat saveRef={saveRef} />
                              </a>
                            </li>
                            <li>
                              <a href="#" className="block hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                <ShareGPT/>
                              </a>
                            </li>
                            <li>
                              <a href="#" className="block hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                <CloneChat />
                              </a>
                            </li>
                        </ul>
                    </div>
                    <button id="dialButton" ref={triggerElRef} type="button" data-dial-toggle="speed-dial-menu-dropdown-square" aria-controls="speed-dial-menu-dropdown-square" aria-expanded="false" className="flex items-center justify-center ml-auto w-12 h-12 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:hover:bg-gray-700 dark:focus:ring-gray-600 dark:bg-gray-800">
                        <svg aria-hidden="true" className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                        <span className="sr-only">Open actions menu</span>
                    </button>
                </div>

              )}
            </div>

        </div>
      </ScrollToBottom>

    </div>
  );
};

export default ChatContent;
