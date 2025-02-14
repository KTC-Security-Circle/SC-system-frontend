"use client";
import { BackButton } from "@/types/navigateback";
import { KeyboardReturn } from '@mui/icons-material';
import DynamicInformation from "@/Components/DynamicInformation";

const TextButtons: BackButton [] = [
  { text: "戻る", color: "#616161", href: "/StudentInformation", icon: <KeyboardReturn /> }
];

const StudentInformation: React.FC = () => {
  return (
    <DynamicInformation TextButtons={TextButtons} />
  );
};

export default StudentInformation;