import React from 'react';
import { Gamepad2, Brain, Puzzle, Heart, Sparkles, Music } from 'lucide-react';
import { translations, type Language } from '../utils/translations';
import type { Screen } from '../App';

interface GamesScreenProps {
  language: Language;
  onNavigate: (screen: Screen) => void;
}

export function GamesScreen({ language, onNavigate }: GamesScreenProps) {
  const t = translations[language];

  const games = [
    {
      id: 'breathing',
      icon: Heart,
      title: language === 'ar' ? 'تمرين التنفس' : 'Breathing Exercise',
      description: language === 'ar' ? 'تنفس بهدوء وتخلص من التوتر' : 'Calm breathing to reduce stress',
      color: 'from-blue-400 to-cyan-500',
      screen: 'breathing-game' as Screen
    },
    {
      id: 'memory',
      icon: Brain,
      title: language === 'ar' ? 'لعبة الذاكرة' : 'Memory Game',
      description: language === 'ar' ? 'اختبر ذاكرتك مع البطاقات' : 'Test your memory with cards',
      color: 'from-purple-400 to-pink-500',
      screen: 'memory-game' as Screen
    },
    {
      id: 'puzzle',
      icon: Puzzle,
      title: language === 'ar' ? 'أحجية الصور' : 'Picture Puzzle',
      description: language === 'ar' ? 'رتب القطع لتكوين الصورة' : 'Arrange pieces to complete the picture',
      color: 'from-green-400 to-emerald-500',
      screen: 'puzzle-game' as Screen
    },
    {
      id: 'gratitude',
      icon: Sparkles,
      title: language === 'ar' ? 'شكر وامتنان' : 'Gratitude Journal',
      description: language === 'ar' ? 'اكتب ما أنت ممتن له اليوم' : 'Write what you\'re grateful for today',
      color: 'from-yellow-400 to-orange-500',
      screen: 'gratitude-game' as Screen
    },
    {
      id: 'meditation',
      icon: Music,
      title: language === 'ar' ? 'التأمل الموجه' : 'Guided Meditation',
      description: language === 'ar' ? 'استرخِ مع جلسة تأمل هادئة' : 'Relax with a calming meditation',
      color: 'from-indigo-400 to-purple-600',
      screen: 'meditation-game' as Screen
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-12 lg:py-12 pt-[88px] sm:pt-24 lg:pt-12 pb-safe">
      {/* Header */}
      <div className="mb-6 sm:mb-8 lg:mb-12">
        <h1 className="text-[28px] leading-tight sm:text-4xl lg:text-5xl mb-2 sm:mb-3 lg:mb-4 text-white font-semibold">{language === 'ar' ? 'الألعاب والأنشطة' : 'Games & Activities'}</h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-400">{language === 'ar' ? 'أنشطة تفاعلية لتحسين مزاجك' : 'Interactive activities to improve your mood'}</p>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {games.map((game) => {
          const Icon = game.icon;
          return (
            <button
              key={game.id}
              onClick={() => onNavigate(game.screen)}
              className="p-5 sm:p-6 lg:p-8 bg-gray-800 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 active:scale-[0.98] sm:hover:scale-105 text-left border border-gray-700 hover:border-gray-600 min-h-[220px] sm:min-h-[240px] lg:min-h-[280px] flex flex-col group touch-manipulation"
            >
              <div className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 transition-transform group-hover:rotate-6 flex-shrink-0`}>
                <Icon className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl mb-1.5 sm:mb-2 lg:mb-3 text-white leading-tight font-medium">{game.title}</h3>
              <p className="text-[13px] sm:text-sm lg:text-base text-gray-400 leading-relaxed flex-1">{game.description}</p>
              
              {/* Play Button */}
              <div className="mt-3 sm:mt-4">
                <span className="inline-block px-5 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-sm sm:text-base font-medium">
                  {language === 'ar' ? 'العب الآن' : 'Play Now'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="mt-6 sm:mt-8 lg:mt-12 p-5 sm:p-6 lg:p-8 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl sm:rounded-3xl border border-purple-800">
        <div className="flex items-start gap-3 sm:gap-4">
          <Gamepad2 className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl text-white mb-1.5 sm:mb-2 font-medium">
              {language === 'ar' ? 'استمتع بالأنشطة!' : 'Enjoy the Activities!'}
            </h3>
            <p className="text-[13px] sm:text-base lg:text-lg text-purple-200 leading-relaxed">
              {language === 'ar' 
                ? 'هذه الألعاب مصممة لمساعدتك على الاسترخاء وتحسين صحتك النفسية. جربها جميعاً!'
                : 'These games are designed to help you relax and improve your mental wellness. Try them all!'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}