import MarkdownNavigation from "@/Components/MarkdownNavgation";
import { Container } from "@mui/material";
import { Box } from "@mui/system";

export default async function AdminSchoolPage() {
    return (
        <Container>
            <Box sx={{ m: 5 }}>
                <MarkdownNavigation />
            </Box>
        </Container>
    )
}