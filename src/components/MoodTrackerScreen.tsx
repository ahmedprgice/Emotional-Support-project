import React from 'react';
import { Calendar } from 'lucide-react';
import type { MoodEntry } from '../App';
import { translations, type Language } from '../utils/translations';

interface MoodTrackerScreenProps {
  moodHistory: MoodEntry[];
  onMoodSelect: (mood: MoodEntry) => void;
  language: Language;
}

export function MoodTrackerScreen({ moodHistory, onMoodSelect, language }: MoodTrackerScreenProps) {
  const t = translations[language];
  
  const moods = [
    { emoji: '😊', label: t.happy },
    { emoji: '😢', label: t.sad },
    { emoji: '😡', label: t.angry },
    { emoji: '😰', label: t.anxious },
    { emoji: '😟', label: t.worried },
    { emoji: '😨', label: t.scared },
    { emoji: '😌', label: t.calm },
    { emoji: '😴', label: t.tired }
  ];

  const handleMoodClick = (mood: { emoji: string; label: string }) => {
    onMoodSelect({
      emoji: mood.emoji,
      label: mood.label,
      timestamp: new Date()
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-12 lg:py-12 pt-[88px] sm:pt-24 lg:pt-12 pb-safe">
      {/* Header */}
      <div className="mb-6 sm:mb-8 lg:mb-12">
        <h1 className="text-[28px] leading-tight sm:text-4xl lg:text-5xl mb-2 sm:mb-3 lg:mb-4 text-white font-semibold">{t.howFeelToday}</h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-400">{t.selectMood}</p>
      </div>

      {/* Mood Grid */}
      <div className="grid grid-cols-2 xs:grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 lg:mb-12">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => handleMoodClick(mood)}
            className="aspect-square bg-gray-800 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 active:scale-95 sm:hover:scale-110 flex flex-col items-center justify-center p-3 sm:p-4 lg:p-6 border border-gray-700 hover:border-gray-600 touch-manipulation"
          >
            <div className="text-4xl sm:text-5xl mb-1.5 sm:mb-2 lg:mb-3">{mood.emoji}</div>
            <p className="text-[11px] sm:text-xs lg:text-sm text-gray-400 text-center leading-tight">{mood.label}</p>
          </button>
        ))}
      </div>

      {/* Mood History */}
      <div className="bg-gray-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-lg border border-gray-700">
        <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
          <h3 className="text-xl sm:text-2xl text-white">{t.moodHistory}</h3>
        </div>
        
        {moodHistory.length === 0 ? (
          <p className="text-gray-500 text-center py-8 sm:py-12 text-base sm:text-lg">{t.noMoodEntries}</p>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {moodHistory.slice().reverse().slice(0, 10).map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 sm:p-5 bg-gray-900 rounded-xl sm:rounded-2xl border border-gray-700"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  <div className="text-3xl sm:text-4xl flex-shrink-0">{entry.emoji}</div>
                  <div className="min-w-0 flex-1">
                    <p className="text-base sm:text-lg text-gray-200 truncate">{entry.label}</p>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">
                      {entry.timestamp.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}