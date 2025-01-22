import MarkdownPreview from "@/Components/MarkdownPreview";

const Information: React.FC = () => {
    const markdownContent = `
# マークダウンのテスト
これは **太字** のテキストです。

- リストアイテム 1
- リストアイテム 2
- リストアイテム 3

[リンクはこちら](https://example.com)

| ヘッダー 1 | ヘッダー 2 |
|------------|------------|
| データ 1   | データ 2   |
 `;

  
    return (
      <div style={{ padding: '20px', minHeight: '100vh' }}>
        <MarkdownPreview content={markdownContent} />
      </div>
    );
  };
  
  export default Information;
  