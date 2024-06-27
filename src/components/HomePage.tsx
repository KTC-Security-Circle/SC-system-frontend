import React from 'react';
import Link from 'next/link';

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
        <div className="text-4xl mb-4">{icon}</div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
};

export const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">学校総合サポートシステム</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <FunctionCard
          title="チャットボット"
          description="学校に関する質問にお答えします"
          link="/Chat"
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

