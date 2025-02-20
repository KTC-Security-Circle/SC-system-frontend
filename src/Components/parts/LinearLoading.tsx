'use client';
import React, { useState,useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/system';


export default function LinearLoading(){
      return(
        <Box sx={{ width: '100%' }}>
          <LinearProgress   />
        </Box>
      )
}