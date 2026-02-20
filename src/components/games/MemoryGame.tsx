import React, { useState, useEffect } from 'react';
import { ChevronLeft, RotateCcw } from 'lucide-react';
import type { Language } from '../../utils/translations';

interface MemoryGameProps {
  language: Language;
  onBack: () => void;
}

type Card = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export function MemoryGame({ language, onBack }: MemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);

  const emojis = ['😊', '😢', '😡', '😰', '🤢', '💛', '💙', '💚'];

  const initializeGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].emoji === cards[second].emoji) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second
              ? { ...card, isMatched: true }
              : card
          ));
          setMatches(prev => prev + 1);
          setFlippedCards([]);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;
    
    setCards(prev => prev.map(card => 
      card.id === id ? { ...card, isFlipped: true } : card
    ));
    setFlippedCards(prev => [...prev, id]);
    
    if (flippedCards.length === 0) {
      setMoves(m => m + 1);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 max-w-6xl mx-auto">
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
            {language === 'ar' ? 'لعبة الذاكرة' : 'Memory Game'}
          </h2>
          <button
            onClick={initializeGame}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="p-4 sm:p-6 flex justify-center gap-8 sm:gap-12">
        <div className="text-center">
          <p className="text-sm sm:text-base text-gray-400">{language === 'ar' ? 'الحركات' : 'Moves'}</p>
          <p className="text-2xl sm:text-3xl text-white">{moves}</p>
        </div>
        <div className="text-center">
          <p className="text-sm sm:text-base text-gray-400">{language === 'ar' ? 'المطابقات' : 'Matches'}</p>
          <p className="text-2xl sm:text-3xl text-white">{matches}/{emojis.length}</p>
        </div>
      </div>

      {/* Game Board */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
        <div className="grid grid-cols-4 gap-2 sm:gap-3 lg:gap-4 max-w-[min(100%,440px)] w-full">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square rounded-xl sm:rounded-2xl transition-all duration-300 transform ${
                card.isFlipped || card.isMatched
                  ? 'bg-gradient-to-br from-purple-600 to-pink-600 scale-105'
                  : 'bg-gray-800 hover:bg-gray-700 active:scale-95'
              } flex items-center justify-center text-[32px] sm:text-3xl lg:text-4xl border-2 border-gray-700 touch-manipulation`}
              disabled={card.isMatched}
              aria-label={card.isFlipped || card.isMatched ? card.emoji : 'Card face down'}
            >
              {card.isFlipped || card.isMatched ? card.emoji : '?'}
            </button>
          ))}
        </div>
      </div>

      {/* Win Message */}
      {matches === emojis.length && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-3xl p-8 sm:p-12 text-center border border-gray-700 max-w-md w-full">
            <p className="text-4xl sm:text-5xl mb-4">🎉</p>
            <h3 className="text-2xl sm:text-3xl text-white mb-4">
              {language === 'ar' ? 'أحسنت!' : 'Well Done!'}
            </h3>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8">
              {language === 'ar' ? `أكملت اللعبة في ${moves} حركة!` : `You completed the game in ${moves} moves!`}
            </p>
            <button
              onClick={initializeGame}
              className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full"
            >
              {language === 'ar' ? 'العب مرة أخرى' : 'Play Again'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}