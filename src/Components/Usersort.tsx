'use client'
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { Modal, Box, Button, TextField, Typography } from "@mui/material";

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

type Order = "asc" | "desc";

export const UserTable: React.FC = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("name");
  const [rows, setRows] = useState<Data[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Data | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);

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
      await axios.put(`${API_LINK}/api/update/user/${selectedUser.id}`, selectedUser, {
        headers: {
          withCredentials: true,
          'Authorization': `Bearer ${Cookies.get('access_token')}`,
          'Content-Type': 'application/json',
        },
      });
      setRows(rows.map(row => (row.id === selectedUser.id ? selectedUser : row)));
      setOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      <TableContainer max-width="sm">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Major</TableCell>
              <TableCell>Authority</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.major}</TableCell>
                <TableCell>{row.authority}</TableCell>
                <TableCell>
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
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            value={selectedUser?.name || ""}
            onChange={(e) => setSelectedUser({ ...selectedUser!, name: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={selectedUser?.email || ""}
            onChange={(e) => setSelectedUser({ ...selectedUser!, email: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Major"
            value={selectedUser?.major || ""}
            onChange={(e) => setSelectedUser({ ...selectedUser!, major: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Authority"
            value={selectedUser?.authority || ""}
            onChange={(e) => setSelectedUser({ ...selectedUser!, authority: e.target.value })}
          />
          <Button onClick={handleSave} variant="contained" color="primary" sx={{ mt: 2 }}>保存</Button>
          <Button onClick={() => setOpen(false)} variant="outlined" sx={{ mt: 2, ml: 2 }}>キャンセル</Button>
        </Box>
      </Modal>
    </>
  );
};
