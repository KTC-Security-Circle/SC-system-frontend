"use client"

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { ChatComponent } from './ChatPage';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
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

} from '@mui/material';

import { DrawerItem } from '../types/drawer';

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export const ResponsiveDrawer: React.FC<Props> = (props: Props) => {
  const { window } = props;
  {/*モバイル用の開閉状態*/}
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  {/*リストの高さ*/}
  const [height, setHeight] = React.useState<number | null>(null);
  const listRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (listRef.current) {
      {/*リストとDividerの合計高さを取得*/}
      setHeight(listRef.current.clientHeight);
    }
  }, [])

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  {/* 一番上の閉じる（閉じない）ボタンと新しいセッション開始があるとこ */}
  const drawerButton: DrawerItem[] = [
    { text: 'サイドバーボタン', icon: <AlignHorizontalLeftIcon /> ,tips: '閉じる', onClick: handleDrawerClose },
    { text: 'newsession', icon: <AddCommentIcon /> ,tips: '新しいセッションを作成' },
  ];

  const menuItems: DrawerItem[] = [
    { text: 'button1', icon: <AlignHorizontalLeftIcon /> ,tips: 'ボタン１' },
    { text: 'button2', icon: <AlignHorizontalLeftIcon /> ,tips: 'ボタン２' },
    { text: 'button3', icon: <AlignHorizontalLeftIcon /> ,tips: 'ボタン3' },
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
        {Array.from({ length: 12 }, (_, index) => `session${index + 1}`).map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
              <Tooltip title="More options" placement='top' enterDelay={500} arrow>
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
              </Tooltip>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', height: '100vh'}}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }}}
        aria-label=""
      >
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ m:1, display: { sm: 'none' } }}
        >
          <AlignHorizontalLeftIcon />
        </IconButton>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
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
