import React, { useState } from 'react';
import { ChevronLeft, Plus, Heart, Trash2 } from 'lucide-react';
import type { Language } from '../../utils/translations';

interface GratitudeGameProps {
  language: Language;
  onBack: () => void;
}

type GratitudeEntry = {
  id: string;
  text: string;
  date: Date;
};

export function GratitudeGame({ language, onBack }: GratitudeGameProps) {
  const [entries, setEntries] = useState<GratitudeEntry[]>([
    {
      id: '1',
      text: language === 'ar' ? 'عائلتي وأصدقائي' : 'My family and friends',
      date: new Date(2026, 1, 11)
    },
    {
      id: '2',
      text: language === 'ar' ? 'صحتي الجيدة' : 'My good health',
      date: new Date(2026, 1, 11)
    }
  ]);
  const [newEntry, setNewEntry] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddEntry = () => {
    if (newEntry.trim()) {
      const entry: GratitudeEntry = {
        id: Date.now().toString(),
        text: newEntry.trim(),
        date: new Date()
      };
      setEntries(prev => [entry, ...prev]);
      setNewEntry('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const todayCount = entries.filter(e => {
    const today = new Date();
    return e.date.toDateString() === today.toDateString();
  }).length;

  return (
    <div className="h-screen flex flex-col bg-gray-900 max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
          </button>
          <h2 className="text-lg sm:text-2xl text-white">
            {language === 'ar' ? 'شكر وامتنان' : 'Gratitude Journal'}
          </h2>
          <div className="w-10 sm:w-12" />
        </div>
      </div>

      {/* Today's Count */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-b border-yellow-800/50">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
          <p className="text-base sm:text-lg text-yellow-200">
            {language === 'ar'
              ? `${todayCount} أشياء ممتن لها اليوم`
              : `${todayCount} things you're grateful for today`}
          </p>
        </div>
      </div>

      {/* Add New Entry */}
      <div className="p-4 sm:p-6 border-b border-gray-800">
        <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">
          {language === 'ar' ? 'ما الذي تشعر بالامتنان له اليوم؟' : 'What are you grateful for today?'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddEntry()}
            placeholder={language === 'ar' ? 'اكتب شيئاً تشعر بالامتنان له...' : 'Type something you\'re grateful for...'}
            className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-2xl border border-gray-700 focus:border-yellow-600 focus:outline-none text-sm sm:text-base"
          />
          <button
            onClick={handleAddEntry}
            className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-2xl hover:from-yellow-500 hover:to-orange-500 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Plus className="w-5 h-5" />
            {language === 'ar' ? 'إضافة' : 'Add'}
          </button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mt-4 p-3 bg-green-900/50 border border-green-700 rounded-xl text-green-300 text-center text-sm sm:text-base">
            {language === 'ar' ? '✨ تمت الإضافة بنجاح!' : '✨ Added successfully!'}
          </div>
        )}
      </div>

      {/* Entries List */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {entries.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-base sm:text-lg text-gray-500">
              {language === 'ar' ? 'لا توجد إدخالات بعد' : 'No entries yet'}
            </p>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              {language === 'ar' ? 'ابدأ بإضافة ما أنت ممتن له!' : 'Start adding what you\'re grateful for!'}
            </p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="p-4 bg-gray-800 rounded-2xl border border-gray-700 hover:border-yellow-700 transition-colors group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" fill="currentColor" />
                      <span className="text-xs sm:text-sm text-gray-400">{formatDate(entry.date)}</span>
                    </div>
                    <p className="text-white text-base sm:text-lg leading-relaxed">{entry.text}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-700 rounded-lg flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quote */}
      <div className="p-4 sm:p-6 border-t border-gray-800 bg-gray-800/50">
        <p className="text-center text-sm sm:text-base text-gray-400 italic">
          {language === 'ar'
            ? '"الامتنان يحول ما لدينا إلى ما يكفي"'
            : '"Gratitude turns what we have into enough"'}
        </p>
      </div>
    </div>
  );
}