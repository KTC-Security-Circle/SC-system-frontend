import React, { RefObject } from 'react';
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Tooltip,
} from '@mui/material';
import { DrawerItem, PopoverItem, SessionItem } from '../types/drawer';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface DrawerContentProps {
  listRef: RefObject<HTMLDivElement>;
  drawerButton: DrawerItem[];
  menuItems: DrawerItem[];
  sessionItems: SessionItem[];
  popoverLists: PopoverItem[];
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
  sessionItems,
  popoverLists,
  activePopover,
  anchorEl,
  handleDrawerToggle,
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
};
