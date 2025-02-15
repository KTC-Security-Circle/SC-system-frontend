import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import breaks from 'remark-breaks';
import { Box, Typography } from '@mui/material';
import rehypeSlug from 'rehype-slug';
import 'github-markdown-css/github-markdown.css';
import './markdown.css';
import rehypeToc from '@jsdevtools/rehype-toc';

type MarkdownPreviewProps = {
  content: string;
};

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content = '' }) => {

  const tocOptions = {
    headings: "h1 h2 h3",
    cssClasses: {
      toc: "prose-toc",
      list: "prose",
      listItem: "prose-toc-list-item",
      link: "prose-toc-link",
    },
  };

  return (
    <>
      <Box
        className="markdown-body"
        sx={{
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
        <Typography variant="h5" sx={{ color: 'gray' }}>コンテンツがありません。</Typography> // 空の場合のメッセージ
      )}
      </Box>
    </>
  );
};

export default MarkdownPreview;