import { LockPerson, People, School } from '@mui/icons-material';
import { Container } from "@mui/material";
import { Stack } from "@mui/system";
import { ReactNode } from 'react';
import AdminCard from "./parts/AdminCard";

const ADMIN_PAGES = [
    {
        title: <CardTitle title={"学生管理ページ"} icon={<People />} />,
        description: "学生情報を閲覧・編集・削除します。",
        href: "/Admin/Students"
    },
    {
        title: <CardTitle title={"教員管理ページ"} icon={<LockPerson />} />,
        description: "教員情報を閲覧・編集・削除します。",
        href: "/Admin/Teachers"
    },
    {
        title: <CardTitle title={"学校情報ページ"} icon={<School />} />,
        description: "学校情報を閲覧・編集します。",
        href: "/Admin/School"
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

export default  async function AdminPageComponent() {
    return (
        <Container>
            {ADMIN_PAGES.map((page, index) => (
                <AdminCard
                    key={index}
                    title={page.title}
                    description={page.description}
                    href={page.href}
                />
            ))}
        </Container>
    );
}
