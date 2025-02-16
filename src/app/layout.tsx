import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import ReduxProvider from "@/provider/reduxprovider";
import { SessionProvider } from "@/Context/deleteSession";
import { CurrentSessionProvider } from "@/Context/getcurrentSession";
import { GetSessionProvider } from "@/Context/sessionContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata:Metadata = {
  title: "SC System",
  description: "Generated by create next app",
  icons:{
    icon:"/scsystemlogo.png"
  }
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ReduxProvider>
            <SessionProvider>
              <CurrentSessionProvider> 
                <GetSessionProvider>
                  {children}
                </GetSessionProvider>
              </CurrentSessionProvider>
            </SessionProvider>
          </ReduxProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
