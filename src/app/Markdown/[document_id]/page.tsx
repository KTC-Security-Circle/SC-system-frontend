'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import  Editor from '@/Components/Editor';
import  EditorButton from '@/Components/EditorButton';
import { fetchMarkdown } from '@/api/fetchmd';
import { PutMarkdown } from '@/api/putmd';
import MarkdownPreview from '@/Components/MarkdownPreview';
import { CircularProgress, Typography, Divider, Box, TextField } from '@mui/material';
import { BackButton } from "@/types/navigateback";
import { NavigateBackButton } from "@/Components/NavigateBackButton";
import { KeyboardReturn } from '@mui/icons-material';
import { Container } from '@mui/material';

const TextButtons: BackButton [] = [
  { text: "戻る", color: "#616161", href: "/Markdown", icon: <KeyboardReturn /> }
];

const MarkdownEditor = () => {
  const [markdownTitle, setMarkdownTitle] = useState<string>('');
  const [markdownValue, setMarkdownValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useParams();
  const document_id = Array.isArray(router.document_id) ? router.document_id[0] : router.document_id;

  const SaveLink = `/Information/${document_id}`;

  const handleChange = (value: string) => {
    setMarkdownValue(value);
  };

  const handleSave = async () => {
    if(!document_id) return;

    try{
      await PutMarkdown(document_id as string, markdownTitle, markdownValue);
      alert("保存に成功しました");
    }catch(error: any){
      alert("保存に失敗しました");
      setError("マークダウンの保存に失敗しました。");
    }
  };

  useEffect(() => {

    if (document_id) {
      const getMarkdown = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchMarkdown(document_id as string);
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


    if (loading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70vh" }}>
          <CircularProgress />
        </Box>
      );
    }
  
    if (error) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70vh", color: "error.main" }}>
          <Typography>{error}</Typography>
        </Box>
      );
    }

    /**
     * 今後実装
     <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
      <Alert onClose={() => setOpen(false)} severity="success">
        保存に成功しました
      </Alert>
    </Snackbar>
    */

  return (
    <Container>
    {/* 成功メッセージをポップアップ表示 */}
      <NavigateBackButton TextButtons={TextButtons} />    
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          variant="standard"
          value={markdownTitle}
          onChange={(e) => setMarkdownTitle(e.target.value)}
          sx={{
            textAlign: "center",
            display: "inline-block",
            pb: 0.3,
            "& .MuiInput-underline:before": {
              borderBottom: "2px solid #616161", // 通常時の下線色
            },
            "& .MuiInput-underline:hover:before": {
              borderBottom: "2px solid #616161", // ホバー時の下線色
            },
            "& .MuiInput-underline.Mui-focused:before": {
              borderBottom: "2px solid #616161", // フォーカス時も下線色を変更しない
            },
            "& .MuiInput-underline:after": {
              borderBottom: "2px solid #616161", // フォーカス時も下線色を変更しない
            },
          }}
          InputProps={{
            style: { fontSize: "24px" }, // input要素に文字サイズを適用
          }}
          />
      </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 3 }}>
            <EditorButton SaveLink={SaveLink} onSave={handleSave} />
          </Box>
      <Box sx={{ p: 3 }}>
        <Editor value={markdownValue} onChange={handleChange} />

        <Typography variant="h5" gutterBottom>プレビュー</Typography>

        <Divider sx={{ mb: 2 }} />

        <MarkdownPreview content={markdownValue} />
      </Box>
    </Container>
  );
};

export default MarkdownEditor;