import React, { useState, useEffect } from 'react';
import { ChevronLeft, Play, Pause, SkipForward, Volume2 } from 'lucide-react';
import type { Language } from '../../utils/translations';

interface MeditationGameProps {
  language: Language;
  onBack: () => void;
}

type MeditationSession = {
  id: string;
  title: string;
  titleAr: string;
  duration: number; // in seconds
  description: string;
  descriptionAr: string;
  color: string;
};

export function MeditationGame({ language, onBack }: MeditationGameProps) {
  const sessions: MeditationSession[] = [
    {
      id: '1',
      title: 'Deep Relaxation',
      titleAr: 'استرخاء عميق',
      duration: 300,
      description: 'Release tension and find peace',
      descriptionAr: 'تخلص من التوتر واعثر على السلام',
      color: 'from-blue-600 to-indigo-600'
    },
    {
      id: '2',
      title: 'Calm Mind',
      titleAr: 'عقل هادئ',
      duration: 600,
      description: 'Clear your thoughts and find clarity',
      descriptionAr: 'نظف أفكارك واعثر على الوضوح',
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: '3',
      title: 'Inner Peace',
      titleAr: 'سلام داخلي',
      duration: 900,
      description: 'Connect with your inner self',
      descriptionAr: 'تواصل مع ذاتك الداخلية',
      color: 'from-indigo-600 to-purple-600'
    }
  ];

  const [selectedSession, setSelectedSession] = useState<MeditationSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [phase, setPhase] = useState<'intro' | 'meditation' | 'complete'>('intro');

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsPlaying(false);
            setPhase('complete');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, timeLeft]);

  const startSession = (session: MeditationSession) => {
    setSelectedSession(session);
    setTimeLeft(session.duration);
    setPhase('meditation');
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const skipSession = () => {
    setIsPlaying(false);
    setPhase('complete');
  };

  const resetSession = () => {
    setSelectedSession(null);
    setIsPlaying(false);
    setPhase('intro');
    setTimeLeft(0);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    if (!selectedSession) return 0;
    return ((selectedSession.duration - timeLeft) / selectedSession.duration) * 100;
  };

  const getMeditationPrompts = () => {
    const prompts = {
      en: [
        'Focus on your breath...',
        'Let your thoughts flow...',
        'Feel the calm within you...',
        'Release all tension...',
        'You are at peace...'
      ],
      ar: [
        'ركز على أنفاسك...',
        'دع أفكارك تتدفق...',
        'اشعر بالهدوء بداخلك...',
        'تخلص من كل التوتر...',
        'أنت في سلام...'
      ]
    };

    const promptIndex = Math.floor((getProgress() / 100) * prompts[language].length);
    return prompts[language][Math.min(promptIndex, prompts[language].length - 1)];
  };

  if (phase === 'intro') {
    return (
      <div className="h-screen flex flex-col bg-gray-900 max-w-5xl mx-auto">
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
              {language === 'ar' ? 'التأمل الموجه' : 'Guided Meditation'}
            </h2>
            <div className="w-10 sm:w-12" />
          </div>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <p className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8 text-center">
            {language === 'ar' ? 'اختر جلسة تأمل' : 'Choose a meditation session'}
          </p>
          <div className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
            {sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => startSession(session)}
                className={`w-full p-5 sm:p-6 bg-gradient-to-r ${session.color} rounded-3xl shadow-lg hover:shadow-xl transition-all text-left group`}
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h3 className="text-xl sm:text-2xl text-white">
                    {language === 'ar' ? session.titleAr : session.title}
                  </h3>
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm sm:text-base text-white/80 mb-2 sm:mb-3">
                  {language === 'ar' ? session.descriptionAr : session.description}
                </p>
                <p className="text-sm sm:text-base text-white/60">
                  {formatTime(session.duration)} {language === 'ar' ? 'دقيقة' : 'minutes'}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="p-6 sm:p-8 border-t border-gray-800 bg-gray-800/50">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              {language === 'ar'
                ? 'اعثر على مكان هادئ، أغلق عينيك، وتنفس بعمق. دع التأمل الموجه يأخذك في رحلة من الاسترخاء والسلام الداخلي.'
                : 'Find a quiet place, close your eyes, and breathe deeply. Let the guided meditation take you on a journey of relaxation and inner peace.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'complete') {
    return (
      <div className="h-screen flex flex-col bg-gray-900 max-w-5xl mx-auto">
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <div className="text-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
              <span className="text-5xl sm:text-6xl">🧘</span>
            </div>
            <h3 className="text-3xl sm:text-4xl text-white mb-4">
              {language === 'ar' ? 'رائع!' : 'Well Done!'}
            </h3>
            <p className="text-lg sm:text-xl text-gray-400 mb-6 sm:mb-8">
              {language === 'ar'
                ? 'لقد أكملت جلسة التأمل'
                : 'You completed the meditation session'}
            </p>
            <p className="text-base sm:text-lg text-gray-500 mb-8 sm:mb-12">
              {language === 'ar'
                ? 'خذ لحظة للاستمتاع بهذا الشعور بالسلام'
                : 'Take a moment to enjoy this feeling of peace'}
            </p>
            <button
              onClick={resetSession}
              className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-base sm:text-lg"
            >
              {language === 'ar' ? 'العودة للجلسات' : 'Back to Sessions'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900 max-w-5xl mx-auto">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <button
            onClick={resetSession}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
          </button>
          <h2 className="text-base sm:text-xl text-white">
            {selectedSession && (language === 'ar' ? selectedSession.titleAr : selectedSession.title)}
          </h2>
          <button
            onClick={skipSession}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
          >
            <SkipForward className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
          </button>
        </div>
      </div>

      {/* Meditation Visual */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
        {/* Animated Circle */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 mb-8 sm:mb-12">
          <div 
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${selectedSession?.color} opacity-20 animate-pulse`}
            style={{ animationDuration: '4s' }}
          />
          <div 
            className={`absolute inset-4 rounded-full bg-gradient-to-br ${selectedSession?.color} opacity-40 animate-pulse`}
            style={{ animationDuration: '3s' }}
          />
          <div 
            className={`absolute inset-8 rounded-full bg-gradient-to-br ${selectedSession?.color} flex items-center justify-center animate-pulse`}
            style={{ animationDuration: '2s' }}
          >
            <span className="text-7xl sm:text-8xl">🧘</span>
          </div>
        </div>

        {/* Meditation Prompt */}
        <p className="text-xl sm:text-2xl text-white mb-6 sm:mb-8 text-center animate-pulse px-4">
          {getMeditationPrompts()}
        </p>

        {/* Timer */}
        <p className="text-5xl sm:text-6xl text-white mb-3 sm:mb-4">{formatTime(timeLeft)}</p>

        {/* Progress Bar */}
        <div className="w-full max-w-md h-2 bg-gray-800 rounded-full mb-6 sm:mb-8 mx-4">
          <div
            className={`h-full bg-gradient-to-r ${selectedSession?.color} rounded-full transition-all duration-1000`}
            style={{ width: `${getProgress()}%` }}
          />
        </div>

        {/* Controls */}
        <button
          onClick={togglePlayPause}
          className={`px-10 sm:px-12 py-3 sm:py-4 bg-gradient-to-r ${selectedSession?.color} text-white rounded-full text-lg sm:text-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
              {language === 'ar' ? 'إيقاف مؤقت' : 'Pause'}
            </>
          ) : (
            <>
              <Play className="w-5 h-5 sm:w-6 sm:h-6" />
              {language === 'ar' ? 'استئناف' : 'Resume'}
            </>
          )}
        </button>
      </div>

      {/* Sound Indicator */}
      <div className="p-4 sm:p-6 border-t border-gray-800 flex items-center justify-center gap-2 text-gray-500">
        <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-xs sm:text-sm">
          {language === 'ar' ? 'الصوت المحيطي قيد التشغيل' : 'Ambient sound playing'}
        </span>
      </div>
    </div>
  );
}