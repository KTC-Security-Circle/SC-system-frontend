import { Box, Container, CircularProgress, Typography, Divider, TextField, Snackbar, Alert } from '@mui/material';
import Editor from '@/Components/Editor';
import EditorButton from '@/Components/EditorButton';
import MarkdownPreview from '@/Components/MarkdownPreview';

interface MarkdownEditorUIProps {
  markdownTitle: string;
  setMarkdownTitle: (value: string) => void;
  markdownValue: string;
  onChange: (value: string) => void;
  onSave: () => void;
  loading: boolean;
  error: string | null;
  open: boolean;
  setOpen: (value: boolean) => void;
}

const MarkdownEditorUI: React.FC<MarkdownEditorUIProps> = ({
  markdownTitle,
  setMarkdownTitle,
  markdownValue,
  onChange,
  onSave,
  loading,
  error,
  open,
  setOpen,
}) => {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      {/* 成功メッセージをポップアップ表示 */}
      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success">
          保存に成功しました
        </Alert>
      </Snackbar>


      {/* エラーメッセージのポップアップ */}
      <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          variant="standard"
          value={markdownTitle}
          onChange={(e) => setMarkdownTitle(e.target.value)}
          sx={{
            textAlign: "center",
            display: "inline-block",
            pb: 0.3,
            "& .MuiInput-underline:before": { borderBottom: "2px solid #616161" },
            "& .MuiInput-underline:hover:before": { borderBottom: "2px solid #616161" },
            "& .MuiInput-underline.Mui-focused:before": { borderBottom: "2px solid #616161" },
            "& .MuiInput-underline:after": { borderBottom: "2px solid #616161" }
          }}
          InputProps={{ style: { fontSize: "24px" } }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 3 }}>
        <EditorButton onSave={onSave} />
      </Box>

      <Box sx={{ p: 3 }}>
        <Editor value={markdownValue} onChange={onChange} />

        <Typography variant="h5" gutterBottom>プレビュー</Typography>
        <Divider sx={{ mb: 2 }} />
        <MarkdownPreview content={markdownValue} />
      </Box>
    </Container>
  );
};

export default MarkdownEditorUI;
