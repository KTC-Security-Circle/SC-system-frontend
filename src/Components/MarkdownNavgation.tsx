import { FindInPage, OpenInNew, BorderColor } from '@mui/icons-material';
import { Container } from "@mui/material";
import { Stack } from "@mui/system";
import { ReactNode } from 'react';
import AdminCard from "./parts/AdminCard";


const ADMIN_PAGES = [
    {
        title: <CardTitle title={"学校情報の閲覧"} icon={<FindInPage />} />,
        description: "学校情報を閲覧します。",
        href: "/Information"
    },
    {
        title: <CardTitle title={"学校情報の新規作成"} icon={<OpenInNew />} />,
        description: "学校情報の新規作成をします。",
        href: "/Markdown"
    },
    {
        title: <CardTitle title={"学校情報の編集"} icon={<BorderColor />} />,
        description: "学校情報を編集・削除します。",
        href: "/Markdown"
    }
    ]
    
async function CardTitle({ title, icon }: { title: string, icon: ReactNode }) {
    return (
        <Stack spacing={1} direction={"row"} alignItems={"center"} justifyItems={"center"}>
            {icon}
            <div>
                {title}
            </div>
        </Stack>
    )
}

export default async function AdminPageComponent() {
    return (
        <Container>
            <Stack sx={{ m: 5 }} spacing={2} direction={{ xs: "column", lg: "row" }}>
                {ADMIN_PAGES.map((page) => {
                    return <AdminCard {...page} />
                })}
            </Stack>
        </Container>
    )
}