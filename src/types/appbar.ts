import { ReactNode } from 'react';


export interface AppbarButton {
    text: string; // ボタンのテキスト
    onClick: () => void; // クリック時の動作
    icon?: React.ReactNode; // アイコン

}

export interface AppbarIconButton {
    text: string;
    icon: ReactNode;
}
