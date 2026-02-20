import React, { useState } from 'react';
import { Lock, Save, Search, Tag } from 'lucide-react';
import { translations, type Language } from '../utils/translations';

interface PrivateNotesScreenProps {
  language: Language;
}

export function PrivateNotesScreen({ language }: PrivateNotesScreenProps) {
  const [noteText, setNoteText] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const t = translations[language];

  const handleSave = () => {
    if (noteText.trim()) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-12 lg:py-12 pt-[88px] sm:pt-24 lg:pt-12 pb-safe">
      {/* Header */}
      <div className="mb-6 sm:mb-8 lg:mb-12">
        <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3 lg:mb-4">
          <h1 className="text-[28px] leading-tight sm:text-4xl lg:text-5xl text-white font-semibold">{t.privateNotesTitle}</h1>
        </div>
        <p className="text-base sm:text-lg lg:text-xl text-gray-400 pl-11 sm:pl-[52px] lg:pl-14">{t.safeSpace}</p>
      </div>

      {/* Tools */}
      <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8">
        <button className="px-4 sm:px-6 py-2.5 sm:py-3 lg:py-4 bg-gray-800 text-gray-300 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 sm:gap-3 border border-gray-700 text-sm sm:text-base touch-manipulation active:scale-95">
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden xs:inline">{t.search}</span>
        </button>
        <button className="px-4 sm:px-6 py-2.5 sm:py-3 lg:py-4 bg-gray-800 text-gray-300 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 sm:gap-3 border border-gray-700 text-sm sm:text-base touch-manipulation active:scale-95">
          <Tag className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden xs:inline">{t.tags}</span>
        </button>
        <button
          onClick={handleSave}
          disabled={!noteText.trim()}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 lg:py-4 rounded-full shadow-md transition-all flex items-center gap-2 sm:gap-3 text-sm sm:text-base touch-manipulation active:scale-95 ${
            noteText.trim()
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
              : 'bg-gray-800 text-gray-600 border border-gray-700'
          }`}
        >
          <Save className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>{isSaved ? t.saved : t.save}</span>
        </button>
      </div>

      {/* Writing Area */}
      <div className="bg-gray-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 shadow-lg mb-6 sm:mb-8 border border-gray-700" style={{ minHeight: '400px' }}>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder={t.writeAnything}
          className="w-full h-full bg-transparent text-white placeholder-gray-600 resize-none focus:outline-none text-base sm:text-lg leading-relaxed"
          style={{ minHeight: '350px' }}
        />
      </div>

      {/* Privacy Notice */}
      <div className="bg-purple-900/30 border border-purple-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8">
        <div className="flex items-start gap-3 sm:gap-4">
          <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm sm:text-base text-purple-200 leading-relaxed">
            {t.privacyNotice}
          </p>
        </div>
      </div>
    </div>
  );
}