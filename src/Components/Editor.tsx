'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import 'easymde/dist/easymde.min.css';

const ReactSimpleMdeEditor = dynamic(() => import('react-simplemde-editor'), { ssr: false });

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
