import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Send, Mic } from 'lucide-react';
import type { Personality, ChatMessage } from '../App';
import { translations, type Language } from '../utils/translations';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { sendToBot, type Persona } from "../utils/chatApi";

export function ChatScreen({
  personality,
  messages,
  onSendMessage,
  onBack,
  language,
  isTyping
}: ChatScreenProps)


export function ChatScreen({ personality, messages, onSendMessage, onBack, language }: ChatScreenProps) {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

const handleSend = async () => {
  if (!inputText.trim()) return;

  await onSendMessage(inputText);   // <-- make it async
  setInputText('');
};


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#0f1419] max-w-5xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-800/50 flex-shrink-0 bg-[#0f1419]">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800/50 flex items-center justify-center hover:bg-gray-700/50 transition-colors flex-shrink-0 active:scale-95 touch-manipulation"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
          </button>
          
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            {personality.image ? (
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-gray-700/50 bg-gray-800/50 flex-shrink-0">
                <img
                  src={personality.image}
                  alt={personality.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br ${personality.color} flex items-center justify-center text-2xl sm:text-3xl border-2 border-gray-700/50 flex-shrink-0`}>
                {personality.emoji}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl lg:text-2xl text-white font-medium truncate">{personality.name}</h2>
              <p className="text-xs sm:text-sm text-gray-400 truncate">{personality.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 bg-[#0f1419]">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-16 sm:mt-24 lg:mt-32 px-4">
            <div className="text-6xl sm:text-7xl lg:text-8xl mb-4 sm:mb-6">{personality.emoji}</div>
            <p className="text-xl sm:text-2xl mb-3 sm:mb-4 text-gray-400">{t.startConversation}</p>
            <p className="text-base sm:text-lg text-gray-500">{personality.description}</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] lg:max-w-[70%] rounded-2xl sm:rounded-3xl px-4 sm:px-5 lg:px-6 py-3 sm:py-4 ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-[#1a2332] text-gray-200 border border-gray-700/50 shadow-md'
              }`}
            >
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed break-words">{message.text}</p>
              <p className={`text-[10px] sm:text-xs mt-1.5 sm:mt-2 ${message.sender === 'user' ? 'text-purple-200/80' : 'text-gray-500'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-4 sm:p-5 lg:p-6 bg-[#0f1419] border-t border-gray-800/50 flex-shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 max-w-4xl mx-auto">
          <div className="flex-1 bg-[#1a2332] rounded-full px-4 sm:px-5 lg:px-6 py-3 sm:py-3.5 lg:py-4 flex items-center gap-2 sm:gap-3 border border-gray-700/30 shadow-lg">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t.typeMessage}
              className="flex-1 bg-transparent outline-none text-sm sm:text-base lg:text-lg text-gray-200 placeholder-gray-500"
            />
            <button 
              className="text-gray-500 hover:text-gray-400 transition-colors flex-shrink-0 active:scale-95 touch-manipulation p-1"
              aria-label="Voice input"
            >
              <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all flex-shrink-0 active:scale-95 touch-manipulation ${
              inputText.trim()
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/30'
                : 'bg-gray-800/50 text-gray-600'
            }`}
            aria-label="Send message"
          >
            <Send className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}