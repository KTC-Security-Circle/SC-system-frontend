import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/index";
import { useRouter } from "next/router";

interface RedirectProps {
  children: React.ReactNode;
  requiredrole: string;
}

// 認証状態とロールを確認し、適切なページにリダイレクトする
const Redirect: React.FC<RedirectProps> = ({ children, requiredrole }) => {
  const user = useSelector((state:RootState) => state.auth.user);
  const router = useRouter();
  if(!user){
    router.push('/');
    return null;
  }
  if(user.role == 'student'){
    router.push('/Chat');
    return null;
  }
  else if(user.role == 'staff'){
    router.push('/Chat');
    return null;
  }
  else if(user.role == 'admin'){
    router.push('/Chat');
    return null;
  }
  else{
    router.push('/');
    return null;
  }
}
