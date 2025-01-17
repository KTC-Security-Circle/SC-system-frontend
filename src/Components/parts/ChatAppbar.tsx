"use client";

import * as React from "react";
import { AppbarButton } from '@/types/appbar';
import { AppbarButtons } from './AppbarButton';
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from "@/Context/authSlice";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/index';
import { useRouter } from 'next/navigation'
import { 
  IconButton,
  AppBar,
  Box,
  Toolbar,
  Typography, 
} from "@mui/material";

const drawerWidth = 240;

interface ChatAppbarProps {
  pcOpen: boolean;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}


export const ChatAppbar: React.FC<ChatAppbarProps> = ({
  pcOpen,
  mobileOpen,
  handleDrawerToggle
}) => {

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = async(e: React.MouseEvent<HTMLButtonElement>)=>{
    try {
      const res = await dispatch(logout());
      router.push('/');
      return res;
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  const TextButtons: AppbarButton [] = [
    { text: "button1", icon: <SettingsIcon fontSize="small" />, onClick: () => console.log("1 clicked") },
    { text: "button2", icon: <SettingsIcon fontSize="small" />, onClick: () => console.log("2 clicked") },
    { text: "button3", icon: <SettingsIcon fontSize="small" />, onClick: () => console.log("3 clicked") },
    { text: "Logout", icon: <LogoutIcon fontSize="small" />, onClick: handleLogout},

  ];
  
  
  return (
    <AppBar
    position="fixed"
    sx={{
      backgroundColor: '#ffffff',
      boxShadow: 'none',
      width: pcOpen
        ? { sm: `calc(100% - ${drawerWidth}px)` }
        : "100%", // pcOpenがfalseなら全幅
      ml: pcOpen ? { sm: `${drawerWidth}px` } : 0, // 左余白を調整
      transition: "width 0.3s ease-in-out",
    }}
  >
    <Toolbar
    sx={{
      display: "flex",
      justifyContent: "space-between", 
      alignItems: "center", 
      padding: 0,
    }}>
      {/* 開閉ボタン */}
        <AlignHorizontalLeftIcon />
      {/* タイトル */}
      <Typography 
        variant="h6"
        component="div" 
        sx={{ color:"#616161",flexGrow: 1, textAlign: 'left',paddingLeft: { sm: "16px", xs: "16px" } }}
      >
        SCsystem
      </Typography>

      {/* プルダウンボタン */}
      <AppbarButtons 
      TextButtons={TextButtons} />

    </Toolbar>
  </AppBar>
  );
};
