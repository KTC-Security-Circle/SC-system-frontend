'use client';

import { useState, useEffect } from 'react';
import  Editor from '@/Components/Editor';
import { fetchMarkdown } from '../Information/fetchmd';
import MarkdownPreview from '@/Components/MarkdownPreview';
import { Typography, Divider, Box } from '@mui/material';
import { BackButton } from "@/types/navigateback";
import { NavigateBackButton } from "@/Components/NavigateBackButton";
import { KeyboardReturn } from '@mui/icons-material';
import { Container } from '@mui/material';

const TextButtons: BackButton [] = [
  { text: "戻る", color: "#616161", href: "/Admin/School", icon: <KeyboardReturn /> }
];

const MarkdownEditor = () => {
  const [markdownValue, setMarkdownValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (value: string) => {
    setMarkdownValue(value);
  };

  useEffect(() => {
  
        const response = fetchMarkdown();
        try {
          response.then((data) => {
            setMarkdownValue(data);
            setLoading(false);
          });
        } catch (error) {
          setError("マークダウンの読み込みに失敗しました。");
          setLoading(false);
        } finally {
          setLoading(false);
        }
    }, []);

  return (
    <Container>
      <Box sx={{ m: 1 }}>
        <NavigateBackButton TextButtons={TextButtons} />    
      </Box>
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
    </Container>
  );
};

export default MarkdownEditor;
