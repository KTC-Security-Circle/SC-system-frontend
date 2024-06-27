'use client';
import React,{ useState } from "react";
import { ChatMessage } from "../types/ChatMessage";
import { ChatMessages } from "./elements/ChatMessage";

export const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const userMessage: ChatMessage = {
      id: messages.length,
      text: input,
      isUser: true,
    };

    setMessages([...messages, userMessage]);
    setInput('');

    // ここでボットの応答を生成するロジックを実装します
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: messages.length + 1,
        text: `申し訳ありません。現在、ボットの応答機能は実装されていません。`,
        isUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <ChatMessages key={message.id} message={message} />
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded-l-lg p-2"
            placeholder="メッセージを入力..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
          >
            送信
          </button>
        </div>
      </div>
    </div>
  );
};
