"use client";

import { useEffect, useState } from "react";
import { fetchtitle } from "@/api/fetchtitle";
import { ListButton } from "@/types/listbutton";
import { Box, Grid, Card, CardActionArea, CardContent, Typography, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

interface LinkIDProps {
  LinkAdress: string; // ボタンデータ配列
  PageTitle : string; // ページタイトル
}

export const StudentInformationList:React.FC<LinkIDProps> =({LinkAdress, PageTitle}) => {
    const router = useRouter();

    const [textButtons, setTextButtons] = useState<ListButton[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const getTitles = async () => {
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

    return (
    <Box sx={{ width: "100%", padding: "0 8px" }}> {/* 縦スクロールの許可 */}
      <Typography variant="h5">{PageTitle}</Typography>
      <Grid 
        container 
        spacing={2} 
        sx={{ maxWidth: "calc(100% - 16px)", margin: "auto" }} 
      >
        {textButtons.map((btn) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={btn.document_id}>
            <Card
              sx={{ cursor: "pointer", width: "100%", maxWidth: "100%", minWidth: 250 }}
            >
              <CardActionArea
                onClick={() => router.push(`/${LinkAdress}/${btn.document_id}`)}
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
