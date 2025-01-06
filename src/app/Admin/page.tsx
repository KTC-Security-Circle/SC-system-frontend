import AdminPageComponent from "@/Components/AdminPageComponent";
import { Container } from "@mui/material";
import { Box } from "@mui/system";

export default async function AdminPage() {
    return (
        <Container>
            <Box sx={{ m: 5 }}>
                <AdminPageComponent />
            </Box>
        </Container>
    )
}