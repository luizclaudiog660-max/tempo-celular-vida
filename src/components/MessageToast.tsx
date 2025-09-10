"use client";

import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MessageToastProps {
  onHighlightTrades: () => void;
}

export default function MessageToast({ onHighlightTrades }: MessageToastProps) {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Mostrar toast após 3 segundos
    const timer = setTimeout(() => {
      const randomMessage = t.toastMessages[Math.floor(Math.random() * t.toastMessages.length)];
      setMessage(randomMessage);
      setShow(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [t.toastMessages]);

  useEffect(() => {
    // Auto-hide após 8 segundos
    if (show) {
      const hideTimer = setTimeout(() => {
        setShow(false);
      }, 8000);

      return () => clearTimeout(hideTimer);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 animate-in slide-in-from-bottom-2 duration-300">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-2xl shadow-2xl max-w-md mx-auto">
        <div className="flex items-start gap-3">
          <div className="text-2xl">⏰</div>
          <div className="flex-1">
            <p className="font-semibold text-sm leading-relaxed mb-3">{message}</p>
            <button
              onClick={() => {
                onHighlightTrades();
                setShow(false);
              }}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Zap className="w-4 h-4" />
              {t.tradeNowButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}