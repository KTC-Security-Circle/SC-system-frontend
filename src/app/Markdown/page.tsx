'use client';

import { useEffect, useState } from 'react';
import Editor from '@/Components/Editor';
import MarkdownPreview from '@/Components/MarkdownPreview';

const MarkdownEditor = () => {
  const [markdownValue, setMarkdownValue] = useState('');

  useEffect(() => {
    const savedContent = localStorage.getItem('smde_saved_content') ?? '';
    setMarkdownValue(savedContent);
  }, []);

  const handleChange = (value: string) => {
    setMarkdownValue(value);
  };

  return (
    <>
      <Editor value={markdownValue} onChange={handleChange} />
      <MarkdownPreview content={markdownValue} />
    </>
  );
};

export default MarkdownEditor;
