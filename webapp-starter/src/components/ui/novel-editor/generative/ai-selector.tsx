'use client';

import { Button, Command, CommandInput, ScrollArea } from '@/components';
import { ArrowUp } from 'lucide-react';
import { readStreamableValue } from 'ai/rsc';
import { useEditor } from 'novel';
import { addAIHighlight } from 'novel/extensions';
import { useState } from 'react';
import Markdown from 'react-markdown';
import CrazySpinner from '../../icons/crazy-spinner';
import Magic from '../../icons/magik';
import { Option, generate } from './ai-actions';
import AICompletionCommands from './ai-completion-command';
import AISelectorCommands from './ai-selector-commands';
//TODO: I think it makes more sense to create a custom Tiptap extension for this functionality https://tiptap.dev/docs/editor/ai/introduction

interface AISelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AISelector({ onOpenChange }: AISelectorProps) {
  const { editor } = useEditor();
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [completion, setCompletion] = useState<string>('');

  const hasCompletion = completion && completion.length > 0;

  const complete = async (prompt: string, option: Option, command: string) => {
    setIsLoading(true);
    const { output } = await generate({ prompt, option, command });
    if (typeof output === 'string') {
      setCompletion(output);
    } else {
      for await (const delta of readStreamableValue(output)) {
        setCompletion((currentGeneration) => `${currentGeneration}${delta}`);
      }
    }
    setIsLoading(false);
  };

  return (
    <Command className="w-[350px]">
      {hasCompletion && (
        <div className="flex max-h-[400px]">
          <ScrollArea>
            <div className="prose p-2 px-4 prose-sm">
              <Markdown>{completion}</Markdown>
            </div>
          </ScrollArea>
        </div>
      )}

      {isLoading && (
        <div className="flex h-12 w-full items-center px-4 text-sm font-medium text-muted-foreground text-purple-500">
          <Magic className="mr-2 h-4 w-4 shrink-0  " />
          AI is thinking
          <div className="ml-2 mt-1">
            <CrazySpinner />
          </div>
        </div>
      )}
      {!isLoading && (
        <>
          <div className="relative">
            <CommandInput
              value={inputValue}
              onValueChange={setInputValue}
              autoFocus
              placeholder={
                hasCompletion
                  ? 'Tell AI what to do next'
                  : 'Ask AI to edit or generate...'
              }
              onFocus={() => editor && addAIHighlight(editor)}
            />
            <Button
              width="icon"
              className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-purple-500 hover:bg-purple-900"
              onClick={() => {
                if (completion)
                  return complete(completion, 'zap', inputValue).then(() =>
                    setInputValue(''),
                  );

                const slice = editor?.state.selection.content();
                const text =
                  slice &&
                  editor?.storage.markdown.serializer.serialize(slice.content);

                complete(text, 'zap', inputValue).then(() => setInputValue(''));
              }}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
          {hasCompletion ? (
            <AICompletionCommands
              onDiscard={() => {
                editor?.chain().unsetHighlight().focus().run();
                onOpenChange(false);
              }}
              completion={completion}
            />
          ) : (
            <AISelectorCommands
              onSelect={(value, option: Option) => complete(value, option, '')}
            />
          )}
        </>
      )}
    </Command>
  );
}
