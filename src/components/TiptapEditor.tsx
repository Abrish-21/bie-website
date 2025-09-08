// src/components/TiptapEditor.tsx

import { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapImageExtension from '@tiptap/extension-image';
import { Bold, Italic, List, ListOrdered, Link, Image as ImageIcon, Pilcrow, Heading1, Heading2 } from 'lucide-react';

interface TiptapEditorProps {
  initialContent: string;
  onContentChange: (html: string) => void;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ initialContent, onContentChange }) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      TiptapImageExtension.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[300px] p-4 text-gray-800',
      },
    },
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('Image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex flex-wrap items-center p-2 bg-gray-50 border-b border-gray-200 gap-1">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} className={`p-2 rounded ${editor.isActive('bold') ? 'bg-blue-200' : 'hover:bg-gray-200'}`} title="Bold">
          <Bold className="h-4 w-4 text-gray-700" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()} className={`p-2 rounded ${editor.isActive('italic') ? 'bg-blue-200' : 'hover:bg-gray-200'}`} title="Italic">
          <Italic className="h-4 w-4 text-gray-700" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-blue-200' : 'hover:bg-gray-200'}`} title="Bullet List">
          <List className="h-4 w-4 text-gray-700" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-blue-200' : 'hover:bg-gray-200'}`} title="Ordered List">
          <ListOrdered className="h-4 w-4 text-gray-700" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().setParagraph().run()} className={`p-2 rounded ${editor.isActive('paragraph') ? 'bg-blue-200' : 'hover:bg-gray-200'}`} title="Paragraph">
          <Pilcrow className="h-4 w-4 text-gray-700" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-200' : 'hover:bg-gray-200'}`} title="Heading 1">
          <Heading1 className="h-4 w-4 text-gray-700" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-200' : 'hover:bg-gray-200'}`} title="Heading 2">
          <Heading2 className="h-4 w-4 text-gray-700" />
        </button>
        <button type="button" onClick={setLink} className={`p-2 rounded ${editor.isActive('link') ? 'bg-blue-200' : 'hover:bg-gray-200'}`} title="Set Link">
          <Link className="h-4 w-4 text-gray-700" />
        </button>
        <button type="button" onClick={addImage} className="p-2 rounded hover:bg-gray-200" title="Add Image by URL">
          <ImageIcon className="h-4 w-4 text-gray-700" />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
