'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchMarkdown } from '@/api/fetchmd';
import { PutMarkdown } from '@/api/putmd';
import MarkdownEditorUI from '@/Components/MarkdownEditorUI';
import { BackButton } from "@/types/navigateback";
import { Container } from '@mui/material';
import { KeyboardReturn } from '@mui/icons-material';
import { NavigateBackButton } from "@/Components/NavigateBackButton";

const TextButtons: BackButton[] = [
  { text: "戻る", color: "#616161", href: "/EditMarkdown", icon: <KeyboardReturn /> }
];

const MarkdownEditor: React.FC = () => {
  const [markdownTitle, setMarkdownTitle] = useState<string>('');
  const [markdownValue, setMarkdownValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const params = useParams(); // useParams の戻り値はオブジェクト
  const router = useRouter(); // useRouter を追加
  const document_id = params.document_id as string;

  useEffect(() => {
    if (document_id) {
      const getMarkdown = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchMarkdown(document_id);
          setMarkdownTitle(data.title);
          setMarkdownValue(data.contents);
        } catch (error: any) {
          setError("マークダウンの読み込みに失敗しました。");
        } finally {
          setLoading(false);
        }
      };

      getMarkdown();
    }
  }, [document_id]);

  const handleChange = (value: string) => {
    setMarkdownValue(value);
  };

  const handleSave = async () => {
    if (!document_id) return;

    try {
      await PutMarkdown(document_id, markdownTitle, markdownValue, router); // 修正
      setOpen(true); // 成功時にSnackbarを開く
    } catch (error: any) {
      setError("マークダウンの保存に失敗しました。");
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
