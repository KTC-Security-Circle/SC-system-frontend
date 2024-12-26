"use client"

import * as React from 'react';
import { ChatComponent } from './ChatPage';
import { DrawerContent } from './DrawerContent';
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
} from '@mui/material';


const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export const ResponsiveDrawer: React.FC<Props> = (props: Props) => {
  
  {/*popover*/}
  const [activePopover, setActivePopover] = React.useState<string | null>(null);
  
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  {/*モバイル用の開閉状態*/}
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [pcOpen, setPcOpen] = React.useState(false); // PC画面用の状態を追加
  
  {/*リストの高さ*/}
  const [height, setHeight] = React.useState<number | null>(null);
  const listRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleResize = () => {
      setPcOpen(window.innerWidth >= 600);
    };
  
    handleResize(); // 初回実行
    window.addEventListener("resize", handleResize);
  
    return () => window.removeEventListener("resize", handleResize); // クリーンアップ
  }, []);
  
  React.useEffect(() => {
    if (listRef.current) {
      {/*リストとDividerの合計高さを取得*/}
      setHeight(listRef.current.clientHeight);
    }
  }, [])
  
  const handleDrawerToggle = () => {
    if (window.innerWidth >= 600) {
      // PC画面用のDrawerを制御
      setPcOpen(!pcOpen);
    } else {
      // モバイル用のDrawerを制御
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


  {/* 一番上の閉じる（閉じない）ボタンと新しいセッション開始があるとこ */}
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
      {/* ChatAppbar コンポーネント */}
      {/**/}
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
              width: pcOpen ? drawerWidth : 0, // PC画面で開閉状態を反映
              transition: 'width 0.2s ease-in-out', // アニメーションを追加
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
        <ChatComponent />
      </Box>
    </Box>
  );
}
