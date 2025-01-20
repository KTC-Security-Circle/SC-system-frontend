import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import breaks from 'remark-breaks';
import 'github-markdown-css/github-markdown.css';
import './markdown.css';

type MarkdownPreviewProps = {
  content: string;
};

const Md: React.FC<MarkdownPreviewProps> = ({ content }) => {
  return (
    <div
      className="markdown-body" // 必ずクラスを追加
      style={{
        backgroundColor: 'white',
        color: 'black',
        padding: '1rem', // 見やすくするために余白を追加
        borderRadius: '8px',
        border: '1px solid #ddd',
      }}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm, breaks]}>{content}</ReactMarkdown>
    </div>
  );
};

export default Md;
