import React from "react";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import AndroidIcon from '@mui/icons-material/Android';

interface ChatTemplateProps {
    title: string;
    icon: React.ElementType;
    content: string;
    message: string;
    onSelect?: (msg:string)=>void;
}

interface ChatTemplateListProps {
    onTemplateSelect?: (msg:string)=>void;
}

export const chatTemplates: ChatTemplateProps[] = [
    {
        title: "学校情報について",
        icon: SchoolIcon,
        content: "学校の情報についての質問を受け付けています。",
        message: "学校にはどのような専攻がありますか"
    },
    {
        title: "申請について",
        icon: RequestPageIcon,
        content: "申請について申し込むことが出来ます。",
        message: "電車が遅延したので申請を出したい"
    },
    {
        title: "AIについて",
        icon: AndroidIcon,
        content: "AIについての質問をします",
        message: "学校のイベントについて教えてください"
    }
];

function ChatTemplateCard({ title, icon: Icon, content, message, onSelect }: ChatTemplateProps) {
    return (
        <Card sx={{ width: 300, height:200, m: 2 }} onClick={() => onSelect && onSelect(message)}>
            <CardHeader title={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Icon sx={{ mr: 1 }} />
                    <Typography variant="h5">{title}</Typography>
                </Box>
            } />
            <CardContent>
                <Typography variant="h6" gutterBottom>{content}</Typography>
            </CardContent>
        </Card>
    );
}

export default function ChatTemplateList({ onTemplateSelect }: ChatTemplateListProps) {
    return (
        <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            {chatTemplates.map((template, index) => (
                <ChatTemplateCard key={index} {...template} onSelect={onTemplateSelect} />
            ))}
        </Box>
    );
}
