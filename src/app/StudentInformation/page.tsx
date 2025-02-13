"use client";

import { BackButton } from "@/types/navigateback";
import { NavigateBackButton } from "@/Components/NavigateBackButton";
import { InformationList } from "@/Components/InformationList";
import { KeyboardReturn } from '@mui/icons-material';
import { Container } from "@mui/material";

const LinkAdress: string = "StudentInformation";

const TextButtons: BackButton [] = [
  { text: "戻る", color: "#616161", href: "/Chat", icon: <KeyboardReturn /> }
];

export default function Information() {

  return (
    <Container>
        <NavigateBackButton TextButtons={TextButtons} />
        <InformationList LinkAdress={LinkAdress} />
    </Container>
  );
}
