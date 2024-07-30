"use client";

import { useState, MouseEvent } from "react";

export default function Page() {
  const [message, setMessage] = useState<string>("");

  async function getMessage() {
    try {
      const res = await fetch(`/api/chat/message`);
      if (!res.ok) {
        throw new Error("messageの取得に失敗しました");
      }
      const data = await res.json();
      setMessage(data.message);  // 'message' プロパティをセット
    } catch (error) {
      console.error("エラーが発生しました:", error);
      setMessage("エラーが発生しました");
    }
  }

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    getMessage();
  };

  return (
    <div className="text-center mt-8">
      <button className="bg-gray-200 p-2" onClick={handleButtonClick}>
        Get Message
      </button>
      <p>Message: {message}</p>
    </div>
  );
}
