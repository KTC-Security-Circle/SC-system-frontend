"use client"

import { Typography } from "@mui/material";
import { Box, Grid, Stack } from "@mui/system";
import { ReactNode } from "react";

interface SimulatedChatMessage {
    prompt: ReactNode,
    response: ReactNode,
}
export default function FeaturePart({ title, description, reversed, simulatedChatMessages }: {
    title: ReactNode,
    description: ReactNode,
    reversed?: boolean | undefined,
    simulatedChatMessages: SimulatedChatMessage[]
}) {
    const isReversed = reversed ?? false;
    const descriptionAlign = isReversed ? "left" : "right";
    const textAlign = isReversed ? "right" : "left";
    const direction = isReversed ? "row-reverse" : "row";

    return <Grid container spacing={2} alignItems={"center"} direction={direction}>
        <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2} textAlign={{ xs: "center", md: descriptionAlign }}>
                <Typography fontSize={"1.2em"} fontWeight={"bold"}>{title}</Typography>
                <Typography>
                    {description}
                </Typography>
            </Stack>
        </Grid>
        <Grid size={6} alignItems={"center"} marginLeft={"auto"} marginRight={"auto"}>
            <Box sx={{ minWidth: 350, minHeight: 240, textAlign: { xs: "left", md: textAlign }, "background": "#fff", "borderRadius": "3px" }} p={3}>
                <Stack spacing={2} alignContent={"center"} sx={{ position: 'relative', overflow: 'hidden', maxHeight: '240px' }}>
                    {simulatedChatMessages.map((message, index) =>
                        <div key={index}>
                            <Typography>
                                {message.prompt}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {message.response}
                            </Typography>
                        </div>
                    )}
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '50px',
                            background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))',
                        }}
                    />
                </Stack>
            </Box>
        </Grid>
    </Grid>
}