import React from 'react';
import { RegisterForm } from '@/Components/parts/Register';
import { Box,Container } from '@mui/material';

const RegisterPage:React.FC = () => {
    return (
        <Container>
            <Box sx={{ m:5 }}>
                <RegisterForm />
            </Box>
        </Container>
    )
}

export default RegisterPage;