import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import 'easymde/dist/easymde.min.css';
import { marked } from 'marked';

const Loading = () => <p>Loading editor...</p>;

const ReactSimpleMdeEditor = dynamic(() => import('react-simplemde-editor'), { 
  ssr: false,
  loading: () => <Loading />,
});

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  // marked のオプションを設定
  marked.setOptions({
    gfm: true,       // GitHub Flavored Markdown を有効化
    breaks: true,    // 改行を <br> に変換
  });

  const options = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      autosave: {
        enabled: true,
        uniqueId: 'saved_content',
        delay: 1000,
      },
      previewRender: (markdown: string) => marked(markdown), // marked を適用
    };
  }, []);

  return <ReactSimpleMdeEditor value={value} onChange={onChange} options={options} />;
};

export default Editor;
