'use client'
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { Modal, Box, Button, TextField, Typography, TableSortLabel } from "@mui/material";

const API_LINK = process.env.NEXT_PUBLIC_BACKEND_DEV_URL;

const fetchSessionItems = async () => {
  const token = Cookies.get('access_token');
  if (!token) {
    throw new Error('No token found');
  }
  const res = await axios.get(`${API_LINK}/api/view/user`, {
    headers: {
      withCredentials: true,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return res.data;
};

interface Data {
  id: string;
  name: string;
  email: string;
  authority: string;
  major: string;
}

interface createData {
  id: string;
  name: string;
  email: string;
  password: string,
  authority: string;
  major: string;

}

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

export const UserTable: React.FC = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data> ("name");
  const [rows, setRows] = useState<Data[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Data | null>(null);
  const [createopen, createOpen] = useState(false);
  const [createdUser, setCleatedUser] = useState<createData | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);

  const createSortHandler = (property: keyof Data) => (
    event: React.MouseEvent<unknown>
  ) => {
    const isAsc = orderBy === property && order === "asc"; 
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSessionItems();
        setRows(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleEditClick = (user: Data) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handlecreateClick = () => {
    createOpen(true);
  };

  const handleCreate = async () => {
    //api/signupを作成
  }

  const handleDeleteClick = async (id: string) => {
    if (window.confirm("本当に削除しますか？")) {
      try {
        await axios.delete(`${API_LINK}/api/delete/user/${id}`, {
          headers: {
            withCredentials: true,
            'Authorization': `Bearer ${Cookies.get('access_token')}`,
          },
        });
        setRows(rows.filter(row => row.id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleSave = async () => {
    if (!selectedUser) return;
  
    try {
      const originalUser = rows.find(row => row.id === selectedUser.id);
      if (!originalUser) return;
  
      // 変更されていないフィールドを null にする
      const updatedFields = Object.keys(originalUser).reduce((acc, key) => {
        if (key !== "id" && (selectedUser as any)[key] === (originalUser as any)[key]) {
          acc[key] = null;
        } else if (key !== "id") {
          acc[key] = (selectedUser as any)[key];
        }
        return acc;
      }, {} as Record<string, any>);
  
      const payload = { ...updatedFields, password: null }; // パスワードも明示的に null にする
  
      console.log("送信データ:", JSON.stringify(payload, null, 2));
  
      await axios.put(`${API_LINK}/api/update/user/${selectedUser.id}`, payload, {
        headers: {
          withCredentials: true,
          "Authorization": `Bearer ${Cookies.get("access_token")}`,
          "Content-Type": "application/json",
        },
      });
  
      // フロントエンド側のデータも更新
      setRows(rows.map(row => (row.id === selectedUser.id ? { ...row, ...updatedFields } : row)));
      setOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  
  //handleCreateClick未実装
  return (
    <>
      <Box sx={{ maxWidth: "80%", margin: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6">ユーザー一覧</Typography>
        <Button variant="contained" color="primary" onClick={handlecreateClick}> 
          新規作成
        </Button>
      </Box>
      <TableContainer sx={{ maxWidth: "80%", margin: "auto" }}>
      <Table sx={{ '& .MuiTableRow-root': { borderBottom: '2px solid var(--primary-blue)' } }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel 
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={createSortHandler("name")}>
                    Name
                  </TableSortLabel>
                </TableCell>
              <TableCell>
                <TableSortLabel 
                  active={orderBy === "email"}
                  direction={orderBy === "email" ? order : "asc"}
                  onClick={createSortHandler("email")}>
                    Email
                  </TableSortLabel>
                </TableCell>
              <TableCell align="center">
                <TableSortLabel 
                  active={orderBy === "authority"}
                  direction={orderBy === "authority" ? order : "asc"}
                  onClick={createSortHandler("authority")}>
                    Authority
                  </TableSortLabel>
                </TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.sort(getComparator(order, orderBy)).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell align="center">{row.authority}</TableCell>
                <TableCell align="right">
                  <EditIcon onClick={() => handleEditClick(row)} style={{ cursor: 'pointer', marginRight: 10 }} />
                  <DeleteIcon onClick={() => handleDeleteClick(row.id)} style={{ cursor: 'pointer', color: 'red' }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant="h6">ユーザー編集</Typography>
          <TextField fullWidth margin="normal" label="Name" value={selectedUser?.name || ""} onChange={(e) => setSelectedUser({ ...selectedUser!, name: e.target.value })} />
          <TextField fullWidth margin="normal" label="Email" value={selectedUser?.email || ""} onChange={(e) => setSelectedUser({ ...selectedUser!, email: e.target.value })} />
          <TextField fullWidth margin="normal" label="Authority" value={selectedUser?.authority || ""} onChange={(e) => setSelectedUser({ ...selectedUser!, authority: e.target.value })} />
          <Button onClick={handleSave} variant="contained" color="primary" sx={{ mt: 2 }}>保存</Button>
          <Button onClick={() => setOpen(false)} variant="outlined" sx={{ mt: 2, ml: 2 }}>キャンセル</Button>
        </Box>
      </Modal>

      <Modal open={createopen} onClose={() => createOpen(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant="h6">ユーザー作成</Typography>
          <TextField fullWidth margin="normal" label="Name" value={createdUser?.name || ""} onChange={(e) => setCleatedUser({ ...createdUser!, name:e.target.value })}/>
          <TextField fullWidth margin="normal" label="Email" value={createdUser?.email || ""} onChange={(e) => setCleatedUser({ ...createdUser!, email:e.target.value })}/>
          <TextField fullWidth margin="normal" label="Password" value={createdUser?.password || ""} onChange={(e) => setCleatedUser({ ...createdUser!, password:e.target.value })}/>
          <TextField fullWidth margin="normal" label="Authority" value={createdUser?.authority || ""} onChange={(e) => setCleatedUser({ ...createdUser!, authority:e.target.value })}/>
          <Button onClick={handleCreate} variant="contained" color="primary" sx={{ mt: 2 }}>作成</Button>
          <Button onClick={() => createOpen(false)} variant="outlined" sx={{ mt: 2, ml: 2 }}>キャンセル</Button>
        </Box>
      </Modal>
    </>
  );
};
