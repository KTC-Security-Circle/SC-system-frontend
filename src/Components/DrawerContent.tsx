import React, { RefObject } from 'react';
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { DrawerItem } from '../types/drawer';


interface DrawerContentProps {
  listRef: RefObject<HTMLDivElement>;
  drawerButton: DrawerItem[];
  menuItems: DrawerItem[];
  activePopover: string | null;
  anchorEl: HTMLElement | null;
  handleDrawerToggle: () => void;
  handlePopoverOpen: (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => void;
  handlePopoverClose: () => void;
  height: number | null;
}

export const DrawerContent: React.FC<DrawerContentProps> = ({
  listRef,
  drawerButton,
  menuItems,
  activePopover,
  anchorEl,
  handlePopoverOpen,
  handlePopoverClose,
  height,
}) => {
  return (
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
    </>
  );
};
