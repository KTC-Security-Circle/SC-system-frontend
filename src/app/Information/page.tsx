"use client";

import { useEffect, useState } from "react";
import MarkdownPreview from "@/Components/MarkdownPreview";
import { Box, CircularProgress } from "@mui/material";
import { fetchMarkdown } from "./fetchmd";

const Information: React.FC = () => {
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

      const response = fetchMarkdown();
      try {
        response.then((data) => {
          setMarkdownContent(data);
          setLoading(false);
        });
      } catch (error) {
        setError("マークダウンの読み込みに失敗しました。");
        setLoading(false);
      } finally {
        setLoading(false);
      }
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
        <p>{error}</p>
      </Box>
    );
  }

  return (
    <Box className="InformationPreview" sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "background.default", color: "text.primary", padding: "20px", minHeight: "100vh" }}>
      <Box sx={{ width: "210mm",  backgroundColor: "white", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "4px", padding: "20mm", overflow: "auto" }}>
        <MarkdownPreview content={markdownContent} />
      </Box>
    </Box>
  );
};

export default Information;
