import { Sparkles } from 'lucide-react';

type OnboardingProps = {
  onGetStarted: () => void;
};

export function Onboarding({ onGetStarted }: OnboardingProps) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 min-h-[600px] flex flex-col items-center justify-center text-center">
      <div className="mb-8">
        <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-purple-300 via-pink-300 to-blue-300 rounded-full flex items-center justify-center">
          <Sparkles className="w-16 h-16 text-white" />
        </div>
        <h1 className="text-4xl mb-3 text-gray-800">SafeSpace</h1>
        <p className="text-lg text-gray-600">
          A safe space to talk, feel, and express.
        </p>
      </div>

      <div className="mb-8 space-y-4 text-gray-600">
        <div className="flex items-center justify-center gap-3">
          <span className="text-3xl">💬</span>
          <span>Chat with caring AI personalities</span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <span className="text-3xl">😊</span>
          <span>Track your moods and feelings</span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <span className="text-3xl">📝</span>
          <span>Journal your thoughts privately</span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <span className="text-3xl">🎮</span>
          <span>Relax with calming activities</span>
        </div>
      </div>

      <div className="w-full space-y-3">
        <button
          onClick={onGetStarted}
          className="w-full py-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full hover:opacity-90 transition-opacity shadow-lg"
        >
          Get Started
        </button>
        <button className="w-full py-4 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
          Log In
        </button>
      </div>

      <p className="text-xs text-gray-400 mt-6">
        Your safe space for emotional wellbeing
      </p>
    </div>
  );
}
