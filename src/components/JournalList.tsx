import { ArrowLeft, Plus, BookOpen } from 'lucide-react';
import type { JournalEntry } from '../App';

type JournalListProps = {
  entries: JournalEntry[];
  onNewEntry: () => void;
  onEditEntry: (id: string) => void;
  onBack: () => void;
};

export function JournalList({ entries, onNewEntry, onEditEntry, onBack }: JournalListProps) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 p-6 text-white">
        <button onClick={onBack} className="mb-4 flex items-center gap-2 text-white/90 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-2xl mb-1">My Journal</h1>
        <p className="text-blue-100">Your private thoughts</p>
      </div>

      {/* Entries List */}
      <div className="flex-1 p-6 overflow-auto">
        {entries.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-2">No journal entries yet</p>
            <p className="text-sm text-gray-400">Start writing your thoughts!</p>
          </div>
        )}
        <div className="space-y-3">
          {[...entries].reverse().map((entry) => (
            <button
              key={entry.id}
              onClick={() => onEditEntry(entry.id)}
              className="w-full bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 text-left hover:shadow-md transition-all border-2 border-transparent hover:border-purple-200"
            >
              <h3 className="text-gray-800 mb-2">{entry.title || 'Untitled Entry'}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{entry.content}</p>
              <p className="text-xs text-gray-400">
                {entry.date.toLocaleDateString()} • {entry.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Floating Add Button */}
      <div className="p-6">
        <button
          onClick={onNewEntry}
          className="w-full py-4 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-full hover:opacity-90 transition-opacity shadow-lg flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Entry</span>
        </button>
      </div>
    </div>
  );
}
