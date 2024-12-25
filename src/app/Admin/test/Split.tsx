import React from "react";
import Split from "react-split";
import SchoolInfoCreateForm from "../SchoolInfo/SchoolInfoCreateForm";
import SchoolInfoEditForm from "../SchoolInfo/SchoolInfoEditForm";
import { SchoolInfoUpdateDTO, SchoolInfoCreateDTO } from "./SchoolInfoDTO";

interface SplitProps {
  sizes: number[];
  createInitialValues: SchoolInfoCreateDTO;
  editInitialValues: SchoolInfoUpdateDTO;
  onCreateSuccess: (data: any) => void;
  onEditSuccess: (data: any) => void;
  currentUser: string;
  editId: number;
}

export const SplitWindow: React.FC<SplitProps> = ({
  sizes,
  createInitialValues,
  editInitialValues,
  onCreateSuccess,
  onEditSuccess,
  currentUser,
  editId,
}) => {
  return (
    <Split className="flex ms-6" sizes={sizes}>
      <div>
        <SchoolInfoCreateForm
          onSubmitSuccess={onCreateSuccess}
          currentUser={currentUser}
        />
      </div>
      <div>
        <SchoolInfoEditForm
          initialData={editInitialValues}
          onSubmitSuccess={onEditSuccess}
          currentUser={currentUser}
          id={editId}
        />
      </div>
    </Split>
  );
};
