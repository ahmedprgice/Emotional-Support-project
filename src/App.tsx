import React, { useState } from 'react';
import { OnboardingScreen } from './components/OnboardingScreen';
import { HomeDashboard } from './components/HomeDashboard';
import { ChoosePersonalityScreen } from './components/ChoosePersonalityScreen';
import { ChatScreen } from './components/ChatScreen';
import { MoodTrackerScreen } from './components/MoodTrackerScreen';
import { JournalScreen } from './components/JournalScreen';
import { JournalEditorScreen } from './components/JournalEditorScreen';
import { PrivateNotesScreen } from './components/PrivateNotesScreen';
import { GamesScreen } from './components/GamesScreen';
import { BreathingGame } from './components/games/BreathingGame';
import { MemoryGame } from './components/games/MemoryGame';
import { PuzzleGame } from './components/games/PuzzleGame';
import { GratitudeGame } from './components/games/GratitudeGame';
import { MeditationGame } from './components/games/MeditationGame';
import { Sidebar } from './components/Sidebar';
import { Menu } from 'lucide-react';
import { sendToBot } from "./utils/chatApi";

export type Screen =
  | 'onboarding'
  | 'home'
  | 'choose-personality'
  | 'chat'
  | 'mood-tracker'
  | 'journal'
  | 'journal-editor'
  | 'private-notes'
  | 'games'
  | 'breathing-game'
  | 'memory-game'
  | 'puzzle-game'
  | 'gratitude-game'
  | 'meditation-game';

export type Personality = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  image?: string;
};

export type JournalEntry = {
  id: string;
  title: string;
  content: string;
  date: Date;
};

export type MoodEntry = {
  emoji: string;
  label: string;
  timestamp: Date;
};

export type ChatMessage = {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
};

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [selectedPersonality, setSelectedPersonality] = useState<Personality | null>(null);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      title: 'My First Day',
      content: 'Today was amazing. I felt so grateful for all the little things in life...',
      date: new Date(2026, 1, 10)
    },
    {
      id: '2',
      title: 'Feeling Grateful',
      content: 'I am thankful for my friends and family who support me...',
      date: new Date(2026, 1, 11)
    }
  ]);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handlePersonalitySelect = (personality: Personality) => {
    setSelectedPersonality(personality);
    setChatMessages([]);
    navigate('chat');
  };

  const handleSaveJournal = (entry: JournalEntry) => {
    if (editingEntry) {
      setJournalEntries(prev => prev.map(e => e.id === entry.id ? entry : e));
    } else {
      setJournalEntries(prev => [...prev, entry]);
    }
    setEditingEntry(null);
    navigate('journal');
  };

  const handleMoodSelect = (mood: MoodEntry) => {
    setMoodHistory(prev => [...prev, mood]);
  };
  const handleSendMessage = async (text: string) => {
    if (!selectedPersonality) return;

    // 1️⃣ Add user message to UI
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);

    try {
      // 2️⃣ Send message to Groq AI
      const reply = await sendToBot(
        selectedPersonality.id as any,
        text
      );

      // 3️⃣ Add AI reply to UI
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: reply,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      // 4️⃣ Show error if backend not running
      const errorMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        sender: 'ai',
        text: "⚠️ AI server not running. Start backend/server.js",
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, errorMessage]);
    }
  };




  const showSidebar = currentScreen !== 'onboarding';
  // ⭐ controls when mobile hamburger button appears
  const showFloatingMenu =
    currentScreen === 'home' ||
    currentScreen === 'choose-personality' ||
    currentScreen === 'mood-tracker' ||
    currentScreen === 'journal' ||
    currentScreen === 'private-notes' ||
    currentScreen === 'games';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {currentScreen === 'onboarding' ? (
        <OnboardingScreen onGetStarted={() => navigate('home')} language={language} onLanguageChange={setLanguage} />
      ) : (
        <div className="flex h-screen">
          <Sidebar
            currentScreen={currentScreen}
            onNavigate={navigate}
            language={language}
            onLanguageChange={setLanguage}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <main className="flex-1 overflow-y-auto relative">
            {/* Mobile Menu Button */}
            {showFloatingMenu && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden fixed top-4 z-30 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center shadow-lg border border-gray-700 active:scale-95 transition-transform touch-manipulation"
                style={{ [language === 'ar' ? 'right' : 'left']: '1rem' }}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 text-gray-300" />
              </button>
            )}





            {currentScreen === 'home' && (
              <HomeDashboard onNavigate={navigate} language={language} />
            )}
            {currentScreen === 'choose-personality' && (
              <ChoosePersonalityScreen onSelectPersonality={handlePersonalitySelect} language={language} />
            )}
            {currentScreen === 'chat' && selectedPersonality && (
              <ChatScreen
                personality={selectedPersonality}
                messages={chatMessages}
                onSendMessage={handleSendMessage}
                onBack={() => navigate('choose-personality')}
                language={language}
              />
            )}
            {currentScreen === 'mood-tracker' && (
              <MoodTrackerScreen
                moodHistory={moodHistory}
                onMoodSelect={handleMoodSelect}
                language={language}
              />
            )}
            {currentScreen === 'journal' && (
              <JournalScreen
                entries={journalEntries}
                onNewEntry={() => {
                  setEditingEntry(null);
                  navigate('journal-editor');
                }}
                onEditEntry={(entry) => {
                  setEditingEntry(entry);
                  navigate('journal-editor');
                }}
                language={language}
              />
            )}
            {currentScreen === 'journal-editor' && (
              <JournalEditorScreen
                entry={editingEntry}
                onSave={handleSaveJournal}
                onCancel={() => navigate('journal')}
                language={language}
              />
            )}
            {currentScreen === 'private-notes' && (
              <PrivateNotesScreen language={language} />
            )}
            {currentScreen === 'games' && (
              <GamesScreen language={language} onNavigate={navigate} />
            )}
            {currentScreen === 'breathing-game' && (
              <BreathingGame language={language} onBack={() => navigate('games')} />
            )}
            {currentScreen === 'memory-game' && (
              <MemoryGame language={language} onBack={() => navigate('games')} />
            )}
            {currentScreen === 'puzzle-game' && (
              <PuzzleGame language={language} onBack={() => navigate('games')} />
            )}
            {currentScreen === 'gratitude-game' && (
              <GratitudeGame language={language} onBack={() => navigate('games')} />
            )}
            {currentScreen === 'meditation-game' && (
              <MeditationGame language={language} onBack={() => navigate('games')} />
            )}
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
