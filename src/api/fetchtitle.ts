import { ListButton } from "@/types/listbutton";
import Cookies from "js-cookie";
const API_LINK = process.env.NEXT_PUBLIC_BACKEND_DEV_URL;

export const fetchtitle = async (): Promise<ListButton[]> => {
try {
    const access_token = Cookies.get("access_token");
    if (!access_token) {
        throw new Error("No token found");
    }
    const response = await fetch(`${API_LINK}/api/view/schoolinfo/title?offset=0`,
    {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`,
        },
    });

    if (!response.ok) {
        throw new Error("データの取得に失敗しました");
    }
     
    const data = await response.json();

    // titleとdocument_idのみを抽出してListButton[]の形にする
    return data.map((item: any) => ({
    title: item.title,
    document_id: String(item.id), // document_idを文字列に変換
    }));
} catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("データの取得に失敗しました");
}
};
