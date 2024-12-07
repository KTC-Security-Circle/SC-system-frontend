"use client"

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { ChatComponent } from './ChatPage';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ArchiveIcon from '@mui/icons-material/Archive';

import { 
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Divider,
  Popover,

} from '@mui/material';

import { DrawerItem, PopoverItem, SessionItem } from '../types/drawer';

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export const ResponsiveDrawer: React.FC<Props> = (props: Props) => {

  {/*popover*/}
  const [activePopover, setActivePopover] = React.useState<string | null>(null);

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    setActivePopover(id);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setActivePopover(null);
    setAnchorEl(null);
  };
  

  {/*モバイル用の開閉状態*/}
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [pcOpen, setPcOpen] = React.useState(true); // PC画面用の状態を追加

  {/*リストの高さ*/}
  const [height, setHeight] = React.useState<number | null>(null);
  const listRef = React.useRef<HTMLDivElement | null>(null);

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
    { text: 'delete', icon: <DeleteIcon sx={{ color: 'red' }} /> },
  ];


  const drawer = (
    <>
      <div ref = {listRef}>
        <List sx={{ display: 'flex', justifyContent:'space-between'}}>
          {drawerButton.map((item) => (
            <ListItem key={item.text} disablePadding>
              <Tooltip title={item.tips} placement='top' enterDelay={500} arrow>
                <ListItemButton onClick={item.onClick}>
                  <ListItemIcon>{ item.icon }</ListItemIcon>
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{ item.icon }</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
      <Divider />
      <List
      sx={{ 
        height: { sm: `calc(100% - ${height}px)` },
        overflow: 'auto',
      }}>
  {sessionItems.map((item) => (
    <ListItem key={item.id} disablePadding>
      <ListItemButton>
        <ListItemText primary={item.text} />
        <Tooltip title="More options" placement="top" enterDelay={500} arrow>
          <>
            <IconButton onClick={handlePopoverOpen(item.id)}>
              <MoreHorizIcon />
            </IconButton>
            <Popover
              id={item.id}
              open={activePopover === item.id && Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <List
                sx={{pr: 1, pl: 1}}>
                {popoverLists.map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>{ item.icon }</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Popover>
          </>
        </Tooltip>
      </ListItemButton>
    </ListItem>
  ))}
</List>

    </>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh'}}>
      <CssBaseline />
      {/* 開閉ボタン */}
      {!pcOpen && (
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
      <Box
        component="nav"
        sx={{ width: { sm: pcOpen ? drawerWidth : 0 }, flexShrink: { sm: 0 }}}
        aria-label=""
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth
            },
          }}
        >
          {drawer}
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
          {drawer}
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
