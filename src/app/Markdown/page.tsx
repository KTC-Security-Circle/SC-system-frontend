'use client';

import { useEffect, useState } from 'react';
import Editor from '@/Components/Editor';
import MarkdownPreview from '@/Components/MarkdownPreview';

const MarkdownEditor = () => {
  const [markdownValue, setMarkdownValue] = useState(''); // 初期値を '' に統一

  useEffect(() => {
    const savedContent = localStorage.getItem('smde_saved_content');
    if (savedContent) {
      setMarkdownValue(savedContent);
    }
  }, []);

  const handleChange = (value: string) => {
    setMarkdownValue(value);
  };

  return (
    <>
      <Editor value={markdownValue} onChange={handleChange} />
      <h1
        style={{
          fontSize: '1.5rem', // 文字サイズを大きく調整
          fontWeight: 'bold', // 太字にする
          marginBottom: '0.5rem', // 下の要素との余白
        }}
      >
        プレビュー
      </h1>

      <hr
        style={{
          marginBottom: '1rem', // 線の下に余白を追加
          borderRadius: '1px', // 線の角を少し丸める
        }}
      />

      <MarkdownPreview content={markdownValue} />
    </>
  );
};

export default MarkdownEditor;
