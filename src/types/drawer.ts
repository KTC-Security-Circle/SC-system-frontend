import { ReactNode } from 'react';

export interface DrawerItem {
    text: string;
    icon: ReactNode;
    tips: string;
}

export interface DrawerListProps {
    items: DrawerItem[];
    onNavigate: (url: string) => void;
    onClose: () => void;
}

export interface SessionItem {
    id: string;
    text: string;
    icon: ReactNode;
}