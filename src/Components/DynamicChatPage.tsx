"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { DynamicChatComponent } from '@/Components/parts/Chat/DynamincChat';
import { DrawerContent } from './DrawerContent';
import { ChatAppbar } from '@/Components/parts/ChatAppbar';
import { DrawerItem } from '../types/drawer';
import AddCommentIcon from '@mui/icons-material/AddComment';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import { SessionList } from '@/Components/parts/Nav/SessionList';

import { 
  Box,
  CssBaseline,
  Drawer,
  IconButton,
} from '@mui/material';


const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export const DynamicChatwindow: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  
  {/*popover*/}
  const [activePopover, setActivePopover] = React.useState<string | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  {/*モバイル用の開閉状態*/}
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [pcOpen, setPcOpen] = React.useState(window.innerWidth >= 600); // PC画面用の状態を追加
  
  {/*リストの高さ*/}
  const [height, setHeight] = React.useState<number | null>(null);
  const listRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        // モバイルサイズの場合
        setPcOpen(false); // PC用Drawerを閉じる
        setMobileOpen(false); // モバイルDrawerも閉じる（初期状態）
      }
    };
  
    // 初期実行
    handleResize();
  
    // イベントリスナーを追加
    window.addEventListener('resize', handleResize);
  
    // クリーンアップ
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [pcOpen]); // pcOpenが変化した場合に再実行
  
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

  const handlecreateSession = () => {
      router.push('/Chat');
    };

  {/* 一番上の閉じる（閉じない）ボタンと新しいセッション開始があるとこ */}
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
      {/* 開閉ボタン */}
      {(window.innerWidth < 600 || !pcOpen) && (
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            m:1,
            zIndex: mobileOpen ? 0 : 1300, // Drawer が開いた時は非表示
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
        <DynamicChatComponent />
      </Box>
    </Box>
  );
}
