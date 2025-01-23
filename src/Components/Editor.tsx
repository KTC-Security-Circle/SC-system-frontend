'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import 'easymde/dist/easymde.min.css';

const Loading = () => <p>Loading editor...</p>;

const ReactSimpleMdeEditor = dynamic(() => import('react-simplemde-editor'), { 
  ssr: false,
  loading: () => <Loading /> // ローディング中に表示するコンポーネントを指定
});

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const options = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      autosave: {
        enabled: true,
        uniqueId: 'saved_content',
        delay: 1000,
      },
    };
  }, []);

  return <ReactSimpleMdeEditor value={value} onChange={onChange} options={options} />;
};

export default Editor;
