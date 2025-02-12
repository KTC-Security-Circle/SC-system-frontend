"use client"

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import FeaturePart from "./parts/LP/FeaturePart";
import LPFooter from "./parts/LP/Footer";
import UseButton from "./parts/LP/UseButton";

const LANDING_TYPE_DELAY = 3000

export default function LandingPageComponent() {
    const featuresRef = useRef<HTMLDivElement>(null);

    const scrollToFeatures = () => {
        if (featuresRef.current) {
            featuresRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    return <Box sx={{ backgroundColor: "#e6ffff", paddingTop: "2em" }}>
        <Box sx={{ textAlign: 'center', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: "1.5em" }}>
            <Box sx={{ marginTop: '1em', justifyItems: "center", minHeight: "80vh" }}>
                <Typography fontSize={"2em"} fontWeight={"bold"} style={{
                    textDecoration: "underline",
                    textDecorationColor: "yellow",
                    textDecorationThickness: "0.5em",
                    textUnderlineOffset: "-0.3em"
                }}>
                    教師と学⽣をつなぎ、学びの距離をゼロにする。
                </Typography>
                <Typography style={{ fontSize: '1.4em', display: 'inline-block' }} fontWeight={"bold"}>
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
                </Typography>
                <Image src={"/scsystemlogo.png"} alt="placeholder" width={300} height={300} />
                <UseButton />
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
                component={Link}
                href="#features"
                scroll={false}
                onClick={scrollToFeatures}
            >
                <Typography sx={{ mb: 1 }}>
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
                <Stack spacing={8}>
                    <FeaturePart
                        title="チャットインターフェース"
                        description={
                            <>
                                生成AIを活用した流れるような会話で<br />
                                自然言語を使って簡単に指示できます
                            </>
                        }
                        simulatedChatMessages={[
                            {
                                prompt: "何ができる？",
                                response: (
                                    <>
                                        たくさんのことをお手伝いできます。
                                        <br />
                                        例えば、申請の作成、学校情報の検索、授業質問などにお答えできます。
                                    </>
                                )
                            },
                            {
                                prompt: "今日ってなんの授業があったっけ？",
                                response: (
                                    <>
                                        デッサン、数学、英語の授業があります。
                                        <br />
                                        本日のデザインの授業は休講です。
                                    </>
                                )
                            },
                            {
                                prompt: "今日の夕飯何にしよう？",
                                response: (
                                    <>
                                        今日の夕飯ですね。マクドナルドはいかがですか？ポテトが美味しいですよ。
                                        <br />
                                        京都デザイン&テクノロジー専門学校から、五条通を経由して徒歩15分です。
                                        <br />
                                        京都市営地下鉄「五条駅」の近くに位置しています。授業終わりに寄ってみてはいかがでしょう。
                                    </>
                                )
                            }
                        ]}
                    />

                    <FeaturePart
                        title="各種申請もお手伝い"
                        description={
                            <>
                                申請内容を自動で判断<br />
                                質問に答えるだけで、各種申請が完了します
                            </>
                        }
                        reversed
                        simulatedChatMessages={[
                            {
                                prompt: "電車が遅延したから公欠申請を出したい",
                                response: (
                                    <>
                                        はい、公欠申請についてのお手伝いですね。
                                        <br />
                                        どの授業の公欠申請を出しますか？
                                    </>
                                )
                            },
                            {
                                prompt: "1限にあるデザインの授業",
                                response: (
                                    <>
                                        かしこまりました。1限目、佐藤先生の「デザイン概論」について、
                                        <br />
                                        公共交通機関の遅延を理由に公欠を申請します。
                                        <br />
                                        よろしいですか？
                                    </>
                                )
                            },
                            {
                                prompt: "2限のJavaの授業も行けないから公欠出してほしい",
                                response: (
                                    <>
                                        かしこまりました。以下の授業について、公共交通機関の遅延を理由に公欠を申請します。
                                        <br />
                                        1. 1限目、佐藤先生の「デザイン概論」
                                        <br />
                                        2. 2限目、田中先生の「Javaプログラミング」
                                        <br />
                                        よろしいですか？
                                    </>
                                )
                            }
                        ]}
                    />
                    <FeaturePart
                        title="学校情報の検索"
                        description={
                            <>
                                わからないことはAIに聞いてみましょう<br />
                                学校情報を検索し、情報をもとに回答します
                            </>
                        }
                        simulatedChatMessages={[
                            {
                                prompt: "京都テックってどんな学校？",
                                response: (
                                    <>
                                        京都デザイン&テクノロジー専門学校は、京都府京都市下京区に位置する専門学校です。
                                        <br />
                                        IT、ゲーム制作、esportsといった分野に特化しています。
                                    </>
                                )
                            },
                            {
                                prompt: "どんな専攻があるの？",
                                response: (
                                    <>
                                        UnityやUnreal Engineといったゲーム制作について学ぶ「ゲームクリエイター専攻」や、
                                        <br />
                                        PythonやWeb開発などITに関する知識を網羅的に学ぶ「ITプログラマー専攻」、
                                        <br />
                                        ゲームの戦略やマネジメントについて学ぶ「esportsプロマネジメント専攻」などがあります。
                                    </>
                                )
                            }
                        ]}
                    />
                </Stack>
            </Box>

            <Box sx={{ justifyItems: "center" }} marginY={"2em"}>
                <Typography fontSize={"2em"} fontWeight={"bold"}>
                    学校生活を、もっと便利に。
                </Typography>
                <Typography fontSize={"1.1em"}>AIの力で、学生生活をもっとサポート。</Typography>
                <UseButton />
            </Box>

            <LPFooter />
        </Box>
    </Box>
}