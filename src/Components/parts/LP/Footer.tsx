"use client"

import { Button, Card, CardContent, Fade, Typography } from "@mui/material"
import { Box, Grid, Stack } from "@mui/system"
import Image from "next/image"
import { useRef, useState } from "react"

function MemberCard({ title, members, children }: { title: string, members: string[], children?: React.ReactNode | undefined }) {
    return <Card sx={{ height: "100%" }}>
        <CardContent>
            <Stack alignItems={"center"}>
                <Typography variant="h6">
                    {title}
                </Typography>
                {children}
                <Typography gutterBottom>
                    {members.map((member) => <>{member}<br /></>)}
                </Typography>
            </Stack>

        </CardContent>
    </Card>
}
export default function LPFooter() {
    const [open, setOpen] = useState(false);
    const membersRef = useRef<HTMLDivElement>(null);

    return <Box sx={{ minHeight: "8rem", bgcolor: "white", paddingY: "2em", width: "100%" }}>
        <Typography variant="h5" gutterBottom>開発メンバー</Typography>
        <Fade in={open} onEnter={() => membersRef.current?.scrollIntoView({ behavior: "smooth" })} unmountOnExit>
            <div ref={membersRef}>
                <Stack margin={4} spacing={2} alignItems={"center"}>
                    <Grid container spacing={2} width={"100%"} marginLeft={"auto"} marginRight={"auto"}>
                        <Grid size={{ xs: 12, lg: 3 }}>
                            <MemberCard title="開発リーダー" members={["木本侑希"]} />
                        </Grid>
                        <Grid size={{ xs: 12, lg: 3 }}>
                            <MemberCard title="財務担当・運用保守" members={["浅見一輝", "木﨑翔太"]} />
                        </Grid>
                        <Grid size={{ xs: 12, lg: 3 }}>
                            <MemberCard title="フロントエンド" members={["北川晃汰", "田中良日斗", "安達大悟"]} />
                        </Grid>
                        <Grid size={{ xs: 12, lg: 3 }}>
                            <MemberCard title="バックエンド開発" members={["安田丈(API担当)", "上野透夜(API担当)", "久保陽生(生成AI担当)"]} />
                        </Grid>
                    </Grid>
                </Stack>

                <Typography variant="h5" gutterBottom>ロゴ・アイコン提供</Typography>
                <Stack margin={4} spacing={2} alignItems={"center"}>
                    <Grid container spacing={2} width={"50%"} marginLeft={"auto"} marginRight={"auto"}>
                        <Grid size={{ xs: 12, lg: 6 }}>
                            <MemberCard title="メインロゴ" members={["田中大雅 (2年 スーパーCG映像クリエイター専攻)"]}>
                                <Image src={"/scsystemlogo.png"} alt="placeholder" width={100} height={100} />
                            </MemberCard>
                        </Grid>
                        <Grid size={{ xs: 12, lg: 6 }}>
                            <MemberCard title="AIアイコン" members={["大島優輝 (1年 スーパーCG映像クリエイター専攻)"]}>
                                <Image src={"/ai_icon.png"} alt="placeholder" width={100} height={100} />
                            </MemberCard>
                        </Grid>
                    </Grid>
                </Stack>
            </div>
        </Fade>
        {open === false && <Button onClick={() => setOpen(true)}>開発メンバーの一覧を開く</Button>}
    </Box>
}