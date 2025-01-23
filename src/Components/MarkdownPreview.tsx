import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import breaks from 'remark-breaks';
import 'github-markdown-css/github-markdown.css';
import './markdown.css';

type MarkdownPreviewProps = {
  content: string;
};

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
  return (
    <>
      <div
        className="markdown-body"
        style={{
          fontFamily: 'inherit',
          fontSize: 'inherit',
          backgroundColor: 'white', // 背景色を白に
          color: 'black',           // テキスト色を黒に
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm, breaks]} // 必要なプラグインを適用
        >
          {content}
        </ReactMarkdown>
      </div>
    </>
  );
};

export default MarkdownPreview;