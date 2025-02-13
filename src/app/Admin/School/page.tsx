import MarkdownNavigation from "@/Components/MarkdownNavgation";
import { BackButton } from "@/types/navigateback";
import { NavigateBackButton } from "@/Components/NavigateBackButton";
import { Container } from "@mui/material";
import { KeyboardReturn } from '@mui/icons-material';

const TextButtons: BackButton [] = [
    { text: "戻る", color: "#616161", href: "/Admin", icon: <KeyboardReturn /> }
];
  
export default async function AdminSchoolPage() {
    return (
        <Container>
                <NavigateBackButton TextButtons={TextButtons} />
                <MarkdownNavigation />
        </Container>
    )
}