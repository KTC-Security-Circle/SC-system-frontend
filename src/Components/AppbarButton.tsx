"use client";

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  IconButton,
  Menu,
  MenuProps,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { AppbarButton } from "../types/appbar";

// メニューのスタイルを定義
const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "#616161",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

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

      {/* カスタムメニュー */}
      <StyledMenu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
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
            {/* Divider の挿入例 */}
            {index === 2 && <Divider sx={{ my: 0.5 }} />}
          </React.Fragment>
        ))}
      </StyledMenu>
    </>
  );
};
