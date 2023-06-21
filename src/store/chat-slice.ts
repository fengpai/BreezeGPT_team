import { StoreSlice } from './store';
import { ChatInterface, DraftInterface, FolderCollection, MessageInterface } from '@type/chat';

export interface ChatSlice {
  messages: MessageInterface[];
  chats?: ChatInterface[];
  currentChatIndex: number;
  generating: boolean;
  isGenerated: boolean;
  error: string;
  folders: FolderCollection;
  newEditIndex: number;
  draft: string;
  inputFunction: boolean;
  functionContent: string;
  setMessages: (messages: MessageInterface[]) => void;
  setChats: (chats: ChatInterface[]) => void;
  setDraft: (draft: string) => void;
  setCurrentChatIndex: (currentChatIndex: number) => void;
  setGenerating: (generating: boolean) => void;
  setError: (error: string) => void;
  setFolders: (folders: FolderCollection) => void;
  setNewEditIndex: (newEditIndex: number) => void;
  setFunction: (inputFunction: boolean) => void;
  updateFunction: (functionContent: string) => void;
  setIsGenerated: (isGenerated: boolean) => void;
}

export const createChatSlice: StoreSlice<ChatSlice> = (set, get) => ({
  messages: [],
  newEditIndex: -1,
  currentChatIndex: -1,
  generating: false,
  inputFunction: false,
  isGenerated: false,
  draft: '',
  functionContent: '',
  error: '',
  folders: {},
  setMessages: (messages: MessageInterface[]) => {
    set((prev: ChatSlice) => ({
      ...prev,
      messages: messages,
    }));
  },
  setChats: (chats: ChatInterface[]) => {
    set((prev: ChatSlice) => ({
      ...prev,
      chats: chats,
    }));
  },
  setDraft: (draft: string) => {
    console.log("saving draft")
    set((prev: ChatSlice) => ({
      ...prev,
      draft: draft,
    }));
  },
  setNewEditIndex: (newEditIndex: number) => {
    set((prev: ChatSlice) => ({
      ...prev,
      newEditIndex: newEditIndex,
    }));
  },
  setCurrentChatIndex: (currentChatIndex: number) => {
    set((prev: ChatSlice) => ({
      ...prev,
      currentChatIndex: currentChatIndex,
    }));
  },
  setGenerating: (generating: boolean) => {
    set((prev: ChatSlice) => ({
      ...prev,
      generating: generating,
    }));
  },
  setIsGenerated: (isGenerated: boolean) => {
    set((prev: ChatSlice) => ({
      ...prev,
      isGenerated: isGenerated,
    }));
  },

  setError: (error: string) => {
    set((prev: ChatSlice) => ({
      ...prev,
      error: error,
    }));
  },
  setFolders: (folders: FolderCollection) => {
    set((prev: ChatSlice) => ({
      ...prev,
      folders: folders,
    }));
  },
  setFunction: (inputFunction: boolean) => {
    set((prev: ChatSlice) => ({
      ...prev,
      inputFunction: inputFunction,
    }));
  },
  updateFunction: (functionContent: string) => {
    set((prev: ChatSlice) => ({
      ...prev,
      functionContent: functionContent,
    }));
  },
});
