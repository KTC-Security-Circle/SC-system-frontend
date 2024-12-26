import { ReactNode } from 'react';

export interface AppbarTextButton {
    text: string;
    onClick?: () => void;
    color?: string;
}

export interface AppbarIconButton {
    text: string;
    icon: ReactNode;
}
