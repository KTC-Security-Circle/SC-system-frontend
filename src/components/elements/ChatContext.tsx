'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ChatContextProps {
  message: string;
  setMessage: (message: string) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<string>('');

  return (
    <ChatContext.Provider value={{ message, setMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
