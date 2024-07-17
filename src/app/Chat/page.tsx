import React from 'react';
import  ChatBot  from '@/components/ChatBot';
import Link from 'next/link';

const ChatPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        ← メインページに戻る
      </Link>
      <h1 className="text-3xl font-bold text-center my-8">学校用チャットボット</h1>
      <ChatBot />
    </div>
  );
};

export default ChatPage;
