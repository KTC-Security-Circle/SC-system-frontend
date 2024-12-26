"use client";

import * as React from "react";
import { AppbarTextButton } from '../types/appbar';
import { AppbarButtons } from './AppbarButton';
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
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

  const TextButtons: AppbarTextButton [] = [
    { text: "Button1", onClick: () => console.log("Button1 clicked"), color: "#616161" },
    { text: "Button2", onClick: () => console.log("Button2 clicked"), color: "#616161" },
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
        <Typography variant="h6" component="div" sx={{ color:"#616161",flexGrow: 1 }}>
          SCsystem
        </Typography>

        {/*ボタン */}
        <AppbarButtons TextButtons={TextButtons} />
      </Toolbar>
    </AppBar>
  );
};
