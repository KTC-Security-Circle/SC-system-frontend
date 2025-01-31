const API_LINK = process.env.NEXT_PUBLIC_BACKEND_DEV_URL;

export const fetchMarkdown = async () => {
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
      return key;// マークダウンデータを保存
    } catch (error) {
      return "マークダウンの読み込みに失敗しました。";
    }
  };