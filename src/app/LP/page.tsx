"use client";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { motion } from "framer-motion";
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';


const LANDING_TYPE_DELAY = 3000

export default function LandingPage() {
    const featuresRef = useRef<HTMLDivElement>(null);

    const scrollToFeatures = () => {
        if (featuresRef.current) {
            featuresRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    return <>
        <Box sx={{ textAlign: 'center', fontWeight: 'bold', margin: '1em', marginTop: '2.5em', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: "1.5em" }}>
            <Box sx={{ marginTop: '1em', justifyItems: "center", minHeight: "80vh" }}>
                <Typography fontSize={"2em"} fontWeight={"bold"} style={{
                    textDecoration: "underline",
                    textDecorationColor: "yellow",
                    textDecorationThickness: "0.5em",
                    textUnderlineOffset: "-0.3em"
                }}>
                    教師と学⽣をつなぎ、学びの距離をゼロにする。
                </Typography>
                <p style={{ fontSize: '1.4em', display: 'inline-block' }}>
                    <TypeAnimation
                        preRenderFirstString
                        sequence={[
                            "公欠申請",
                            LANDING_TYPE_DELAY,
                            "教室利用申請",
                            LANDING_TYPE_DELAY,
                            "学校情報の検索",
                            LANDING_TYPE_DELAY,
                            "授業質問",
                            LANDING_TYPE_DELAY,
                            "学校からのお知らせ",
                            LANDING_TYPE_DELAY,
                            "業務効率化",
                            LANDING_TYPE_DELAY
                        ]}
                        speed={50}
                        repeat={Infinity}
                        cursor={false}
                        style={{ color: "blue", textDecoration: "underline" }}
                    />
                    も、
                    <br />
                    AIにおまかせ。
                </p>
                <Image src={"/scsystemlogo.png"} alt="placeholder" width={300} height={300} />
                <Button variant="contained" color="primary" style={{ marginTop: '1.5em', width: "9em", height: "2.5em", fontSize: "1.05em" }}>使ってみる</Button>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: "2em",
                }}
            >
                <Typography sx={{ mb: 1 }} component={Link} href="#features" scroll={false} onClick={scrollToFeatures}>
                    もっと詳しく
                </Typography>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <KeyboardArrowDownIcon fontSize="large" />
                </motion.div>
            </Box>

            <Box sx={{ justifyItems: "center" }}>
                <Typography fontSize={"2em"} fontWeight={"bold"} style={{
                    textDecoration: "underline",
                    textDecorationColor: "yellow",
                    textDecorationThickness: "0.5em",
                    textUnderlineOffset: "-0.3em"
                }}
                    gutterBottom
                    id="features"
                    ref={featuresRef}>
                    機能紹介
                </Typography>
                <Stack spacing={2}>
                    <Grid container spacing={2} alignItems={"center"}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Stack spacing={2} textAlign={{ xs: "center", md: "right" }}>
                                <Typography fontSize={"1.2em"} fontWeight={"bold"}>チャットインターフェース</Typography>
                                <Typography>
                                    生成AIを活用した流れるような会話で、<br />
                                    自然言語を使って簡単に指示できます。
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid size={6} alignItems={"center"} marginLeft={"auto"} marginRight={"auto"}>
                            <Image src="https://placehold.co/350x240/png" width={350} height={240} alt="placeholder" />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} alignItems={"center"} direction={{ xs: "column", md: "row-reverse" }}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Stack spacing={2} textAlign={{ xs: "center", md: "left" }}>
                                <Typography fontSize={"1.2em"} fontWeight={"bold"}>各種申請もお手伝い</Typography>
                                <Typography>
                                    申請内容を自動で判断。<br />
                                    質問に答えるだけで、各種申請が完了します。
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid size={6} alignItems={"center"} marginLeft={"auto"} marginRight={"auto"}>
                            <Image src="https://placehold.co/350x240/png" width={350} height={240} alt="placeholder" />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} alignItems={"center"}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Stack spacing={2} textAlign={{ xs: "center", md: "right" }}>
                                <Typography fontSize={"1.2em"} fontWeight={"bold"}>学校情報の検索</Typography>
                                <Typography>
                                    わからないことはAIに聞いてみましょう。<br />
                                    学校情報を検索し、情報をもとに回答します。
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid size={6} alignItems={"center"} marginLeft={"auto"} marginRight={"auto"}>
                            <Image src="https://placehold.co/350x240/png" width={350} height={240} alt="placeholder" />
                        </Grid>
                    </Grid>
                </Stack>
            </Box>

            <Box sx={{ justifyItems: "center" }} marginY={"2em"}>
                <Typography fontSize={"2em"} fontWeight={"bold"}>
                    学校生活を、もっと便利に。
                </Typography>
                <Typography fontSize={"1.1em"}>AIの力で、学生生活をもっとサポート。</Typography>
                <Button variant="contained" color="primary" style={{ marginTop: '1.5em', width: "9em", height: "2.5em", fontSize: "1.05em" }}>使ってみる</Button>
            </Box>
        </Box>
    </>
}