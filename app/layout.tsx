import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dan Kolbaba | AI and Custom Software",
  description: "I build practical AI systems for lead qualification, audience testing, monitoring, sales workflows, and business analytics. Explore real projects and interactive demos."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
