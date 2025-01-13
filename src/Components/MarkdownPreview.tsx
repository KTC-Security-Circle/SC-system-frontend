import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css/github-markdown.css';
import './markdown.css';

type MarkdownPreviewProps = {
  content: string;
};

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-left pl-4">プレビュー</h1>
      <div
        className="markdown-body p-4 border border-gray-300 h-72 overflow-y-auto"
        style={{
          fontFamily: 'inherit',
          fontSize: 'inherit',
          backgroundColor: 'white', // 背景色を白に
          color: 'black',           // テキスト色を黒に
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{

          }} // 必要なプラグインを適用
        >
          {content}
        </ReactMarkdown>
      </div>
    </>
  );
};

export default MarkdownPreview;