import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dan Kolbaba | AI, Sales & Automation Systems",
  description: "I build custom quote flows, AI sales tools, A/B testing workflows, operational alerts, dashboards, and lead-generation systems that solve real business problems."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
