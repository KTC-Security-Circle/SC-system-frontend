import React from "react";
import { UserTable } from '../../Components/Usersort'
import { Box,Container } from '@mui/material';

const Sort: React.FC = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Container sx={{ m:5 }}>
                <UserTable/>
            </Container>
        </Box>
    );
};
export default Sort;