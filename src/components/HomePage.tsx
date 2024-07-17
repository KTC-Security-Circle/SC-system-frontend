'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useChat } from '../components/elements/ChatContext';

interface FunctionCardProps {
  title: string;
  description: string;
  link: string;
  icon: string;
}

const FunctionCard: React.FC<FunctionCardProps> = ({ title, description, link, icon }) => {
  return (
    <Link href={link} className="block">
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="text-6xl mb-4 text-center">{icon}</div>
        <h2 className="text-2xl font-semibold mb-2 text-center">{title}</h2>
        <p className="text-gray-700 text-center">{description}</p>
      </div>
    </Link>
  );
};

export const HomePage: React.FC = () => {
  const { message, setMessage } = useChat();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/Chat'); // チャットページに遷移
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold text-center mb-12">学校総合サポートシステム</h1>

      <form onSubmit={handleSubmit} className="mb-8 text-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 border border-gray-300 rounded mr-2"
          placeholder="チャット入力"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          チャット送信
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <FunctionCard
          title="チャットボット"
          description="学校に関する質問にお答えします"
          link="/Chat/ChatBot"
          icon="💬"
        />
        <FunctionCard
          title="時間割"
          description="授業スケジュールを確認"
          link="/schedule"
          icon="📅"
        />
        <FunctionCard
          title="お知らせ"
          description="学校からの最新情報"
          link="/news"
          icon="📢"
        />
        <FunctionCard
          title="成績管理"
          description="成績の確認と管理"
          link="/grades"
          icon="📊"
        />
        <FunctionCard
          title="図書館"
          description="蔵書検索と予約"
          link="/library"
          icon="📚"
        />
        <FunctionCard
          title="施設予約"
          description="教室や設備の予約"
          link="/facilities"
          icon="🏫"
        />
      </div>
    </div>
  );
};