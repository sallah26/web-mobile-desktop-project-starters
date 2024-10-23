import {
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components';
import { Check, TextQuote, TrashIcon } from 'lucide-react';
import { useEditor } from 'novel';

export default function AICompletionCommands({
  completion,
  onDiscard,
}: {
  completion: string;
  onDiscard: () => void;
}) {
  const { editor } = useEditor();
  if (!editor) return <></>;
  return (
    <CommandList>
      <CommandGroup>
        <CommandItem
          className="gap-2 px-4"
          value="replace"
          onSelect={() => {
            const selection = editor.view.state.selection;
            if (!selection) return;
            editor
              .chain()
              .focus()
              .insertContentAt(
                {
                  from: selection.from,
                  to: selection.to,
                },
                completion,
              )
              .run();
          }}
        >
          <Check className="h-4 w-4 text-muted-foreground" />
          Replace selection
        </CommandItem>
        <CommandItem
          className="gap-2 px-4"
          value="insert"
          onSelect={() => {
            const selection = editor.view.state.selection;
            if (!selection) return;
            editor
              .chain()
              .focus()
              .insertContentAt(selection.to + 1, completion)
              .run();
          }}
        >
          <TextQuote className="h-4 w-4 text-muted-foreground" />
          Insert below
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />

      <CommandGroup>
        <CommandItem onSelect={onDiscard} value="thrash" className="gap-2 px-4">
          <TrashIcon className="h-4 w-4 text-muted-foreground" />
          Discard
        </CommandItem>
      </CommandGroup>
    </CommandList>
  );
}
