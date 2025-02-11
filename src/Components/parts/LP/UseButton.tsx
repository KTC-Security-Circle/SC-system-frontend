"use client";

import { Button } from "@mui/material";
import Link from "next/link";

export default function UseButton() {
    return <Button variant="contained" color="primary" style={{ marginTop: '1.5em', width: "9em", height: "2.5em", fontSize: "1.05em" }} LinkComponent={Link} href="/Home">使ってみる</Button>
}