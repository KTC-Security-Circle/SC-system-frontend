"use client";

import * as React from "react";
import { AppbarButton } from '../types/appbar';
import { AppbarButtons } from './AppbarButton';
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import SettingsIcon from '@mui/icons-material/Settings';
import { 
  IconButton,
  AppBar,
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
  handleDrawerToggle,
}) => {

  const TextButtons: AppbarButton [] = [
    { text: "button1", icon: <SettingsIcon fontSize="small" />, onClick: () => console.log("1 clicked") },
    { text: "button2", icon: <SettingsIcon fontSize="small" />, onClick: () => console.log("2 clicked") },
    { text: "button3", icon: <SettingsIcon fontSize="small" />, onClick: () => console.log("3 clicked") },
    { text: "button4", icon: <SettingsIcon fontSize="small" />, onClick: () => console.log("4 clicked") },

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
      <Toolbar>
        {/* 開閉ボタン */}
        <IconButton
          edge="start"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{
            display: { sm: pcOpen ? "none" : "block" }, // PC画面でDrawerが開いている時は非表示
          }}
        >
          <AlignHorizontalLeftIcon />
        </IconButton>
        {/* タイトル */}
        <Typography 
          variant="h6"
          component="div" 
          sx={{ color:"#616161",flexGrow: 1 }}
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
