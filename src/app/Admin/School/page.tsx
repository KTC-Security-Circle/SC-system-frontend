import MarkdownNavigation from "@/Components/MarkdownNavgation";
import { BackButton } from "@/types/navigateback";
import { NavigateBackButton } from "@/Components/NavigateBackButton";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { KeyboardReturn } from '@mui/icons-material';

const TextButtons: BackButton [] = [
    { text: "戻る", color: "#616161", href: "/Admin", icon: <KeyboardReturn /> }
];
  
export default async function AdminSchoolPage() {
    return (
        <Container>
            <Box sx={{ m: 5 }}>
                <NavigateBackButton TextButtons={TextButtons} />
                <MarkdownNavigation />
            </Box>
        </Container>
    )
}