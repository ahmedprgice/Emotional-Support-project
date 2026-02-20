import { useState, useEffect } from 'react';
import { ArrowLeft, Image, Sticker, Pen, Save } from 'lucide-react';
import type { JournalEntry } from '../App';

type JournalEditorProps = {
  entry?: JournalEntry;
  onSave: (title: string, content: string) => void;
  onBack: () => void;
};

export function JournalEditor({ entry, onSave, onBack }: JournalEditorProps) {
  const [title, setTitle] = useState(entry?.title || '');
  const [content, setContent] = useState(entry?.content || '');

  useEffect(() => {
    setTitle(entry?.title || '');
    setContent(entry?.content || '');
  }, [entry]);

  const handleSave = () => {
    if (title.trim() || content.trim()) {
      onSave(title, content);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden h-[600px] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 p-4 text-white">
        <div className="flex items-center justify-between mb-3">
          <button onClick={onBack} className="flex items-center gap-2 text-white/90 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
        <h1 className="text-xl">{entry ? 'Edit Entry' : 'New Journal Entry'}</h1>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-auto p-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Entry title..."
          className="w-full text-2xl mb-4 px-0 py-2 border-0 border-b-2 border-gray-200 focus:outline-none focus:border-purple-300 text-gray-800 placeholder-gray-400"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts..."
          className="w-full h-64 p-4 bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-700 placeholder-gray-400 resize-none"
        />
      </div>

      {/* Toolbar */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-purple-400 transition-colors">
            <Image className="w-6 h-6" />
            <span className="text-xs">Photo</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-purple-400 transition-colors">
            <Sticker className="w-6 h-6" />
            <span className="text-xs">Sticker</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-purple-400 transition-colors">
            <Pen className="w-6 h-6" />
            <span className="text-xs">Drawing</span>
          </button>
        </div>
      </div>
    </div>
  );
}
