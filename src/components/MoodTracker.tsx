import { ArrowLeft } from 'lucide-react';
import type { MoodEntry } from '../App';

type MoodTrackerProps = {
  moodHistory: MoodEntry[];
  onMoodSelect: (emoji: string, mood: string) => void;
  onBack: () => void;
};

export function MoodTracker({ moodHistory, onMoodSelect, onBack }: MoodTrackerProps) {
  const moods = [
    { emoji: '😊', label: 'Happy', color: 'bg-yellow-100 hover:bg-yellow-200' },
    { emoji: '😢', label: 'Sad', color: 'bg-blue-100 hover:bg-blue-200' },
    { emoji: '😡', label: 'Angry', color: 'bg-red-100 hover:bg-red-200' },
    { emoji: '😰', label: 'Anxious', color: 'bg-purple-100 hover:bg-purple-200' },
    { emoji: '😟', label: 'Worried', color: 'bg-orange-100 hover:bg-orange-200' },
    { emoji: '😨', label: 'Scared', color: 'bg-indigo-100 hover:bg-indigo-200' },
    { emoji: '😌', label: 'Calm', color: 'bg-green-100 hover:bg-green-200' },
    { emoji: '😴', label: 'Tired', color: 'bg-gray-100 hover:bg-gray-200' },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 p-6 text-white">
        <button onClick={onBack} className="mb-4 flex items-center gap-2 text-white/90 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-2xl mb-1">How do you feel today?</h1>
        <p className="text-purple-100">Track your emotions</p>
      </div>

      {/* Mood Grid */}
      <div className="p-6">
        <div className="grid grid-cols-4 gap-3 mb-8">
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => onMoodSelect(mood.emoji, mood.label)}
              className={`aspect-square rounded-2xl ${mood.color} flex flex-col items-center justify-center gap-1 transition-all hover:scale-105`}
            >
              <span className="text-3xl">{mood.emoji}</span>
              <span className="text-xs text-gray-600">{mood.label}</span>
            </button>
          ))}
        </div>

        {/* Mood History */}
        <div>
          <h3 className="text-gray-800 mb-3">Recent Moods</h3>
          <div className="space-y-2 max-h-64 overflow-auto">
            {moodHistory.length === 0 && (
              <p className="text-center text-gray-400 py-8">No moods logged yet. Tap an emoji above!</p>
            )}
            {[...moodHistory].reverse().map((entry) => (
              <div
                key={entry.id}
                className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{entry.emoji}</span>
                  <div>
                    <p className="text-gray-800">{entry.mood}</p>
                    <p className="text-sm text-gray-500">
                      {entry.date.toLocaleDateString()} at {entry.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
