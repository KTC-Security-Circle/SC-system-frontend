"use client";

import { BackButton } from "@/types/navigateback";
import { NavigateBackButton } from "@/Components/NavigateBackButton";
import { StudentInformationList } from "@/Components/StudentInformationList";
import { KeyboardReturn } from '@mui/icons-material';
import { Container } from "@mui/material";

const LinkAdress: string = "StudentInformation";
const PageTitle: string = "学校情報の閲覧";

const TextButtons: BackButton [] = [
  { text: "戻る", color: "#616161", href: "/Chat", icon: <KeyboardReturn /> }
];

export default function Information() {

  return (
    <Container>
        <NavigateBackButton TextButtons={TextButtons} />
        <StudentInformationList LinkAdress={LinkAdress} PageTitle={PageTitle} />
    </Container>
  );
}
