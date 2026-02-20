import React from 'react';
import type { Personality } from '../App';
import { translations, type Language } from '../utils/translations';
import joyImage from 'figma:asset/e7bee319b56ecdd2ca1ea3fdaf2860886bcf166a.png';
import sadnessImage from 'figma:asset/f070c74194b8d01c79ec0360ffd7d4016c03dc3d.png';
import angerImage from 'figma:asset/52513be2802df203aeeff32a5dbf30552a62502a.png';
import fearImage from 'figma:asset/fa644ddad2acd0f775d5330c0db05dd62cfb58ee.png';
import disgustImage from 'figma:asset/ef761098b3009c16e9e5a9e0f7a84e5d21c76c62.png';

interface ChoosePersonalityScreenProps {
  onSelectPersonality: (personality: Personality) => void;
  language: Language;
}

export function ChoosePersonalityScreen({ onSelectPersonality, language }: ChoosePersonalityScreenProps) {
  const t = translations[language];
  
  const personalities: Personality[] = [
    {
      id: 'joy',
      name: t.joy,
      emoji: '😊',
      description: t.joyDescription,
      color: 'from-yellow-300 to-orange-400',
      image: joyImage
    },
    {
      id: 'sadness',
      name: t.sadness,
      emoji: '😢',
      description: t.sadnessDescription,
      color: 'from-blue-400 to-blue-600',
      image: sadnessImage
    },
    {
      id: 'anger',
      name: t.anger,
      emoji: '😡',
      description: t.angerDescription,
      color: 'from-red-500 to-orange-600',
      image: angerImage
    },
    {
      id: 'fear',
      name: t.fear,
      emoji: '😰',
      description: t.fearDescription,
      color: 'from-purple-400 to-purple-600',
      image: fearImage
    },
    {
      id: 'disgust',
      name: t.disgust,
      emoji: '🤢',
      description: t.disgustDescription,
      color: 'from-green-400 to-green-600',
      image: disgustImage
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-12 lg:py-12 pt-[88px] sm:pt-24 lg:pt-12 pb-safe">
      {/* Header */}
      <div className="mb-6 sm:mb-8 lg:mb-12">
        <h1 className="text-[28px] leading-tight sm:text-4xl lg:text-5xl mb-2 sm:mb-3 lg:mb-4 text-white font-semibold">{t.chooseAIFriend}</h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-400">{t.whoToTalkTo}</p>
      </div>

      {/* Personality Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {personalities.map((personality) => (
          <button
            key={personality.id}
            onClick={() => onSelectPersonality(personality)}
            className="bg-gray-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 active:scale-[0.98] sm:hover:scale-105 flex flex-col border border-gray-700 hover:border-gray-600 group touch-manipulation"
          >
            {/* Character Image */}
            <div className={`relative h-64 sm:h-80 lg:h-96 overflow-hidden bg-gradient-to-br ${personality.color} flex items-center justify-center p-6 sm:p-8`}>
              <img
                src={personality.image}
                alt={personality.name}
                className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-2xl"
              />
            </div>
            
            {/* Text Content */}
            <div className="p-5 sm:p-6 text-center">
              <h3 className="text-xl sm:text-2xl mb-2 sm:mb-3 text-white flex items-center justify-center gap-2 font-medium">
                <span>{personality.emoji}</span>
                <span>{personality.name}</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                {personality.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}