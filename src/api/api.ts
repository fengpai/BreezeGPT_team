import { ShareGPTSubmitBodyInterface } from '@type/api';
import { ConfigInterface, MessageInterface } from '@type/chat';
import { isAzureEndpoint } from '@utils/api';

export const getChatCompletion = async (
  endpoint: string,
  messages: MessageInterface[],
  config: ConfigInterface,
  apiKey?: string,
  customHeaders?: Record<string, string>
) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;
  if (isAzureEndpoint(endpoint) && apiKey) headers['api-key'] = apiKey;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      messages,
      ...config,
      max_tokens: null,
    }),
  });
  if (!response.ok) throw new Error(await response.text());

  const data = await response.json();
  return data;
};

export const getChatCompletionStream = async (
  endpoint: string,
  messages: MessageInterface[],
  config: ConfigInterface,
  function_togo: string,
  apiKey?: string,
  customHeaders?: Record<string, string>
) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;
  if (isAzureEndpoint(endpoint) && apiKey) headers['api-key'] = apiKey;

  let body = {
    messages,
    ...config,
    max_tokens: null,
    stream: true,
  };

  try {
    let cleanString = function_togo.replace(/(\r\n|\n|\r|\t)/gm, "");
    let function_togo_array = JSON.parse(cleanString);
    if (Array.isArray(function_togo_array)) {
      body = {
        ...body,
        functions: function_togo_array,
      } 
    } else {
      console.log("Parsed value is not a valid array.");
    }
  } catch(e) {
    console.log("Parsing error:", e);
  }

  const paras = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  };

  const response = await fetch(endpoint,paras);
  if (response.status === 404 || response.status === 405) {
    const text = await response.text();
    if (text.includes('model_not_found')) {
      throw new Error(
        text +
          '\nMessage from BreezeGPT:\nPlease ensure that you have access to the GPT-4 API!'
      );
    } else {
      throw new Error(
        'Message from BreezeGPT:\nInvalid API endpoint! We recommend you to check your free API endpoint.'
      );
    }
  }

  if (response.status === 429 || !response.ok) {
    const text = await response.text();
    let error = text;
    if (text.includes('insufficient_quota')) {
      error +=
        '\nMessage from BreezeGPT:\nWe recommend changing your API endpoint or API key';
    } else if (response.status === 429) {
      error += '\nRate limited!';
    }
    throw new Error(error);
  }

  const stream = response.body;
  return stream;
};

export const submitShareGPT = async (body: ShareGPTSubmitBodyInterface) => {
  const request = await fetch('https://sharegpt.com/api/conversations', {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  const response = await request.json();
  const { id } = response;
  const url = `https://shareg.pt/${id}`;
  window.open(url, '_blank');
};
