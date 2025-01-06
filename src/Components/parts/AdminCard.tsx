import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { ReactNode } from "react";

export default async function AdminCard({ title, description, href }: { title: ReactNode, description: ReactNode, href: string }) {
    return (
        <Card>
            <CardActionArea LinkComponent={"a"} href={href}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )

}