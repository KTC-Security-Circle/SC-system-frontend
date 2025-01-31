"use client";

import { useEffect, useState } from "react";
import MarkdownPreview from "@/Components/MarkdownPreview";
import { Box, CircularProgress } from "@mui/material";

const API_LINK = process.env.NEXT_PUBLIC_BACKEND_DEV_URL;

const Information: React.FC = () => {
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const fetchMarkdown = async () => {
        try {
          // 下記のリンクは実装前のapiのため、コメントアウトしています
          // res = await fetch(`${API_LINK}/view/${id}.md`);
          const response = await fetch(`https://sc-system-backend.azurewebsites.net/test_markdown_dict`);
          if (!response.ok) {
            throw new Error("ファイルの読み込みに失敗しました");
          }
          const data = await response.json(); // JSONとして取得
          console.log("API Response:", data);
          const key = data[1];
          console.log("API Response:", key);
          setMarkdownContent(key); // マークダウンデータを保存
        } catch (error) {
          setError("マークダウンの読み込みに失敗しました。");
        } finally {
          setLoading(false);
        }
      };

      fetchMarkdown();
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
