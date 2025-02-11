'use client';
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import EditIcon from '@mui/icons-material/Edit';

interface Data {
  id: number;
  name: string;
  studentNumber: string;
  studentEmail: string;
  major: string;
}

function createData(id: number, name: string, studentNumber: string, studentEmail: string, major: string): Data {
  return {
    id,
    name,
    studentNumber,
    studentEmail,
    major
  };
}
//testdata
const rows = [
  createData(1, "田中 良日斗", "2243030006", "KTC2243030006@edu.kyoto-tech.ac.jp", "ホワイトハッカー専攻"),
  createData(2, "木本 侑希", "2243020002", "KTC2243020002@edu.kyoto-tech.ac.jp", "スーパーAIクリエイター専攻"),
  createData(3, "浅見 一輝", "2243030001", "KTC2243030001@edu.kyoto-tech.ac.jp", "スーパーAIクリエイター専攻"),
  createData(4, "木崎 翔太", "2243030002", "KTC2243030002@edu.kyoto-tech.ac.jp", "スーパーAIクリエイター専攻"),
  createData(5, "梅原 凱", "2243010002", "KTC2243010002@edu.kyoto-tech.ac.jp", "スーパーAIクリエイター専攻")
];


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export const SimpleTable: React.FC = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data> ("studentNumber");

  const createSortHandler = (property: keyof Data) => (
    event: React.MouseEvent<unknown>
  ) => {
    const isAsc = orderBy === property && order === "asc"; 
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === "name"}
                direction={orderBy === "name" ? order : "asc"}
                onClick={createSortHandler("name")}
              >
                名前
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "studentNumber"}
                direction={orderBy === "studentNumber" ? order : "asc"}
                onClick={createSortHandler("studentNumber")}
              >
                学籍番号
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "studentEmail"}
                direction={orderBy === "studentEmail" ? order : "asc"}
                onClick={createSortHandler("studentEmail")}
              >
                学校メールアドレス
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "major"}
                direction={orderBy === "major" ? order : "asc"}
                onClick={createSortHandler("major")}
              >
                専攻
              </TableSortLabel>
            </TableCell>
            <TableCell>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.sort(getComparator(order, orderBy)).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.studentNumber}</TableCell>
                <TableCell>{row.studentEmail}</TableCell>
                <TableCell>{row.major}</TableCell>
                <TableCell><EditIcon/></TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
