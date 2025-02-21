'use client';

import { useState } from 'react';
import { InputMarkdown } from '@/api/Inputmd';
import { useRouter } from 'next/navigation';
import MarkdownEditorUI from '@/Components/MarkdownEditorUI';
import { BackButton } from "@/types/navigateback";
import { KeyboardReturn } from '@mui/icons-material';
import { NavigateBackButton } from "@/Components/NavigateBackButton";
import { Container } from '@mui/material';

const TextButtons: BackButton [] = [
  { text: "戻る", color: "#616161", href: "/Admin/School", icon: <KeyboardReturn /> }
];

const MarkdownEditor: React.FC = () => {
  const [markdownTitle, setMarkdownTitle] = useState<string>('');
  const [markdownValue, setMarkdownValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const router = useRouter(); // useRouter を追加

  const handleChange = (value: string) => {
    setMarkdownValue(value);
  };

  const handleSave = async () => {

    try {
      await InputMarkdown(markdownTitle, markdownValue, router);
      setOpen(true); // 成功時にSnackbarを開く
    } catch (error: any) {
      setError("マークダウンの保存に失敗しました。");
    }finally{
        setLoading(false);
    }
  };

  return (
    <Container>
        <NavigateBackButton TextButtons={TextButtons} />

        <MarkdownEditorUI
        markdownTitle={markdownTitle}
        setMarkdownTitle={setMarkdownTitle}
        markdownValue={markdownValue}
        onChange={handleChange}
        onSave={handleSave}
        loading={loading}
        error={error}
        open={open}
        setOpen={setOpen}
        />
    </Container>
  );
};

export default MarkdownEditor;
