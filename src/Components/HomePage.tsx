'use client';
import React, { useState } from 'react';
import { LoginForm } from './parts/Login';
import { RegisterForm } from './parts/Register';
import { Container, Box, Card, Typography, Tabs, Tab } from '@mui/material';



export const HomePage: React.FC = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  }
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Card sx={{ p: 4 }}>
          <Box sx={{ mb: 2, textAlign: "center" }}>
            <Box sx={{ color: 'primary.main' }}>
              <Typography variant="h4">Welcome!</Typography>
            </Box>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              Chat App for students
            </Typography>
          </Box>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            centered
            variant="fullWidth"
          >
            <Tab label="ログイン" />
            <Tab label="新規作成" />
          </Tabs>
          <Box sx={{ mt: 3 }}>
            {tabIndex === 0 ? <LoginForm /> : <RegisterForm />}
          </Box>
        </Card>
      </Box>
    </Container>
  );
};