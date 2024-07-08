'use client';
import React, { useState, useEffect } from "react";
import { ChatMessage } from "../types/ChatMessage";
import { ChatMessages } from "./elements/ChatMessage";

// APIとの通信を行う関数
const fetchMessages = async () => {
  const response = await fetch('https://sc-test-api.azurewebsites.net/demo/messages/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) throw new Error('Failed to fetch messages');
  return response.json();
};

const sendMessageToApi = async (content: string) => {
  const response = await fetch('https://sc-test-api.azurewebsites.net/demo/messages/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  if (!response.ok) throw new Error('Failed to send message');
  return response.json();
};

export const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // コンポーネントマウント時にメッセージを取得
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const fetchedMessages = await fetchMessages();
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Failed to load messages:', error);
      }
    };
    loadMessages();
  }, []);

  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = {
      id: messages.length,
      content: input,
      isUser: true,
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessageToApi(input);
      const botMessage: ChatMessage = {
        id: messages.length + 1,
        content: response.text,
        isUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage: ChatMessage = {
        id: messages.length + 1,
        content: "申し訳ありません。メッセージの送信中にエラーが発生しました。",
        isUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
            type="content"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded-l-lg p-2"
            placeholder="メッセージを入力..."
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            className={`text-white px-4 py-2 rounded-r-lg ${
              isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={isLoading}
          >
            {isLoading ? '送信中...' : '送信'}
          </button>
        </div>
      </div>
    </div>
  );
};
