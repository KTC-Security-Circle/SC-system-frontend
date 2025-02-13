import React from "react";
import { BackButton } from '../types/navigateback';
import { Box, Button, Stack } from '@mui/material';

interface BackButtonProps {
  TextButtons: BackButton[]; // ボタンデータ配列
  }


export const NavigateBackButton:React.FC<BackButtonProps> =({TextButtons}) =>{
    return (
      <Box sx={{ m: 5 }}>
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
      </Box>
    );
  };