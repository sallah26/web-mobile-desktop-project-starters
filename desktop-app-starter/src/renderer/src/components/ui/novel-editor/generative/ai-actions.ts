'use server';

import { createOpenAI } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';
import { createStreamableValue } from 'ai/rsc';

export type Option =
  | 'continue'
  | 'improve'
  | 'shorter'
  | 'longer'
  | 'fix'
  | 'zap';
export interface Message {
  prompt: string;
  option: Option;
  command: string;
}
export async function generate({ prompt, option, command }: Message) {
  'use server';

  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === '') {
    return {
      output: 'Missing OPENAI_API_KEY - make sure to add it to your .env file.',
    };
  }

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
  });

  const messages: Record<
    Message['option'],
    { role: 'system' | 'user'; content: string }[]
  > = {
    continue: [
      {
        role: 'system',
        content:
          'You are an AI writing assistant that continues existing text based on context from prior text. ' +
          'Give more weight/priority to the later characters than the beginning ones. ' +
          'Limit your response to no more than 200 characters, but make sure to construct complete sentences.' +
          'Use Markdown formatting when appropriate.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    improve: [
      {
        role: 'system',
        content:
          'You are an AI writing assistant that improves existing text. ' +
          'Limit your response to no more than 200 characters, but make sure to construct complete sentences.' +
          'Use Markdown formatting when appropriate.',
      },
      {
        role: 'user',
        content: `The existing text is: ${prompt}`,
      },
    ],
    shorter: [
      {
        role: 'system',
        content:
          'You are an AI writing assistant that shortens existing text. ' +
          'Use Markdown formatting when appropriate.',
      },
      {
        role: 'user',
        content: `The existing text is: ${prompt}`,
      },
    ],
    longer: [
      {
        role: 'system',
        content:
          'You are an AI writing assistant that lengthens existing text. ' +
          'Use Markdown formatting when appropriate.',
      },
      {
        role: 'user',
        content: `The existing text is: ${prompt}`,
      },
    ],
    fix: [
      {
        role: 'system',
        content:
          'You are an AI writing assistant that fixes grammar and spelling errors in existing text. ' +
          'Limit your response to no more than 200 characters, but make sure to construct complete sentences.' +
          'Use Markdown formatting when appropriate.',
      },
      {
        role: 'user',
        content: `The existing text is: ${prompt}`,
      },
    ],
    zap: [
      {
        role: 'system',
        content:
          'You area an AI writing assistant that generates text based on a prompt. ' +
          'You take an input from the user and a command for manipulating the text' +
          'Use Markdown formatting when appropriate.',
      },
      {
        role: 'user',
        content: `For this text: ${prompt}. You have to respect the command: ${command}`,
      },
    ],
  };

  const stream = createStreamableValue();

  (async () => {
    const { textStream } = await streamText({
      model: openai('llama3-8b-8192'),
      messages: convertToCoreMessages(messages[option]),
      temperature: 0.7,
    });

    for await (const text of textStream) {
      stream.update(text);
    }

    stream.done();
  })();

  return { output: stream.value };
}
