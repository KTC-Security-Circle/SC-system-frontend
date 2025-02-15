import Cookies from "js-cookie";

const API_LINK = process.env.NEXT_PUBLIC_BACKEND_DEV_URL;

interface MarkdownData {
  title: string;
  contents: string;
}

export const PutMarkdown = async (document_id: string, title:string, contents: string): Promise<MarkdownData> => {
  try {
    const access_token = Cookies.get("access_token");
    if (!access_token) {
        
      throw new Error("No token found");
    }

    const response = await fetch(`${API_LINK}/api/update/schoolinfo/${document_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`,
      },
      body: JSON.stringify(
        {
            "title": `${title}`,
            "contents": `${contents}`
        }),
    });

    if (!response.ok) {
      throw new Error("ファイルの保存に失敗しました");
    }

    const data = await response.json(); // JSONとしてパース]

    return { title: data.title, contents: data.contents }; // 最初の要素のcontentsを返す
    } catch (error) {
      console.error(error);
      throw new Error("マークダウンの保存に失敗しました");
  }
};
