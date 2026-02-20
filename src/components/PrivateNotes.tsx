import { useState, useEffect } from 'react';
import { ArrowLeft, Search, Tag, Save } from 'lucide-react';

type PrivateNotesProps = {
  notes: string;
  onSave: (notes: string) => void;
  onBack: () => void;
};

export function PrivateNotes({ notes, onSave, onBack }: PrivateNotesProps) {
  const [content, setContent] = useState(notes);
  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    setContent(notes);
  }, [notes]);

  useEffect(() => {
    setIsSaved(content === notes);
  }, [content, notes]);

  const handleSave = () => {
    onSave(content);
    setIsSaved(true);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden h-[600px] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 p-4 text-white">
        <div className="flex items-center justify-between mb-3">
          <button onClick={onBack} className="flex items-center gap-2 text-white/90 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
              <Tag className="w-4 h-4" />
            </button>
          </div>
        </div>
        <h1 className="text-xl mb-1">Private Notes</h1>
        <p className="text-indigo-100 text-sm">No AI • Just for you 🔒</p>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-auto p-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Your private space... write anything you want. These notes are completely private and won't be seen by the AI."
          className="w-full h-full p-4 bg-gradient-to-br from-indigo-50/30 to-purple-50/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-700 placeholder-gray-400 resize-none"
        />
      </div>

      {/* Save Button */}
      <div className="p-4 bg-white border-t border-gray-100">
        <button
          onClick={handleSave}
          disabled={isSaved}
          className={`w-full py-3 rounded-full flex items-center justify-center gap-2 transition-all ${
            isSaved
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-400 to-purple-400 text-white hover:opacity-90 shadow-lg'
          }`}
        >
          <Save className="w-5 h-5" />
          <span>{isSaved ? 'Saved' : 'Save Notes'}</span>
        </button>
      </div>
    </div>
  );
}
