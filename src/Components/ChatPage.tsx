"use client"

import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChatComponent } from '@/Components/parts/Chat/Chat';
import { DrawerContent } from '@/Components/DrawerContent';
import { ChatAppbar } from '@/Components/parts/ChatAppbar';
import { DrawerItem } from '../types/drawer';
import { SessionList } from '@/Components/parts/Nav/SessionList';
import AddCommentIcon from '@mui/icons-material/AddComment';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';


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
  const router = useRouter();

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

  const handlecreateSession = () => {
    router.push('/Chat');
  };

  const drawerButton: DrawerItem[] = [
    { text: 'サイドバーボタン', icon: <AlignHorizontalLeftIcon /> ,tips: '閉じる', onClick: handleDrawerToggle },
    { text: 'newsession', icon: <AddCommentIcon /> ,tips: '新しいセッションを作成', onClick: handlecreateSession },
  ];

  const menuItems: DrawerItem[] = [
    { text: 'button1', icon: <AlignHorizontalLeftIcon /> ,tips: 'ボタン１' },
    { text: 'button2', icon: <AlignHorizontalLeftIcon /> ,tips: 'ボタン２' },
    { text: 'button3', icon: <AlignHorizontalLeftIcon /> ,tips: 'ボタン3' },
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
      <ChatAppbar
            pcOpen={pcOpen}
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
        />  
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
            activePopover={activePopover}
            anchorEl={anchorEl}
            handleDrawerToggle={handleDrawerToggle}
            handlePopoverOpen={handlePopoverOpen}
            handlePopoverClose={handlePopoverClose}
            height={height}
          />
          <SessionList />
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
            activePopover={activePopover}
            anchorEl={anchorEl}
            handleDrawerToggle={handleDrawerToggle}
            handlePopoverOpen={handlePopoverOpen}
            handlePopoverClose={handlePopoverClose}
            height={height}
          />
          <SessionList />
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
          backgroundColor: '#e6ffff'
          }}
      >
        <ChatComponent />
      </Box>
    </Box>
  );
}
