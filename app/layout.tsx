import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dan Kolbaba | Custom Sales Systems & AI Tools for Service Businesses",
  description: "Custom lead capture, quote chatbots, follow-up systems, dashboards, alerts, and websites for service businesses. See the real sales system built for Leadwave."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
