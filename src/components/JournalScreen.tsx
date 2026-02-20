import React from 'react';
import { Plus, BookOpen } from 'lucide-react';
import type { JournalEntry } from '../App';
import { translations, type Language } from '../utils/translations';

interface JournalScreenProps {
  entries: JournalEntry[];
  onNewEntry: () => void;
  onEditEntry: (entry: JournalEntry) => void;
  language: Language;
}

export function JournalScreen({ entries, onNewEntry, onEditEntry, language }: JournalScreenProps) {
  const t = translations[language];
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-12 lg:py-12 pt-[88px] sm:pt-24 lg:pt-12 pb-safe">
      {/* Header */}
      <div className="mb-6 sm:mb-8 lg:mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-[28px] leading-tight sm:text-4xl lg:text-5xl mb-2 sm:mb-3 lg:mb-4 text-white font-semibold">{t.myJournal}</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400">{t.personalDiary}</p>
        </div>
        <button
          onClick={onNewEntry}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 sm:hover:scale-105 flex items-center justify-center gap-2 sm:gap-3 touch-manipulation flex-shrink-0 font-medium"
        >
          <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-base sm:text-lg">{t.newEntry}</span>
        </button>
      </div>

      {/* Journal Entries */}
      {entries.length === 0 ? (
        <div className="text-center text-gray-500 mt-16 sm:mt-24 lg:mt-32 px-4">
          <BookOpen className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 sm:mb-6 opacity-50" />
          <p className="text-xl sm:text-2xl mb-2 sm:mb-4 text-gray-400">{t.noJournalEntries}</p>
          <p className="text-base sm:text-lg text-gray-500">{t.startWriting}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {entries.slice().reverse().map((entry) => (
            <button
              key={entry.id}
              onClick={() => onEditEntry(entry)}
              className="bg-gray-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 active:scale-[0.98] sm:hover:scale-105 text-left h-56 sm:h-60 lg:h-64 flex flex-col border border-gray-700 hover:border-gray-600 touch-manipulation"
            >
              <h3 className="text-lg sm:text-xl lg:text-2xl mb-3 sm:mb-4 text-white font-medium line-clamp-2">{entry.title}</h3>
              <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-4 flex-1">
                {entry.content}
              </p>
              <div className="flex items-center gap-2 text-gray-500">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm truncate">
                  {entry.date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}