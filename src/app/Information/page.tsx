import MarkdownPreview from "@/Components/MarkdownPreview";
import { Box } from "@mui/material";

const Information: React.FC = () => {
  const markdownContent = `

  # マークダウンのテスト
これは **太字** のテキストです。
# ドキュメントタイトル

## セクション1
### サブセクション1.1
内容1

### サブセクション1.2
内容2

## セクション2
### サブセクション2.1
内容3

- リストアイテム 1
- リストアイテム 2
- リストアイテム 3

[リンクはこちら](https://example.com)

| ヘッダー 1 | ヘッダー 2 |
|------------|------------|
| データ 1   | データ 2   |
`;

  return (
    <Box
      className="InformationPreview"
      sx={{
        padding: "20px",
        minHeight: "100vh",
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      <MarkdownPreview content={markdownContent} />
    </Box>
  );
};

export default Information;
