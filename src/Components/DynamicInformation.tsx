"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MarkdownPreview from "@/Components/MarkdownPreview";
import { Box, CircularProgress, Typography } from "@mui/material";
import { fetchMarkdown } from "@/api/fetchmd";
import { BackButton } from "@/types/navigateback";
import { NavigateBackButton } from "@/Components/NavigateBackButton";
import { Container } from "@mui/material";

interface DynamicInformationProps {
    TextButtons: BackButton[];
}

const DynamicInformation: React.FC<DynamicInformationProps> = ({ TextButtons }) => {
  const [markdownTitle, setMarkdownTitle] = useState<string>("");
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useParams();
  const document_id = router.document_id;

  useEffect(() => {

    if (document_id) {
      const getMarkdown = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchMarkdown(document_id as string);
          setMarkdownTitle(data.title);
          setMarkdownContent(data.contents);
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
    <Container>
      <NavigateBackButton TextButtons={TextButtons} />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5" 
          sx={{ textAlign: "center", display: "inline-block", borderBottom: "2px solid #616161", pb: 0.3 }}
        >Title: {markdownTitle}</Typography>
      </Box>
      <Box className="InformationPreview" sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "background.default", color: "text.primary", padding: "20px" }}>
        <Box sx={{ width: "210mm",  backgroundColor: "white", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "4px", padding: "20mm", overflow: "auto" }}>
          <MarkdownPreview content={markdownContent} />
        </Box>
      </Box>
    </Container>
  );
};

export default DynamicInformation;