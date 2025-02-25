"use client";

import { useEffect, useState } from "react";
import { fetchtitle } from "@/api/fetchtitle";
import { ListButton } from "@/types/listbutton";
import { 
  Box, Grid, Card, CardActionArea, CardContent, Typography, 
  CircularProgress, Checkbox, Button, Alert, 
  Snackbar
} from "@mui/material";
import { useRouter } from "next/navigation";
import { DeleteMarkdown } from "@/api/deletemd";

interface LinkIDProps {
  LinkAdress: string; // ボタンデータ配列
  PageTitle: string; // ページタイトル
}

export const InformationList: React.FC<LinkIDProps> = ({ LinkAdress, PageTitle }) => {
  const router = useRouter();
  const [textButtons, setTextButtons] = useState<ListButton[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error" | "info" | "warning" | undefined>(undefined);


  useEffect(() => {
    const getTitles = async () => {
      setAlertMessage(null);
      setAlertSeverity(undefined);
      try {
        const documents = await fetchtitle();
        setTextButtons(documents);
      } catch (error: any) {
        setError("情報の取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };
    getTitles();
  }, []);

  // チェックボックスの変更を処理
  const handleCheckboxChange = (document_id: string) => {
    setSelectedIds((prev) =>
      prev.includes(document_id)
        ? prev.filter((id) => id !== document_id)
        : [...prev, document_id]
    );
  };

  // 削除処理（仮の処理、API連携が必要）
  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      await Promise.all(selectedIds.map((id) => DeleteMarkdown(id)));
      setAlertMessage("選択した項目を削除しました。");
      setAlertSeverity("success");

      // データを再取得して状態を更新
      const updatedDocuments = await fetchtitle();
      setTextButtons(updatedDocuments);

      setSelectedIds([]); // 選択リセット
      setDeleteMode(false); // 削除モード終了
    } catch (error) {
      setAlertMessage("削除に失敗しました。");
      setAlertSeverity("error");
    }
    finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "70vh" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loding...</Typography>
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

  return (
    <Box sx={{ width: "100%", padding: "0 8px" }}>
      <Typography variant="h5">{PageTitle}</Typography>

      {alertMessage && (
        <Snackbar
          open={Boolean(alertMessage)}
          autoHideDuration={3000}
          onClose={() => setAlertMessage(null)}
        >
          <Alert severity={alertSeverity} sx={{ mb: 2 }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      )}


      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 2 }}>
        <Button 
          variant="contained" 
          color={deleteMode ? "error" : "primary"} 
          onClick={() => setDeleteMode(!deleteMode)}
        >
          {deleteMode ? "キャンセル" : "削除モード"}
        </Button>
        
        {deleteMode && (
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleDelete} 
            disabled={selectedIds.length === 0}
          >
            選択した項目を削除
          </Button>
        )}

      </Box>


      <Grid container spacing={2} sx={{  margin: "auto" }}>
        {textButtons.map((btn) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={btn.document_id} sx={{ display: "flex", alignItems: "center" }}>
            {deleteMode && (
              <Checkbox
                checked={selectedIds.includes(btn.document_id)}
                onChange={() => handleCheckboxChange(btn.document_id)}
                sx={{ ml: 1 }}
              />
            )}
            <Card sx={{ cursor: "pointer", width: "100%", maxWidth: "100%", minWidth: 250 }}>
              <CardActionArea
                onClick={() => !deleteMode && router.push(`/${LinkAdress}/${btn.document_id}`)}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ borderBottom: "2px solid #616161", pb: 0.3 }}
                  >
                    {btn.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
