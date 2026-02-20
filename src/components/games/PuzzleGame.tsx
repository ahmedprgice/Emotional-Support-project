import React, { useState, useEffect } from 'react';
import { ChevronLeft, RotateCcw, CheckCircle } from 'lucide-react';
import type { Language } from '../../utils/translations';

interface PuzzleGameProps {
  language: Language;
  onBack: () => void;
}

type Tile = {
  id: number;
  position: number;
  isEmpty: boolean;
};

export function PuzzleGame({ language, onBack }: PuzzleGameProps) {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const initializeGame = () => {
    // Create tiles 0-8, where 8 is the empty space
    let newTiles: Tile[] = Array.from({ length: 9 }, (_, i) => ({
      id: i,
      position: i,
      isEmpty: i === 8
    }));

    // Shuffle the tiles
    for (let i = 0; i < 100; i++) {
      const emptyTile = newTiles.find(t => t.isEmpty)!;
      const emptyPos = emptyTile.position;
      const possibleMoves = getAdjacentPositions(emptyPos);
      const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      const tileToSwap = newTiles.find(t => t.position === randomMove)!;
      
      // Swap positions
      const tempPos = emptyTile.position;
      emptyTile.position = tileToSwap.position;
      tileToSwap.position = tempPos;
    }

    setTiles(newTiles);
    setMoves(0);
    setIsComplete(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    // Check if puzzle is complete
    const complete = tiles.every(tile => tile.id === tile.position);
    if (complete && moves > 0) {
      setIsComplete(true);
    }
  }, [tiles, moves]);

  const getAdjacentPositions = (pos: number): number[] => {
    const adjacent: number[] = [];
    const row = Math.floor(pos / 3);
    const col = pos % 3;

    if (col > 0) adjacent.push(pos - 1); // left
    if (col < 2) adjacent.push(pos + 1); // right
    if (row > 0) adjacent.push(pos - 3); // up
    if (row < 2) adjacent.push(pos + 3); // down

    return adjacent;
  };

  const handleTileClick = (clickedTile: Tile) => {
    if (clickedTile.isEmpty || isComplete) return;

    const emptyTile = tiles.find(t => t.isEmpty)!;
    const adjacentPositions = getAdjacentPositions(emptyTile.position);

    if (adjacentPositions.includes(clickedTile.position)) {
      setTiles(prev => {
        const newTiles = [...prev];
        const empty = newTiles.find(t => t.isEmpty)!;
        const clicked = newTiles.find(t => t.id === clickedTile.id)!;

        // Swap positions
        const tempPos = empty.position;
        empty.position = clicked.position;
        clicked.position = tempPos;

        return newTiles;
      });
      setMoves(m => m + 1);
    }
  };

  const getTileStyle = (position: number) => {
    const row = Math.floor(position / 3);
    const col = position % 3;
    return {
      gridRow: row + 1,
      gridColumn: col + 1
    };
  };

  const getEmojiForTile = (id: number): string => {
    const emojis = ['😊', '😢', '😡', '😰', '🤢', '💛', '💙', '💚'];
    return emojis[id] || '';
  };

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
            {language === 'ar' ? 'أحجية الصور' : 'Picture Puzzle'}
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
      <div className="p-4 sm:p-6 text-center">
        <p className="text-sm sm:text-base text-gray-400">{language === 'ar' ? 'الحركات' : 'Moves'}</p>
        <p className="text-2xl sm:text-3xl text-white">{moves}</p>
      </div>

      {/* Game Board */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="grid grid-cols-3 grid-rows-3 gap-2 w-72 h-72 sm:w-96 sm:h-96 max-w-full">
          {tiles.map((tile) => (
            <button
              key={tile.id}
              onClick={() => handleTileClick(tile)}
              style={getTileStyle(tile.position)}
              className={`rounded-xl sm:rounded-2xl text-4xl sm:text-6xl flex items-center justify-center transition-all duration-200 border-2 ${
                tile.isEmpty
                  ? 'bg-gray-800/50 border-gray-700'
                  : 'bg-gradient-to-br from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 border-green-500 shadow-lg cursor-pointer'
              }`}
            >
              {!tile.isEmpty && getEmojiForTile(tile.id)}
            </button>
          ))}
        </div>
      </div>

      {/* Instructions */}
      {moves === 0 && (
        <div className="p-4 sm:p-6 text-center">
          <p className="text-sm sm:text-base text-gray-400">
            {language === 'ar'
              ? 'اضغط على المربعات لتحريكها في المساحة الفارغة'
              : 'Click tiles to move them into the empty space'}
          </p>
        </div>
      )}

      {/* Win Message */}
      {isComplete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-3xl p-8 sm:p-12 text-center border border-gray-700 max-w-md w-full">
            <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl sm:text-3xl text-white mb-4">
              {language === 'ar' ? 'رائع!' : 'Amazing!'}
            </h3>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8">
              {language === 'ar' ? `حللت اللغز في ${moves} حركة!` : `You solved the puzzle in ${moves} moves!`}
            </p>
            <button
              onClick={initializeGame}
              className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full"
            >
              {language === 'ar' ? 'العب مرة أخرى' : 'Play Again'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}