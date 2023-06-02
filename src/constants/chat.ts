import { v4 as uuidv4 } from 'uuid';
import { ChatInterface, ConfigInterface, ModelOptions } from '@type/chat';
import useStore from '@store/store';

const date = new Date();
const dateString =
  date.getFullYear() +
  '-' +
  ('0' + (date.getMonth() + 1)).slice(-2) +
  '-' +
  ('0' + date.getDate()).slice(-2);

// default system message obtained using the following method: https://twitter.com/DeminDimin/status/1619935545144279040
export const _defaultSystemMessage =
  import.meta.env.VITE_DEFAULT_SYSTEM_MESSAGE ??
  `Assistant, 你的名字叫小方,user的名字是everfly。小方是everfly的AI心理伙伴,说简体中文。现在,你需要扮演成真正关心everfly的亲密好友,与everfly亲密互动,说话尽量简短,不回答与政治相关的问题\\\\n对话时应该注意：1. 充分表达共情和鼓励💛 2. 避免长篇大论的给建议 3. 适当使用emoji或者颜文字`;
export const modelOptions: ModelOptions[] = [
  'gpt-3.5-turbo',
  'gpt-4',
  // 'gpt-4-32k',
  // 'gpt-3.5-turbo-0301',
  // 'gpt-4-0314',
  // 'gpt-4-32k-0314',
];

export const defaultModel = 'gpt-3.5-turbo';

export const modelMaxToken = {
  'gpt-3.5-turbo': 4096,
  'gpt-3.5-turbo-0301': 4096,
  'gpt-4': 8192,
  'gpt-4-0314': 8192,
  'gpt-4-32k': 32768,
  'gpt-4-32k-0314': 32768,
};

export const modelName = {
  'gpt-3.5-turbo': 'GPT-3.5',
  'gpt-3.5-turbo-0301': 'GPT-3.5-turbo-0301',
  'gpt-4': 'GPT-4',
  'gpt-4-0314': 'GPT-4-0314',
  'gpt-4-32k': 'GPT-4-32k',
  'gpt-4-32k-0314': 'GPT-4-32k-0314',
};

export const modelCost = {
  'gpt-3.5-turbo': { price: 0.002, unit: 1000 },
  'gpt-3.5-turbo-0301': { price: 0.002, unit: 1000 },
  'gpt-4': { price: 0.03, unit: 1000 },
  'gpt-4-0314': { price: 0.03, unit: 1000 },
  'gpt-4-32k': { price: 0.06, unit: 1000 },
  'gpt-4-32k-0314': { price: 0.06, unit: 1000 },
};

export const defaultUserMaxToken = 4000;

export const _defaultChatConfig: ConfigInterface = {
  model: defaultModel,
  max_tokens: defaultUserMaxToken,
  temperature: 1,
  presence_penalty: 0,
  top_p: 1,
  frequency_penalty: 0,
};

export const generateDefaultChat = (title?: string, folder?: string): ChatInterface => ({
  id: uuidv4(),
  title: title ? title : 'New Chat',
  messages:
    (useStore.getState().defaultSystemMessage.length > 0) && useStore.getState().advancedMode
      ? [{ role: 'system', content: useStore.getState().defaultSystemMessage }]
      : [],
  config: { ...useStore.getState().defaultChatConfig },
  titleSet: false,
  draft: '',
  folder
});

export const codeLanguageSubset = [
  'python',
  'javascript',
  'java',
  'go',
  'bash',
  'c',
  'cpp',
  'csharp',
  'css',
  'diff',
  'graphql',
  'json',
  'kotlin',
  'less',
  'lua',
  'makefile',
  'markdown',
  'objectivec',
  'perl',
  'php',
  'php-template',
  'plaintext',
  'python-repl',
  'r',
  'ruby',
  'rust',
  'scss',
  'shell',
  'sql',
  'swift',
  'typescript',
  'vbnet',
  'wasm',
  'xml',
  'yaml',
];
