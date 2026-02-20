import React, { useState, useEffect } from 'react';
import { X, Image, Palette, Pencil, Save } from 'lucide-react';
import type { JournalEntry } from '../App';
import { translations, type Language } from '../utils/translations';

interface JournalEditorScreenProps {
  entry: JournalEntry | null;
  onSave: (entry: JournalEntry) => void;
  onCancel: () => void;
  language: Language;
}

export function JournalEditorScreen({ entry, onSave, onCancel, language }: JournalEditorScreenProps) {
  const [title, setTitle] = useState(entry?.title || '');
  const [content, setContent] = useState(entry?.content || '');
  const t = translations[language];

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setContent(entry.content);
    }
  }, [entry]);

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      onSave({
        id: entry?.id || Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        date: entry?.date || new Date()
      });
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 max-w-5xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-800 flex-shrink-0">
        <div className="flex items-center justify-between mb-4 sm:mb-6 gap-3">
          <button
            onClick={onCancel}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors flex-shrink-0 active:scale-95 touch-manipulation"
            aria-label="Close"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
          </button>
          <h2 className="text-lg sm:text-xl lg:text-2xl text-white font-medium text-center flex-1 min-w-0 truncate px-2">
            {entry ? t.editEntry : t.newEntry}
          </h2>
          <button
            onClick={handleSave}
            disabled={!title.trim() || !content.trim()}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full flex items-center gap-2 transition-all text-sm sm:text-base flex-shrink-0 touch-manipulation active:scale-95 ${
              title.trim() && content.trim()
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                : 'bg-gray-800 text-gray-600 border border-gray-700'
            }`}
          >
            <Save className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">{t.save}</span>
          </button>
        </div>

        {/* Tools */}
        <div className="flex gap-2 sm:gap-3 lg:gap-4 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
          <button className="px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 bg-purple-900 text-purple-300 rounded-full flex items-center gap-2 hover:bg-purple-800 transition-colors border border-purple-800 text-xs sm:text-sm whitespace-nowrap flex-shrink-0 touch-manipulation active:scale-95">
            <Image className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">{t.addPhoto}</span>
          </button>
          <button className="px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 bg-pink-900 text-pink-300 rounded-full flex items-center gap-2 hover:bg-pink-800 transition-colors border border-pink-800 text-xs sm:text-sm whitespace-nowrap flex-shrink-0 touch-manipulation active:scale-95">
            <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">{t.addSticker}</span>
          </button>
          <button className="px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 bg-blue-900 text-blue-300 rounded-full flex items-center gap-2 hover:bg-blue-800 transition-colors border border-blue-800 text-xs sm:text-sm whitespace-nowrap flex-shrink-0 touch-manipulation active:scale-95">
            <Pencil className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">{t.addDrawing}</span>
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 p-4 sm:p-8 lg:p-12 overflow-y-auto bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t.entryTitle}
            className="w-full text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6 bg-transparent outline-none placeholder-gray-600 text-white"
          />
          <div className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8">
            {new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t.writeThoughtsPlaceholder}
            className="w-full min-h-[400px] sm:min-h-[500px] bg-transparent outline-none resize-none placeholder-gray-600 leading-relaxed text-base sm:text-lg text-gray-200"
          />
        </div>
      </div>
    </div>
  );
}