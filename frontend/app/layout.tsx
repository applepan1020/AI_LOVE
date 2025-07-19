import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI_Love - AI爱情测试平台",
  description: "基于AI的爱情测试和分析平台",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
} 