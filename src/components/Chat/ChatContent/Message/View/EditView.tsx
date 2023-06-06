import React, { memo, useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useStore from '@store/store';

import useSubmit from '@hooks/useSubmit';

import { ChatInterface } from '@type/chat';

import PopupModal from '@components/PopupModal';
import TokenCount from '@components/TokenCount';
import CommandPrompt from '../CommandPrompt';
import StopGeneratingButton from '@components/StopGeneratingButton/StopGeneratingButton';
import _ from 'lodash';

const EditView = ({
  content,
  setIsEdit,
  messageIndex,
  sticky,
}: {
  content: string;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  messageIndex: number;
  sticky?: boolean;
}) => {
  const inputRole = useStore((state) => state.inputRole);
  const setChats = useStore((state) => state.setChats);
  const _draft = useStore((state) => state.draft);
  const currentChatIndex = useStore((state) => state.currentChatIndex);
  const advancedMode = useStore((state) => state.advancedMode);
  const generating = useStore.getState().generating;

  const [_content, _setContent] = useState<string>(content);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  //const textareaRef = React.createRef<HTMLTextAreaElement>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const prevContentRef = useRef(_content);

  // 定义需要排除的元素的refs
  const excludeElement1 = useRef<HTMLDivElement>(null);
  const excludeElement2 = useRef<HTMLDivElement>(null);
  const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);

  useEffect(() => {
  // 如果modal打开，不进行点击检查
    if (isCommandOpen || !advancedMode) {
      return;
    }

    const checkIfClickedOutside = (e: MouseEvent) => {
      //if (textareaRef.current && !textareaRef.current.contains(e.target as Node)) {
    if (
        textareaRef.current && 
        !textareaRef.current.contains(e.target as Node) &&
        excludeElement1.current && 
        !excludeElement1.current.contains(e.target as Node) 
        // && excludeElement2.current 
        // && !excludeElement2.current.contains(e.target as Node)
      ) {
        //handleSaveSilence()
        setTimeout(() => setIsEdit(false), 0);
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [_content, isModalOpen, isCommandOpen]);

  const { t } = useTranslation();

  const resetTextAreaHeight = () => {
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|playbook|silk/i.test(
        navigator.userAgent
      );

    if (e.key === 'Enter' && !isMobile && !e.nativeEvent.isComposing) {
      const enterToSubmit = useStore.getState().enterToSubmit;
      if (sticky) {
        if (
          (enterToSubmit && !e.shiftKey) ||
          (!enterToSubmit && (e.ctrlKey || e.shiftKey))
        ) {
          e.preventDefault();
          handleSaveAndSubmit();
          resetTextAreaHeight();
        }
      } else {
        if (e.ctrlKey && e.shiftKey) {
          e.preventDefault();
          handleSaveAndSubmit();
          resetTextAreaHeight();
        } else if (e.ctrlKey || e.shiftKey) handleSave();
      }
    }
  };

  const handleSaveSilence = () => {
    if (sticky && (_content === '' || useStore.getState().generating)) return;
    const updatedChats: ChatInterface[] = JSON.parse(
      JSON.stringify(useStore.getState().chats)
    );
    const updatedMessages = updatedChats[currentChatIndex].messages;
    if (sticky) {
      if(updatedMessages[messageIndex] !== undefined) {
        updatedMessages[messageIndex].content = _content;
      }
      //setDraft(_content);
    } else {
      updatedMessages[messageIndex].content = _content;
      //_setContent(updatedMessages[messageIndex].content);
    }    
    setChats(updatedChats);
  };

  const handleSave = () => {
    if (sticky && (_content === '' || useStore.getState().generating)) return;
    const updatedChats: ChatInterface[] = JSON.parse(
      JSON.stringify(useStore.getState().chats)
    );
    const updatedMessages = updatedChats[currentChatIndex].messages;
    if (sticky) {
      updatedMessages.push({ role: inputRole, content: _content });
      _setContent('');
      resetTextAreaHeight();
    } else {
      console.log(_content)
      updatedMessages[messageIndex].content = _content;
      setIsEdit(false);
    }
    setChats(updatedChats);
  };

  const { handleSubmit } = useSubmit();
  const handleSaveAndSubmit = () => {
    console.log("save and submit")
    if (useStore.getState().generating) return;
    const updatedChats: ChatInterface[] = JSON.parse(
      JSON.stringify(useStore.getState().chats)
    );
    const updatedMessages = updatedChats[currentChatIndex].messages;
    if (sticky) {
      if (_content !== '') {
        updatedMessages.push({ role: inputRole, content: _content });
      }
      _setContent('');
      resetTextAreaHeight();
    } else {
      updatedMessages[messageIndex].content = _content;
      updatedChats[currentChatIndex].messages = updatedMessages.slice(
        0,
        messageIndex + 1
      );
      setIsEdit(false);
    }
    setChats(updatedChats);
    handleSubmit();
  };

  const setGenerating = useStore((state) => state.setGenerating);

  useEffect(() => {
    if (advancedMode) {
      if (prevContentRef.current !== _content) {
        console.log("saving silence")
        handleSaveSilence();
      }
      prevContentRef.current = _content;
    }
  }, [_content]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [_content]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);
  
  return (
    <>
      {sticky && (
      <div
      className='absolute bottom-20 left-0 right-0 m-auto flex md:w-full md:m-auto gap-0 md:gap-2 justify-center'>
        <StopGeneratingButton />
      </div>
      )}

      <div
        className={`relative w-[calc(100%)] ${
          sticky
            ? 'py-2 md:py-3 px-2 md:px-4 border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]'
            : ''
        }`}
      >
        <textarea
          ref={textareaRef}
          className='m-0 resize-none border-0 p-0 rounded-lg bg-transparent overflow-y-hidden focus:ring-0 focus-visible:ring-0 leading-7 w-[calc(100%-50px)] placeholder:text-gray-500/40'
          onChange={(e) => {
            _setContent(e.target.value);
          }}
          value={_content}
          placeholder={sticky?t('submitPlaceholderbtm') as string:t('submitPlaceholder') as string}
          onKeyDown={handleKeyDown}
          rows={1}
        ></textarea>
        {sticky && (<button className="absolute p-1 rounded-md text-gray-500 md:bottom-2.5 hover:bg-gray-100 enabled:dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent right-1 md:right-2 disabled:opacity-40" disabled={_content === '' || generating} onClick={handleSaveAndSubmit}>
          <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>)}
        {sticky || (
          <div ref={excludeElement1}>
            <EditViewButtons
              ref={excludeElement2}
              sticky={sticky}
              handleSaveAndSubmit={handleSaveAndSubmit}
              handleSave={handleSave}
              setIsModalOpen={setIsModalOpen}
              setIsCommandOpen={setIsCommandOpen}
              setIsEdit={setIsEdit}
              _setContent={_setContent}
            />
          </div>
        )}
      </div>
      <div className='absolute top-0 -right-7'>
        {sticky && advancedMode && (
          <CommandPrompt 
          _setContent={_setContent} 
          setIsCommandOpen={setIsCommandOpen}
          />
        )}
      </div>
      {sticky && advancedMode && (
        <div className='absolute top-[-20px] right-0'>
          <TokenCount />
        </div>
      )}

      {isModalOpen && (
        <PopupModal
          setIsModalOpen={setIsModalOpen}
          title={t('warning') as string}
          message={t('clearMessageWarning') as string}
          handleConfirm={handleSaveAndSubmit}
        />
      )}
    </>
  );
};

const EditViewButtons = memo(
  React.forwardRef(
  ({
    sticky = false,
    handleSaveAndSubmit,
    handleSave,
    setIsModalOpen,
    setIsEdit,
    _setContent,
    setIsCommandOpen
  }: {
    sticky?: boolean;
    handleSaveAndSubmit: () => void;
    handleSave: () => void;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    _setContent: React.Dispatch<React.SetStateAction<string>>;
    setIsCommandOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }, ref) => {
    const { t } = useTranslation();
    const generating = useStore.getState().generating;
    const advancedMode = useStore((state) => state.advancedMode);
    
    // useEffect(() => {
    //   setIsCommandOpen(true);
    //   console.log("cmd opened")
    
    //   return () => {
    //     console.log("cmd closed")
    //     setIsCommandOpen(false);
    //   };
    // }, []);

    return (
      <div className='flex relative'>
        <div className='flex-1 text-center mt-2 flex justify-center'>
          {/* {sticky && (
            <button
              className={`btn relative mr-2 btn-primary ${
                generating ? 'cursor-not-allowed opacity-40' : ''
              }`}
              onClick={handleSaveAndSubmit}
            >
              <div className='flex items-center justify-center gap-2'>
                {t('saveAndSubmit')}
              </div>
            </button>
          )} */}

          {sticky || advancedMode || (
            <button
              className='btn relative mr-2 btn-primary'
              onClick={() => {
                !generating && setIsModalOpen(true);
              }}
              //onClick={handleSaveAndSubmit}
            >
              <div className='flex items-center justify-center gap-2'>
                {t('saveAndSubmit')}
              </div>
            </button>
          )}

          {sticky || advancedMode || (<button
            className={`btn relative mr-2 ${
              sticky
                ? `btn-neutral ${
                    generating ? 'cursor-not-allowed opacity-40' : ''
                  }`
                : 'btn-neutral'
            }`}
            onClick={handleSave}
          >
            <div className='flex items-center justify-center gap-2'>
              {t('save')}
            </div>
          </button>
          )}

          {sticky || advancedMode || (
            <button
              className='btn relative btn-neutral'
              onClick={() => setIsEdit(false)}
            >
              <div className='flex items-center justify-center gap-2'>
                {t('cancel')}
              </div>
            </button>
          )}
        </div>
        {sticky || (
        <CommandPrompt 
          _setContent={_setContent} 
          setIsCommandOpen={setIsCommandOpen}
        />)
        }
      </div>
    );
  }
));

export default EditView;
