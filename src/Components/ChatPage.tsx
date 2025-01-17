"use client"

import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { ChatComponent } from '@/Components/parts/Chat/Chat';
import { DrawerContent } from './DrawerContent';
import { ChatAppbar } from '@/Components/parts/ChatAppbar';
import { DrawerItem, PopoverItem, SessionItem } from '../types/drawer';

import AddCommentIcon from '@mui/icons-material/AddComment';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { 
  Box,
  CssBaseline,
  Drawer,
  IconButton,
} from '@mui/material';

const drawerWidth = 240;

interface Props {
  window?: { innerWidth: number, innerHeight: number };
}

export const Chatwindow: React.FC<Props> = (props: Props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // popover
  const [activePopover, setActivePopover] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // モバイル用の開閉状態
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pcOpen, setPcOpen] = useState(false);

  // リストの高さ
  const [height, setHeight] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setPcOpen(false);
      } else {
        setPcOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (listRef.current) {
      setHeight(listRef.current.clientHeight);
    }
  }, []);

  if (!isClient) {
    return null; // SSR中は何もレンダリングしない
  }

  const handleDrawerToggle = () => {
    if (window.innerWidth >= 600) {
      setPcOpen(!pcOpen);
    } else {
      setMobileOpen(!mobileOpen);
    }
  };

  const handlePopoverOpen = (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    setActivePopover(id);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setActivePopover(null);
    setAnchorEl(null);
  };

  const drawerButton: DrawerItem[] = [
    { text: 'サイドバーボタン', icon: <AlignHorizontalLeftIcon /> ,tips: '閉じる', onClick: handleDrawerToggle },
    { text: 'newsession', icon: <AddCommentIcon /> ,tips: '新しいセッションを作成' },
  ];

  const menuItems: DrawerItem[] = [
    { text: 'button1', icon: <AlignHorizontalLeftIcon /> ,tips: 'ボタン１' },
    { text: 'button2', icon: <AlignHorizontalLeftIcon /> ,tips: 'ボタン２' },
    { text: 'button3', icon: <AlignHorizontalLeftIcon /> ,tips: 'ボタン3' },
  ];

  const sessionItems: SessionItem[] = [
    { id: '1', text: 'session1', icon: <MoreHorizIcon /> },
    { id: '2', text: 'session2', icon: <MoreHorizIcon /> },
    { id: '3', text: 'session3', icon: <MoreHorizIcon /> },
    { id: '4', text: 'session4', icon: <MoreHorizIcon /> },
    { id: '5', text: 'session5', icon: <MoreHorizIcon /> },
    { id: '6', text: 'session6', icon: <MoreHorizIcon /> },
    { id: '7', text: 'session7', icon: <MoreHorizIcon /> },
    { id: '8', text: 'session8', icon: <MoreHorizIcon /> },
    { id: '9', text: 'session9', icon: <MoreHorizIcon /> },
    { id: '10', text: 'session10', icon: <MoreHorizIcon /> },
    { id: '11', text: 'session11', icon: <MoreHorizIcon /> },
    { id: '12', text: 'session12', icon: <MoreHorizIcon /> },
  ];

  const popoverLists: PopoverItem [] = [
    { text: 'rename', icon: <DriveFileRenameOutlineIcon /> },
    { text: 'archive', icon: <ArchiveIcon /> },
    { text: 'delete', icon: <DeleteIcon sx={{ color: '#f44336' }} />},
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh'}}>
      <CssBaseline />
      {(window.innerWidth < 600 || !pcOpen) && (
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            m:1,
            zIndex: mobileOpen ? 0 : 1300,
          }}
        >
         <AlignHorizontalLeftIcon />
        </IconButton>
      )}
      <Box
        component="nav"
        sx={{ width: { sm: pcOpen ? drawerWidth : 0 }, flexShrink: { sm: 0 }}}
        aria-label=""
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth
            },
          }}
        >
          <DrawerContent
            listRef={listRef}
            drawerButton={drawerButton}
            menuItems={menuItems}
            sessionItems={sessionItems}
            popoverLists={popoverLists}
            activePopover={activePopover}
            anchorEl={anchorEl}
            handleDrawerToggle={handleDrawerToggle}
            handlePopoverOpen={handlePopoverOpen}
            handlePopoverClose={handlePopoverClose}
            height={height}
          />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: pcOpen ? drawerWidth : 0,
              transition: 'width 0.2s ease-in-out',
            },
          }}
          open
        >
          <DrawerContent
            listRef={listRef}
            drawerButton={drawerButton}
            menuItems={menuItems}
            sessionItems={sessionItems}
            popoverLists={popoverLists}
            activePopover={activePopover}
            anchorEl={anchorEl}
            handleDrawerToggle={handleDrawerToggle}
            handlePopoverOpen={handlePopoverOpen}
            handlePopoverClose={handlePopoverClose}
            height={height}
          />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            sm: `calc(100% - ${drawerWidth}px)`,
            xs: '100%'
          },
          transition: 'width 0.3s ease-in-out',   
          }}
      >
        <ChatAppbar
            pcOpen={pcOpen}
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
        />  
        <ChatComponent />
      </Box>
    </Box>
  );
}
