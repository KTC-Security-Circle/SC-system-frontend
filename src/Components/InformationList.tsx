import { useEffect, useState } from "react";
import { fetchtitle } from "@/api/fetchtitle";
import { ListButton } from "@/types/listbutton";
import { Box, Grid, Card, CardActionArea, CardContent, Typography, CircularProgress } from "@mui/material";
import Link from "next/link";


interface LinkIDProps {
  LinkAdress: string; // ボタンデータ配列
}

export const InformationList:React.FC<LinkIDProps> =({LinkAdress}) => {
    
    const [textButtons, setTextButtons] = useState<ListButton[]>([]);
    const [NoneDataMessage, setNoneDataMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getTitles = async () => {
            try {
                const documents = await fetchtitle();
                if (documents.length === 0) {
                    console.log("No documents found.");
                    setTextButtons([]);
                    setNoneDataMessage("データがありません");
                    return;
                }
                setTextButtons(documents);
            } catch (error) {
                setError("情報の取得に失敗しました。");
            } finally {
                setLoading(false);
            }
        };
        getTitles();
    }, []);
    
    if (loading) {
        return (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <CircularProgress />
          </Box>
        );
    }

    if (error) {
        return (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", color: "error.main" }}>
            <Typography>{error}</Typography>
          </Box>
        );
    }

    return (
    <Box sx={{ width: "100%", padding: "0 8px" }}> {/* 縦スクロールの許可 */}
      <Typography variant="h4">学内情報一覧</Typography>
      <Grid 
        container 
        spacing={2} 
        sx={{ maxWidth: "calc(100% - 16px)", margin: "auto" }} 
      > 
        {textButtons.map((btn) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={btn.document_id}>
            <Card sx={{ cursor: "pointer", width: "100%", maxWidth: "100%", minWidth: 250 }}>
              <Link href={`/${LinkAdress}/${btn.document_id}`} passHref>
                <CardActionArea>
                  <CardContent>
                    <Typography variant="h5">{btn.title}</Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    );
}
