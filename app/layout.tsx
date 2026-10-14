import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dan Kolbaba | Business Tools, Chatbots & Websites",
  description: "I build quote chatbots, sales tools, dashboards, and alerts that help businesses follow up with customers and save time. See simple samples of projects I have built."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
