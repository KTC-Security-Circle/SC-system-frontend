import { ReactNode } from 'react';

export interface DrawerItem {
    text: string;
    icon: ReactNode;
    tips: string;
    onClick?: () => void;
}

export interface SessionItem {
    id: string;
    text: string;
    icon: ReactNode;
}

export interface PopoverItem {
    text: string;
    icon: ReactNode;
    onClick?: (id:number) => void;
}