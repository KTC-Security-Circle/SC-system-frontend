import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import ReduxProvider from "@/provider/reduxprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata:Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
        <ReduxProvider>{children}</ReduxProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;