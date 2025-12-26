
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Trash2, Sparkles } from 'lucide-react';
import { getRacingAdvice } from '../services/geminiService';
import { Message } from '../types';
import { useLanguage } from '../context/LanguageContext';

const AISteward: React.FC = () => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: t.stewardGreeting }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await getRacingAdvice(input, language);
    const botMsg: Message = { role: 'model', text: response };
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-160px)] flex flex-col gap-6 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-racing font-black text-white italic tracking-tighter uppercase flex items-center gap-3">
                <Sparkles className="text-red-500" /> {t.aiSteward}
            </h1>
            <p className="text-slate-500 font-medium">{t.stewardDesc}</p>
        </div>
        <button 
            onClick={() => setMessages([{ role: 'model', text: t.stewardGreeting }])}
            className="p-3 text-slate-500 hover:text-red-500 transition-colors"
        >
            <Trash2 size={20} />
        </button>
      </header>

      <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden flex flex-col">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, i) => (
                <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${
                        msg.role === 'user' ? 'bg-red-600' : 'bg-slate-800 border border-slate-700'
                    }`}>
                        {msg.role === 'user' ? <User size={20} className="text-white" /> : <Bot size={20} className="text-red-500" />}
                    </div>
                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user' 
                        ? 'bg-red-600 text-white rounded-tr-none' 
                        : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
                    }`}>
                        {msg.text}
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                        <Bot size={20} className="text-red-500" />
                    </div>
                    <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-700 flex gap-1 items-center">
                        <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-75" />
                        <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-150" />
                    </div>
                </div>
            )}
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950/50">
            <div className="flex gap-4">
                <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={t.askAnything}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-600 transition-all"
                />
                <button 
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:hover:bg-red-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                >
                    <Send size={24} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AISteward;
