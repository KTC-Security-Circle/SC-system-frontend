'use client';

import { useState } from 'react';
import  Editor from '@/Components/Editor';
import MarkdownPreview from '@/Components/MarkdownPreview';
import { Typography, Divider, Box } from '@mui/material';

const MarkdownEditor = () => {
  const [markdownValue, setMarkdownValue] = useState<string>('');

  const handleChange = (value: string) => {
    setMarkdownValue(value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Editor value={markdownValue} onChange={handleChange} />

      {/* ここでプレビューのタイトルを表示（重複防止） */}
      <Typography variant="h5" gutterBottom>
        プレビュー
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {/* MarkdownPreview 内ではタイトルを表示しない */}
      <MarkdownPreview content={markdownValue} />
    </Box>
  );
};

export default MarkdownEditor;
