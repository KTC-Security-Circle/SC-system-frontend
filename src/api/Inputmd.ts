import Cookies from "js-cookie";

const API_LINK = process.env.NEXT_PUBLIC_BACKEND_DEV_URL;

export const InputMarkdown = async (
    title: string,
    contents: string,
    router: any // 外部から `router` を渡す
  ): Promise<void> => {
  try {
    const access_token = Cookies.get("access_token");
    if (!access_token) {
        
      throw new Error("No token found");
    }

    // データの検証
    if (!title || !contents) {
        throw new Error("タイトルとコンテンツは必須です");
        }

    const response = await fetch(`${API_LINK}/api/input/schoolinfo/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`,
      },
      body: JSON.stringify({ title, contents }),
    });

    if (!response.ok) {
        try {
          const errorData = await response.json();
          throw new Error(errorData.message || "ファイルの保存に失敗しました");
        } catch {
          throw new Error("ファイルの保存に失敗しました");
        }
    }

    response.json().then((data) => {
        console.log(data);
        router.push(`/Information/${data.id}`);
    });
    } catch (error) {
      console.error("エラー:", error);
      throw new Error("マークダウンの保存に失敗しました");
    }
  };
