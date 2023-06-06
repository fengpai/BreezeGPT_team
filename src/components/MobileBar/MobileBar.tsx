import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useStore from '@store/store';
import PlusIcon from '@icon/PlusIcon';
import MenuIcon from '@icon/MenuIcon';
import useAddChat from '@hooks/useAddChat';
import { shallow } from 'zustand/shallow';
import ConfigMenu from '@components/ConfigMenu';
import { ChatInterface, ConfigInterface } from '@type/chat';

import DownloadChat from '@components/Chat/ChatContent/DownloadChat';

import CloneChat from '@components/Chat/ChatContent/CloneChat';
import ShareGPT from '@components/ShareGPT';
import NewChat from '@components/Menu/NewChat';

import { Dropdown } from 'flowbite';

import type { DropdownOptions, DropdownInterface } from "flowbite";
import { _defaultChatConfig, modelName } from '@constants/chat';

const MobileBar = () => {
  const { t } = useTranslation('model');
  const model = useStore((state) =>
    state.chats
      ? state.chats[state.currentChatIndex].config.model
      : 'gpt-3.5-turbo'
  );
  const config = useStore(
    (state) =>
      state.chats &&
      state.chats.length > 0 &&
      state.currentChatIndex >= 0 &&
      state.currentChatIndex < state.chats.length
        ? state.chats[state.currentChatIndex].config
        : undefined,
    shallow
  );
  const setChats = useStore((state) => state.setChats);
  const currentChatIndex = useStore((state) => state.currentChatIndex);
  const setConfig = (config: ConfigInterface) => {
    const updatedChats: ChatInterface[] = JSON.parse(
      JSON.stringify(useStore.getState().chats)
    );
    updatedChats[currentChatIndex].config = config;
    setChats(updatedChats);
  };

  const generating = useStore((state) => state.generating);
  const setHideSideMenu = useStore((state) => state.setHideSideMenu);
  const chatTitle = useStore((state) =>
    state.chats &&
    state.chats.length > 0 &&
    state.currentChatIndex >= 0 &&
    state.currentChatIndex < state.chats.length
      ? state.chats[state.currentChatIndex].title
      : 'New Chat'
  );

  const advancedMode = useStore((state) => state.advancedMode);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const addChat = useAddChat();
  const saveRef = useRef<HTMLDivElement>(null);

  // use ref to get the DOM elements
  const targetElRef = useRef<HTMLElement | null>(null);
  const triggerElRef = useRef<HTMLElement | null>(null);

  // use ref to store the dropdown instance
  const dropdownRef = useRef<DropdownInterface | null>(null);

  useEffect(() => {
    if (!targetElRef.current || !triggerElRef.current) {
      console.error("Elements not found");
      return;
    }

    const options = {
      // your options here...
    };

    const dropdown = new Dropdown(targetElRef.current, triggerElRef.current, options);
    //dropdown.show();

    // store the dropdown instance in ref
    dropdownRef.current = dropdown;

    // clean up when the component is unmounted or the elements change
    return () => {
      // ensure the dropdown instance exists
      if (dropdownRef.current) {
        dropdownRef.current.hide();
      }
    };
  }, []);


  return (
    <div className='sticky top-0 left-0 w-full z-50 flex items-center border-b border-white/20 bg-gray-800 pl-1 pt-1 text-gray-200 sm:pl-3 md:hidden'>
      <button
        type='button'
        className='-ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:hover:text-white'
        onClick={() => {
          setHideSideMenu(false);
        }}
      >
        <span className='sr-only'>Open sidebar</span>
        <MenuIcon />
      </button>
      <h1 className='flex-1 text-center text-base font-normal px-2 max-h-20 overflow-y-auto'>
        {chatTitle}
      </h1>
      <button ref={triggerElRef} id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" className="absolute right-2 inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 dark:text-white focus:ring-gray-50 dark:hover:bg-gray-700 dark:focus:ring-gray-600 dark:bg-gray-800" type="button"> 
        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
      </button>

      <div ref={targetElRef} id="dropdownDots" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
        <div className='cursor-pointer text-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-sm' onClick={() => {
          setIsModalOpen(true);
        }}>
          {t('model')}: 
          {modelName[model]} {advancedMode ? '('+t('advancedMode')+')':''}
        </div>
        <div className='menu-item pd-0 cursor-pointer text-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white' onClick={() => {
          if (dropdownRef.current) {
            dropdownRef.current.hide(); // 关闭菜单
          }
        }}>
          <NewChat />
        </div>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
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
      {isModalOpen && (
        <ConfigMenu
          setIsModalOpen={setIsModalOpen}
          config={config}
          setConfig={setConfig}
        />
      )}
    </div>
  );
};

export default MobileBar;
