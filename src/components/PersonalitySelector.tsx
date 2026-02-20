import { ArrowLeft, Check } from 'lucide-react';
import type { Personality } from '../App';

type PersonalitySelectorProps = {
  onSelect: (personality: Personality) => void;
  onBack: () => void;
};

export function PersonalitySelector({ onSelect, onBack }: PersonalitySelectorProps) {
  const personalities: Personality[] = [
    {
      id: 'happy',
      name: 'Happy',
      emoji: '😊',
      description: 'Positive & cheerful vibes',
      color: 'from-yellow-300 to-orange-300',
    },
    {
      id: 'sad',
      name: 'Sad',
      emoji: '😢',
      description: 'Empathetic & understanding',
      color: 'from-blue-300 to-blue-400',
    },
    {
      id: 'calm',
      name: 'Calm',
      emoji: '😌',
      description: 'Gentle & supportive',
      color: 'from-green-300 to-teal-300',
    },
    {
      id: 'anxious',
      name: 'Anxious',
      emoji: '😰',
      description: 'Relatable & soft',
      color: 'from-purple-300 to-purple-400',
    },
    {
      id: 'angry',
      name: 'Angry',
      emoji: '😡',
      description: 'Honest & direct',
      color: 'from-red-300 to-pink-400',
    },
    {
      id: 'motivational',
      name: 'Motivational',
      emoji: '💪',
      description: 'Encouraging & uplifting',
      color: 'from-pink-300 to-purple-400',
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 p-6 text-white">
        <button onClick={onBack} className="mb-4 flex items-center gap-2 text-white/90 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-2xl mb-1">Choose Your Companion</h1>
        <p className="text-purple-100">Who would you like to talk to?</p>
      </div>

      {/* Personality Cards */}
      <div className="flex-1 p-6 space-y-4 overflow-auto">
        {personalities.map((personality) => (
          <button
            key={personality.id}
            onClick={() => onSelect(personality)}
            className="w-full bg-white border-2 border-gray-100 rounded-2xl p-5 hover:border-purple-200 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${personality.color} flex items-center justify-center text-3xl flex-shrink-0`}>
                {personality.emoji}
              </div>
              <div className="text-left flex-1">
                <h3 className="text-gray-800 mb-1">{personality.name}</h3>
                <p className="text-sm text-gray-500">{personality.description}</p>
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center group-hover:border-purple-400 group-hover:bg-purple-400 transition-colors">
                <Check className="w-5 h-5 text-white opacity-0 group-hover:opacity-100" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
