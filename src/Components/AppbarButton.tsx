"use client";

import * as React from "react";
import { Button } from "@mui/material";
import { AppbarTextButton } from '../types/appbar';

interface AppbarButtonProps {
  TextButtons: AppbarTextButton[]; // ボタンデータ配列
}

export const AppbarButtons: React.FC<AppbarButtonProps> = ({ TextButtons }) => {
  return (
    <>
      {TextButtons.map((button: AppbarTextButton, index) => (
        <Button
          key={index}
          onClick={button.onClick}
          sx={{
            color: button.color || "#616161", // デフォルトで黒色
            textTransform: "none", // テキストをそのまま表示
            marginLeft: 1, // ボタン間の余白
          }}
        >
          {button.text}
        </Button>
      ))}
    </>
  );
};
