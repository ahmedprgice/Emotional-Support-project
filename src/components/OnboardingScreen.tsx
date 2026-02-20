import React from 'react';
import { Sparkles, Heart, Languages } from 'lucide-react';
import { translations, type Language } from '../utils/translations';

interface OnboardingScreenProps {
  onGetStarted: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function OnboardingScreen({ onGetStarted, language, onLanguageChange }: OnboardingScreenProps) {
  const t = translations[language];
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-8 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Language Toggle */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20">
        <button
          onClick={() => onLanguageChange(language === 'en' ? 'ar' : 'en')}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-800 text-gray-300 rounded-full flex items-center gap-2 hover:bg-gray-700 transition-colors border border-gray-700 text-sm sm:text-base touch-manipulation active:scale-95"
        >
          <Languages className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>{language === 'en' ? 'العربية' : 'English'}</span>
        </button>
      </div>

      {/* Illustration */}
      <div className="mb-8 sm:mb-12 relative z-10">
        <div className="w-56 h-56 sm:w-64 sm:h-64 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
          <Heart className="w-28 h-28 sm:w-32 sm:h-32 text-purple-200 animate-pulse" />
        </div>
        <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 z-10">
          <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 drop-shadow-lg" fill="currentColor" />
        </div>
        <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 z-10">
          <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-pink-400 drop-shadow-lg" fill="currentColor" />
        </div>
      </div>

      {/* App name */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold text-center px-4">
        {t.appName}
      </h1>

      {/* Tagline */}
      <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 text-center mb-12 sm:mb-16 max-w-2xl px-6 leading-relaxed">
        {t.tagline}
      </p>

      {/* Buttons */}
      <div className="w-full max-w-md px-6 sm:px-0 space-y-4">
        <button
          onClick={onGetStarted}
          className="w-full py-4 sm:py-5 text-base sm:text-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation font-semibold"
        >
          {t.getStarted}
        </button>
      </div>

      {/* Decorative dots */}
      <div className="flex gap-2 sm:gap-3 mt-10 sm:mt-12">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-purple-500 rounded-full" />
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-pink-500 rounded-full opacity-50" />
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-indigo-500 rounded-full opacity-50" />
      </div>

      {/* Background decorative circles */}
      <div className="absolute top-1/4 -left-24 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl" />
    </div>
  );
}