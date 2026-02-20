import React, { useState, useEffect } from 'react';
import { ChevronLeft, Play, Pause } from 'lucide-react';
import type { Language } from '../../utils/translations';
import type { Screen } from '../../App';

interface BreathingGameProps {
  language: Language;
  onBack: () => void;
}

export function BreathingGame({ language, onBack }: BreathingGameProps) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [countdown, setCountdown] = useState(4);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) return prev - 1;
        
        // Move to next phase
        if (phase === 'inhale') {
          setPhase('hold');
          return 4;
        } else if (phase === 'hold') {
          setPhase('exhale');
          return 6;
        } else {
          setPhase('inhale');
          setCycles(c => c + 1);
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, phase]);

  const getPhaseText = () => {
    if (language === 'ar') {
      return {
        inhale: 'تنفس بعمق',
        hold: 'احبس أنفاسك',
        exhale: 'أخرج الزفير'
      }[phase];
    }
    return {
      inhale: 'Breathe In',
      hold: 'Hold',
      exhale: 'Breathe Out'
    }[phase];
  };

  const getCircleScale = () => {
    if (phase === 'inhale') return 'scale-150';
    if (phase === 'hold') return 'scale-150';
    return 'scale-100';
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 max-w-5xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-800 flex-shrink-0">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors active:scale-95 touch-manipulation"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
          </button>
          <h2 className="text-base sm:text-lg lg:text-2xl text-white font-medium">
            {language === 'ar' ? 'تمرين التنفس' : 'Breathing Exercise'}
          </h2>
          <div className="w-11 sm:w-12" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 overflow-y-auto">
        {/* Breathing Circle */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 mb-6 sm:mb-8 lg:mb-12 flex-shrink-0">
          <div 
            className={`absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 transition-transform duration-[${phase === 'exhale' ? '6000' : '4000'}] ${getCircleScale()} opacity-30`}
          />
          <div 
            className={`absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 transition-transform duration-[${phase === 'exhale' ? '6000' : '4000'}] ${getCircleScale()} flex items-center justify-center`}
          >
            <div className="text-center">
              <p className="text-4xl sm:text-5xl lg:text-6xl text-white mb-2 sm:mb-3 lg:mb-4 font-bold">{countdown}</p>
              <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 font-medium">{getPhaseText()}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="text-center mb-5 sm:mb-6 lg:mb-8">
          <p className="text-sm sm:text-base lg:text-lg text-gray-400">
            {language === 'ar' ? 'عدد الدورات المكتملة' : 'Cycles Completed'}
          </p>
          <p className="text-2xl sm:text-3xl lg:text-4xl text-white mt-2 font-bold">{cycles}</p>
        </div>

        {/* Controls */}
        <button
          onClick={() => setIsActive(!isActive)}
          className="px-8 sm:px-10 lg:px-12 py-3 sm:py-3.5 lg:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full text-base sm:text-lg lg:text-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 sm:gap-3 active:scale-95 touch-manipulation font-medium"
        >
          {isActive ? (
            <>
              <Pause className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              {language === 'ar' ? 'إيقاف مؤقت' : 'Pause'}
            </>
          ) : (
            <>
              <Play className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              {language === 'ar' ? 'بدء' : 'Start'}
            </>
          )}
        </button>

        {/* Instructions */}
        {!isActive && cycles === 0 && (
          <div className="mt-6 sm:mt-8 lg:mt-12 max-w-md text-center px-4">
            <p className="text-[13px] sm:text-sm lg:text-base text-gray-400 leading-relaxed">
              {language === 'ar'
                ? 'اضغط على زر البدء واتبع التعليمات. تنفس بعمق لمدة 4 ثوانٍ، احبس أنفاسك لمدة 4 ثوانٍ، ثم أخرج الزفير لمدة 6 ثوانٍ.'
                : 'Press start and follow the instructions. Breathe in for 4 seconds, hold for 4 seconds, then breathe out for 6 seconds.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}