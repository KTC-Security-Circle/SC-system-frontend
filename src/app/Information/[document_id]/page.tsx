"use client";
import { BackButton } from "@/types/navigateback";
import { KeyboardReturn } from '@mui/icons-material';
import DynamicInformation from "@/Components/DynamicInformation";

const TextButtons: BackButton [] = [
  { text: "戻る", color: "#616161", href: "/Information", icon: <KeyboardReturn /> }
];

const Information: React.FC = () => {
  return (
    <DynamicInformation TextButtons={TextButtons} />
  );
};

export default Information;