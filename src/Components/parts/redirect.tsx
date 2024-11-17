'use client';
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/index";
import { useRouter } from "next/router";

interface RedirectProps {
  children: React.ReactNode;
  requiredrole: string;
}

const Redirect: React.FC<RedirectProps> = ({ children, requiredrole }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      // 未認証の場合、ログインページにリダイレクト
      router.push("/");
      return;
    }

    if (user.role === "student" || user.role === "staff" || user.role === "admin") {
      // 必要なロールに応じてリダイレクト
      router.push("/Chat");
      return;
    } else {
      // 不明なロールの場合はログインページにリダイレクト
      router.push("/");
    }
  }, [user, router]); // `user` と `router` を依存配列に含める

  // リダイレクト中は何も描画しない
  if (!user || (user.role !== "student" && user.role !== "staff" && user.role !== "admin")) {
    return null;
  }

  return <>{children}</>; 
};

export default Redirect;
