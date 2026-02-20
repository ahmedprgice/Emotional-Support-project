import React from 'react';
import { MessageCircle, Heart, BookOpen, FileText, Gamepad2 } from 'lucide-react';
import type { Screen } from '../App';
import { translations, type Language } from '../utils/translations';

interface HomeDashboardProps {
  onNavigate: (screen: Screen) => void;
  language: Language;
}

export function HomeDashboard({ onNavigate, language }: HomeDashboardProps) {
  const t = translations[language];

  const cards = [
    {
      icon: MessageCircle,
      title: t.talkToAI,
      description: t.chatWithFriend,
      color: 'from-purple-400 to-purple-500',
      screen: 'choose-personality' as Screen
    },
    {
      icon: Heart,
      title: t.moodTracker,
      description: t.trackFeeling,
      color: 'from-pink-400 to-pink-500',
      screen: 'mood-tracker' as Screen
    },
    {
      icon: BookOpen,
      title: t.journal,
      description: t.writeThoughts,
      color: 'from-blue-400 to-blue-500',
      screen: 'journal' as Screen
    },
    {
      icon: Gamepad2,
      title: language === 'ar' ? 'الألعاب' : 'Games',
      description: language === 'ar'
        ? 'أنشطة للاسترخاء وتحسين المزاج'
        : 'Relaxing activities & mini games',
      color: 'from-indigo-400 to-purple-500',
      screen: 'games' as Screen
    },
    {
      icon: FileText,
      title: t.privateNotes,
      description: t.spaceForYou,
      color: 'from-indigo-400 to-indigo-500',
      screen: 'private-notes' as Screen
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-12 lg:py-12 pt-[88px] sm:pt-24 lg:pt-12 pb-safe">
      
      {/* Header */}
      <div className={`mb-6 sm:mb-8 lg:mb-12 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <h1 className="text-[28px] leading-tight sm:text-4xl lg:text-5xl mb-2 sm:mb-3 lg:mb-4 text-white font-semibold">
          {t.welcomeBack}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-400">
          {t.howAreYouFeeling}
        </p>
      </div>

      {/* Cards Grid (keep normal direction so layout matches English) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 max-w-5xl mx-auto">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <button
              key={card.title}
              onClick={() => onNavigate(card.screen)}
              className={`
                w-full
                p-5 sm:p-6 lg:p-8 
                bg-gray-800 
                rounded-2xl sm:rounded-3xl 
                shadow-lg hover:shadow-2xl 
                transition-all duration-300 
                active:scale-[0.98] sm:hover:scale-105 
                ${language === 'ar' ? 'text-right' : 'text-left'}
                border border-gray-700 hover:border-gray-600 
                min-h-[160px] sm:min-h-[180px] lg:min-h-[220px] 
                flex flex-col group touch-manipulation
              `}
            >
              {/* Icon */}
              <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 transition-transform group-hover:rotate-6 flex-shrink-0`}>
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl lg:text-2xl mb-1.5 sm:mb-2 lg:mb-3 text-white leading-tight font-medium">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-[13px] sm:text-sm lg:text-base text-gray-400 leading-relaxed">
                {card.description}
              </p>
            </button>
          );
        })}
      </div>

    </div>
  );
}
