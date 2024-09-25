'use client';
import React from 'react';
import { LoginForm } from './parts/Login';
import { Box,Container } from '@mui/material';

export const HomePage: React.FC = () => {
    return (
        <Container>
            <Box sx={{ m:5 }}>
                <LoginForm />
            </Box>
        </Container>
    );
};