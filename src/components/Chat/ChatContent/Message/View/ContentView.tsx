import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  memo,
  useState
} from 'react';

import ReactMarkdown from 'react-markdown';
import { CodeProps, ReactMarkdownProps } from 'react-markdown/lib/ast-to-react';

import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import useStore from '@store/store';

import TickIcon from '@icon/TickIcon';
import CrossIcon from '@icon/CrossIcon';

import useSubmit from '@hooks/useSubmit';

import { ChatInterface } from '@type/chat';

import { codeLanguageSubset } from '@constants/chat';

import RefreshButton from './Button/RefreshButton';
import UpButton from './Button/UpButton';
import DownButton from './Button/DownButton';
import CopyButton from './Button/CopyButton';
import EditButton from './Button/EditButton';
import DeleteButton from './Button/DeleteButton';
import MarkdownModeButton from './Button/MarkdownModeButton';
import NewMessageButtonInline from './../NewMessageButtonInline';

import CodeBlock from '../CodeBlock';

const ContentView = memo(
  ({
    role,
    content,
    setIsEdit,
    messageIndex,
  }: {
    role: string;
    content: string;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    messageIndex: number;
  }) => {
    const { handleSubmit } = useSubmit();

    const [isDelete, setIsDelete] = useState<boolean>(false);

    const currentChatIndex = useStore((state) => state.currentChatIndex);
    const setChats = useStore((state) => state.setChats);
    const lastMessageIndex = useStore((state) =>
      state.chats ? state.chats[state.currentChatIndex].messages.length - 1 : 0
    );
    const inlineLatex = useStore((state) => state.inlineLatex);
    const markdownMode = useStore((state) => state.markdownMode);
    const advancedMode = useStore((state) => state.advancedMode);

    const handleDelete = () => {
      if(!content || isDelete) {
        const updatedChats: ChatInterface[] = JSON.parse(
          JSON.stringify(useStore.getState().chats)
        );
        updatedChats[currentChatIndex].messages.splice(messageIndex, 1);
        setChats(updatedChats);
        setIsDelete(false);
      } else {
        setIsDelete(true);
      }
    };

    const handleMove = (direction: 'up' | 'down') => {
      const updatedChats: ChatInterface[] = JSON.parse(
        JSON.stringify(useStore.getState().chats)
      );
      const updatedMessages = updatedChats[currentChatIndex].messages;
      const temp = updatedMessages[messageIndex];
      if (direction === 'up') {
        updatedMessages[messageIndex] = updatedMessages[messageIndex - 1];
        updatedMessages[messageIndex - 1] = temp;
      } else {
        updatedMessages[messageIndex] = updatedMessages[messageIndex + 1];
        updatedMessages[messageIndex + 1] = temp;
      }
      setChats(updatedChats);
    };

    const handleMoveUp = () => {
      handleMove('up');
    };

    const handleMoveDown = () => {
      handleMove('down');
    };

    const handleRefresh = () => {
      const updatedChats: ChatInterface[] = JSON.parse(
        JSON.stringify(useStore.getState().chats)
      );
      const updatedMessages = updatedChats[currentChatIndex].messages;
      updatedMessages.splice(updatedMessages.length - 1, 1);
      setChats(updatedChats);
      handleSubmit();
    };

    const handleCopy = () => {
      navigator.clipboard.writeText(content);
    };

    const handleClick = () => {
      if (advancedMode) {
        setIsEdit(true)
      }
    };

    return (
      <>
        <div className='markdown prose w-full md:max-w-full break-words dark:prose-invert dark share-gpt-message min-h-[28px]' onClick={handleClick}>
          {(markdownMode || !advancedMode) ? (
            <ReactMarkdown
              remarkPlugins={[
                remarkGfm,
                [remarkMath, { singleDollarTextMath: inlineLatex }],
              ]}
              rehypePlugins={[
                rehypeKatex,
                [
                  rehypeHighlight,
                  {
                    detect: true,
                    ignoreMissing: true,
                    subset: codeLanguageSubset,
                  },
                ],
              ]}
              linkTarget='_new'
              components={{
                code,
                p,
              }}
            >
              {content}
            </ReactMarkdown>
          ) : (
            <span className='whitespace-pre-wrap'>{content}</span>
          )}
        </div>
        <div className='flex justify-end gap-2 w-full mt-3'>
          {isDelete || (
            <>
              {(<div>&nbsp;</div>)}
              {!useStore.getState().generating &&
                role === 'assistant' &&
                messageIndex === lastMessageIndex && 
                messageIndex !== 0 &&(
                  <RefreshButton onClick={handleRefresh} />
                )}
              {!useStore.getState().generating && messageIndex !== 0 && advancedMode && <UpButton onClick={handleMoveUp} />}
              {!useStore.getState().generating && messageIndex !== lastMessageIndex && advancedMode && (
                <DownButton onClick={handleMoveDown} />
              )}
              {!useStore.getState().generating && advancedMode && <NewMessageButtonInline messageIndex={messageIndex} />}
              {!useStore.getState().generating && advancedMode && <MarkdownModeButton />}
              {!useStore.getState().generating && (<CopyButton onClick={handleCopy} />)}
              {advancedMode || role === 'user' && <EditButton setIsEdit={setIsEdit} />}
              {!useStore.getState().generating && (<DeleteButton onClick={handleDelete}/>)}
            </>
          )}
          {isDelete && (
            <>
              <button
                className='p-1 hover:text-white'
                onClick={() => setIsDelete(false)}
              >
                <CrossIcon />
              </button>
              <button className='p-1 hover:text-white' onClick={handleDelete}>
                <TickIcon />
              </button>
            </>
          )}
        </div>
      </>
    );
  }
);

const code = memo((props: CodeProps) => {
  const { inline, className, children } = props;
  const match = /language-(\w+)/.exec(className || '');
  const lang = match && match[1];

  if (inline) {
    return <code className={className}>{children}</code>;
  } else {
    return <CodeBlock lang={lang || 'text'} codeChildren={children} />;
  }
});

const p = memo(
  (
    props?: Omit<
      DetailedHTMLProps<
        HTMLAttributes<HTMLParagraphElement>,
        HTMLParagraphElement
      >,
      'ref'
    > &
      ReactMarkdownProps
  ) => {
    return <p className='whitespace-pre-wrap'>{props?.children}</p>;
  }
);

export default ContentView;
// function useEffect(arg0: () => () => void, arg1: never[]) {
//   throw new Error('Function not implemented.');
// }

