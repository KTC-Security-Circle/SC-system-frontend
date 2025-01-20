import MarkdownPreview from "@/Components/MarkdownPreview";

const Information: React.FC = () => {
    const markdownContent = `
  # サンプル
  **太字** テスト
  
  - アイテム 1
  - アイテム 2
  `;
  
    return (
      <div style={{ padding: '20px', minHeight: '100vh' }}>
        <MarkdownPreview content={markdownContent} />
      </div>
    );
  };
  
  export default Information;
  