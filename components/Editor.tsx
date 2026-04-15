"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { useCallback } from 'react';

const lowlight = createLowlight(common);

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function Editor({ content, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Placeholder.configure({
        placeholder: 'Write something amazing...',
      }),
      Image,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[300px]',
      },
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt('Enter image URL');

    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-wrap gap-2 p-2 border border-zinc-200 dark:border-zinc-800 rounded-md bg-zinc-50 dark:bg-zinc-900">
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run(); }}
          className={`px-3 py-1.5 rounded text-sm font-medium ${editor.isActive('bold') ? 'bg-zinc-200 dark:bg-zinc-700' : 'hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}
        >
          Bold
        </button>
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run(); }}
          className={`px-3 py-1.5 rounded text-sm font-medium ${editor.isActive('italic') ? 'bg-zinc-200 dark:bg-zinc-700' : 'hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}
        >
          Italic
        </button>
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 2 }).run(); }}
          className={`px-3 py-1.5 rounded text-sm font-medium ${editor.isActive('heading', { level: 2 }) ? 'bg-zinc-200 dark:bg-zinc-700' : 'hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}
        >
          H2
        </button>
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 3 }).run(); }}
          className={`px-3 py-1.5 rounded text-sm font-medium ${editor.isActive('heading', { level: 3 }) ? 'bg-zinc-200 dark:bg-zinc-700' : 'hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}
        >
          H3
        </button>
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run(); }}
          className={`px-3 py-1.5 rounded text-sm font-medium ${editor.isActive('bulletList') ? 'bg-zinc-200 dark:bg-zinc-700' : 'hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}
        >
          List
        </button>
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleCodeBlock().run(); }}
          className={`px-3 py-1.5 rounded text-sm font-medium ${editor.isActive('codeBlock') ? 'bg-zinc-200 dark:bg-zinc-700' : 'hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}
        >
          Code
        </button>
        <button
          onClick={(e) => { e.preventDefault(); addImage(); }}
          className="px-3 py-1.5 rounded text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700"
        >
          Image
        </button>
      </div>
      <div className="border border-zinc-200 dark:border-zinc-800 rounded-md p-4 bg-white dark:bg-zinc-950">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
