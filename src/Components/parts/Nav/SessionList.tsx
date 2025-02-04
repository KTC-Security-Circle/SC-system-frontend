import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { fetchSessionItems } from '@/hook/getSession';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {
    Box,
    CircularProgress,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Tooltip,
    Popover,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import Cookies from 'js-cookie';

interface SessionItem {
    id: number;
    session_name: string;
}

export const SessionList: React.FC = () => {
    const [items, setItems] = useState<SessionItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [activePopover, setActivePopover] = useState<number | null>(null);
    const [renameId, setRenameId] = useState<number | null>(null);
    const [newName, setNewName] = useState<string>('');
    const router = useRouter();
    const API_LINK = process.env.NEXT_PUBLIC_BACKEND_DEV_URL;
    const token = Cookies.get('access_token');
    const params = useParams();
    const currentSessionId = params?.id ? Number(params.id) : null;
    

    useEffect(() => {
        const loadSessions = async () => {
            setLoading(true);
            try {
                const data = await fetchSessionItems(); 
                if (Array.isArray(data)) {
                    setItems(data);
                } else if (data && Array.isArray(data.items)) {
                    setItems(data.items);
                } else {
                    setItems([]);
                }
            } catch (error) {
                console.error('Failed to fetch sessions:', error);
                setItems([]);
            } finally {
                setLoading(false);
            }
        };
        loadSessions();
    }, []);

    const handleSubmit = async (id: number) => {
        setLoading(true);
        try {
            await router.push(`/Chat/${id}`);
        } finally {
            setLoading(false);
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
        setActivePopover(id);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setActivePopover(null);
    };

    const handleRenameClick = (id: number) => {
        setRenameId(id);
        setNewName('');
    };

    const handleRenameCancel = () => {
        setRenameId(null);
        setNewName('');
        handleClose();
    };


    const handleDelete = async (id: number) => {
        try {
            await fetch(`${API_LINK}/api/delete/session/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            setItems(items.filter(item => item.id !== id)); 
        } catch (error) {
            console.error('Failed to delete session:', error);
        }finally {
            handleClose();
        }
    };

    const handleRenameSubmit = async (id: number) => {
        setLoading(true);
        try {
            await fetch(`${API_LINK}/api/update/session/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ session_name: newName }),
            });
            setItems(items.map(item => item.id === id ? { ...item, session_name: newName } : item)); 
        } catch (error) {
            console.error('Failed to rename session:', error);
        } finally {
            setRenameId(null);
            setNewName('');
            setLoading(false);
            handleClose();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement> ) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleRenameSubmit(renameId!);
        }
      };
    return (
        <Box sx={{ overflowY: 'auto', height: '100%' }}>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                    <CircularProgress size={24} />
                </Box>
            ) : (
                <List>
                    {items.map((item) => (
                        <ListItem key={item.id} disablePadding
                        sx={{
                            backgroundColor: item.id === currentSessionId ? 'rgba(25, 118, 210, 0.15)' : 'transparent',
                            borderLeft: item.id === currentSessionId ? '4px solid #1976d2' : 'none',
                        }}
                        >
                            <ListItemButton onClick={() => handleSubmit(item.id)}>
                                <ListItemText primary={item.session_name}/>
                            </ListItemButton>
                            <Tooltip title="More options" placement="top" enterDelay={500} arrow>
                                <>
                                    <IconButton onClick={(e) => handleClick(e, item.id)}>
                                        <MoreHorizIcon />
                                    </IconButton>
                                    <Popover
                                        id={String(item.id)}
                                        open={activePopover === item.id && Boolean(anchorEl)}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <List sx={{ pr: 1, pl: 1 }}>
                                            <ListItem disablePadding>
                                                <ListItemButton onClick={() => handleRenameClick(item.id)}>
                                                    <ListItemIcon>
                                                        <DriveFileRenameOutlineIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Rename" />
                                                </ListItemButton>
                                            </ListItem>
                                            <ListItem disablePadding>
                                                <ListItemButton onClick={() => handleDelete(item.id)}>
                                                    <ListItemIcon>
                                                        <DeleteIcon sx={{ color: '#f44336' }} />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Delete" />
                                                </ListItemButton>
                                            </ListItem>
                                        </List>
                                    </Popover>
                                </>
                            </Tooltip>
                        </ListItem>
                    ))}
                </List>
            )}
            <Dialog
                open={renameId !== null}
                onClose={handleRenameCancel}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>セッション名の変更</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        label="新しいセッション名"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        sx={{ mt: 1 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRenameCancel}>キャンセル</Button>
                    <Button 
                        onClick={() => handleRenameSubmit(renameId!)}
                        variant="contained"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : '変更'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
