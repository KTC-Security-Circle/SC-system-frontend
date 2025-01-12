"use client";

import * as React from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AppbarButton } from "@/types/appbar";

interface AppbarButtonProps {
  TextButtons: AppbarButton[]; // ボタンデータ配列
  iconColor?: string; // アイコンの色
}

export const AppbarButtons: React.FC<AppbarButtonProps> = ({
  TextButtons,
  iconColor = "#616161", // デフォルト色
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* メニューボタン */}
      <IconButton
        onClick={handleMenuOpen}
        sx={{
          color: iconColor,
        }}
      >
        <MoreVertIcon />
      </IconButton>

      {/* メニュー */}
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: 0, // 角を丸くしない
            marginTop: 1,
            minWidth: 180,
            color: "#616161",
            boxShadow:
              "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
          },
          "& .MuiMenu-list": {
            padding: "4px 0",
          },
          "& .MuiMenuItem-root": {
            "& .MuiSvgIcon-root": {
              fontSize: 18,
              color: "#616161", // グレーの色
              marginRight: 1.5,
            },
            "&:active": {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            },
          },
        }}
      >
        {TextButtons.map((button, index) => (
          <React.Fragment key={index}>
            <MenuItem
              onClick={() => {
                button.onClick();
                handleMenuClose();
              }}
              disableRipple
            >
              <ListItemIcon>{button.icon}</ListItemIcon>
              <ListItemText>{button.text}</ListItemText>
            </MenuItem>
            {/* Divider の挿入 */}
            {index === 2 && <Divider sx={{ my: 0.5 }} />}
          </React.Fragment>
        ))}
      </Menu>
    </>
  );
};
