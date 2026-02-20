import React from 'react';
import { Home, MessageCircle, Heart, BookOpen, FileText, Sparkles, Languages, Gamepad2, X } from 'lucide-react';
import type { Screen } from '../App';
import { translations, type Language } from '../utils/translations';

interface SidebarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ currentScreen, onNavigate, language, onLanguageChange, isOpen = true, onClose }: SidebarProps) {
  const t = translations[language];
  
  const navItems = [
    { icon: Home, label: t.home, screen: 'home' as Screen },
    { icon: MessageCircle, label: t.talkToAI, screen: 'choose-personality' as Screen },
    { icon: Heart, label: t.moodTracker, screen: 'mood-tracker' as Screen },
    { icon: BookOpen, label: t.journal, screen: 'journal' as Screen },
    { icon: Gamepad2, label: t.games, screen: 'games' as Screen },
    { icon: FileText, label: t.privateNotes, screen: 'private-notes' as Screen }
  ];

  const handleNavigate = (screen: Screen) => {
    onNavigate(screen);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && onClose && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 ${language === 'ar' ? 'right-0' : 'left-0'}
        w-full max-w-[280px] sm:w-72 bg-gray-900 border-r border-gray-800 p-4 sm:p-6 flex flex-col z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : language === 'ar' ? 'translate-x-full' : '-translate-x-full'}
        lg:translate-x-0
        safe-top safe-bottom
      `}>
        {/* Close button for mobile */}
{onClose && (
  <button
    onClick={onClose}
    className={`lg:hidden absolute top-4 ${
      language === 'ar' ? 'left-4' : 'right-4'
    } w-11 h-11 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors active:scale-95`}
    aria-label="Close menu"
  >
    <X className="w-5 h-5 text-gray-300" />
  </button>
)}


        {/* Logo */}
        <div className="mb-6 sm:mb-8 flex items-center gap-3 pt-2">
          <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent truncate">
              {t.appName}
            </h1>
            <p className="text-xs text-gray-500 truncate">{language === 'ar' ? 'مساحتك الآمنة' : 'Your safe space'}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1.5 sm:space-y-2 overflow-y-auto -mx-2 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.screen || 
              (item.screen === 'choose-personality' && currentScreen === 'chat');
            
            return (
              <button
                key={item.label}
                onClick={() => handleNavigate(item.screen)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 sm:py-3 rounded-2xl transition-all min-h-[52px] touch-manipulation ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200 active:bg-gray-750'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className={`leading-tight flex-1 text-[15px] sm:text-base ${language === 'ar' ? 'text-right' : 'text-left'}`}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Language Toggle */}
        <button
          onClick={() => onLanguageChange(language === 'en' ? 'ar' : 'en')}
          className="w-full mb-3 sm:mb-4 px-4 py-3.5 bg-gray-800 text-gray-300 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-700 active:bg-gray-750 transition-colors border border-gray-700 min-h-[52px] touch-manipulation"
        >
          <Languages className="w-5 h-5" />
          <span className="text-[15px] sm:text-base">{language === 'en' ? 'العربية' : 'English'}</span>
        </button>


      </aside>
    </>
  );
}