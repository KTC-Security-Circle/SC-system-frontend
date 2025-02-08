import React from "react";
import { BackButton } from '../types/navigateback';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface BackButtonProps {
  TextButtons: BackButton[]; // ボタンデータ配列
  }


export const NavigateBackButton:React.FC<BackButtonProps> =({TextButtons}) =>{
    return (
      <Stack direction="row" spacing={2}>
        {TextButtons.map((button: BackButton, index) => (
          <Button
            key={index}
            variant="contained" 
            color={button.color as 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'} 
            startIcon={button.icon}
            sx={{
                color: button.color || "#616161" // デフォルトで黒色
            }}
            href={button.href}>
            {button.text}
        </Button>
        ))}
      </Stack>
    );
  };