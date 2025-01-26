import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useIntersection } from '@/hook/sessionList';
import { fetchSessionItems } from '@/hook/getSession';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { PopoverItem } from '@/types/drawer';
import ArchiveIcon from '@mui/icons-material/Archive';
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
} from '@mui/material';

interface SessionItem {
    id: number;
    session_name: string;
}

const popoverLists: PopoverItem[] = [
    { text: 'rename', icon: <DriveFileRenameOutlineIcon /> },
    { text: 'archive', icon: <ArchiveIcon /> },
    { text: 'delete', icon: <DeleteIcon sx={{ color: '#f44336' }} /> },
];

export const SessionList: React.FC = () => {
    const [items, setItems] = useState<SessionItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [callback, isIntersecting] = useIntersection();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [activePopover, setActivePopover] = useState<number | null>(null);
    const router = useRouter();

    const handleSubmit = (id: number): void => {
        router.push(`/Chat/${id}`);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        setAnchorEl(e.currentTarget);
        setActivePopover(id);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setActivePopover(null);
    };

    useEffect(() => {
        const loadSessionItems = async () => {
            setLoading(true);
            try {
                const newItems = await fetchSessionItems(10); 
                setItems((prev) => [...prev, ...newItems]);
            } catch (error) {
                console.error('Failed to fetch session items:', error);
            } finally {
                setLoading(false);
            }
        };

        if (isIntersecting) {
            loadSessionItems();
        }
    }, [isIntersecting]);

    return (
        <Box>
            <List>
                {items.map((item) => (
                    <ListItem key={item.id} disablePadding>
                        <ListItemButton onClick={() => handleSubmit(item.id)}>
                            <ListItemText primary={item.session_name} />
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
                                        {popoverLists.map((popoverItem) => (
                                            <ListItem key={popoverItem.text} disablePadding>
                                                <ListItemButton>
                                                    <ListItemIcon>{popoverItem.icon}</ListItemIcon>
                                                    <ListItemText primary={popoverItem.text} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Popover>
                            </>
                        </Tooltip>
                    </ListItem>
                ))}
            </List>
            {loading && <CircularProgress /> }
            <div ref={callback} />
        </Box>
    );
};