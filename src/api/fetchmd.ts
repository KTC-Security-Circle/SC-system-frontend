import Cookies from "js-cookie";

const API_LINK = process.env.NEXT_PUBLIC_BACKEND_DEV_URL;

interface MarkdownData {
  title: string;
  contents: string;
}

export const fetchMarkdown = async (document_id: string): Promise<MarkdownData> => {
  try {
    const access_token = Cookies.get("access_token");
    if (!access_token) {
      throw new Error("No token found");
    }

    const response = await fetch(`${API_LINK}/api/view/schoolinfo/${document_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error("ファイルの読み込みに失敗しました");
    }

    const data = await response.json(); // JSONとしてパース

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("データが空または不正です");
    }

    return { title: data[0].title, contents: data[0].contents }; // 最初の要素のcontentsを返す
  } catch (error) {
    console.error(error);
    throw new Error("マークダウンの読み込みに失敗しました");
  }
};
