import Cookies from "js-cookie";

const API_LINK = process.env.NEXT_PUBLIC_BACKEND_DEV_URL;

export const DeleteMarkdown = async (document_id: string) => {
  try {
    const access_token = Cookies.get("access_token");
    if (!access_token) {
      throw new Error("No token found");
    }

    const response = await fetch(`${API_LINK}/api/delete/schoolinfo/${document_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error("削除に失敗しました");
    }

    return; // 最初の要素のcontentsを返す
  } catch (error) {
    throw new Error("削除に失敗しました");
  }
};
