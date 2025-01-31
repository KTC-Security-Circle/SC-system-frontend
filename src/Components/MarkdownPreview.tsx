import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import breaks from 'remark-breaks';
import rehypeSlug from 'rehype-slug';
import 'github-markdown-css';
import './markdown.css';
import rehypeToc from '@jsdevtools/rehype-toc';
import 'github-markdown-css';
import './markdown.css';

type MarkdownPreviewProps = {
  content: string;
};

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content = '' }) => {

  const tocOptions = {
    headings: "h1 h2",
    cssClasses: {
      toc: "prose-toc",
      list: "prose",
      listItem: "prose-toc-list-item",
      link: "prose-toc-link",
    },
  };

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
        {content.trim() ? ( // content が空でない場合のみ Markdown を表示}
        <ReactMarkdown
          rehypePlugins={[rehypeSlug,[rehypeToc, tocOptions]]}
          remarkPlugins={[remarkGfm, breaks]} // 必要なプラグインを適用
        >
          {content}
        </ReactMarkdown>
      ) : (
        <p style={{ color: 'gray' }}>コンテンツがありません。</p> // 空の場合のメッセージ
      )}
      </div>
    </>
  );
};

export default MarkdownPreview;