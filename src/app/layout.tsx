import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import App from 'antd/es/app';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <NextTopLoader showSpinner={false} />
          <App>
            {children}
          </App>
        </AntdRegistry>
        <SpeedInsights />
      </body>
    </html>
  );
}
