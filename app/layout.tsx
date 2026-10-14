import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dan Kolbaba | Stop Losing Leads to Slow Follow-Up",
  description: "Custom quote bots, voice intake, follow-up tools, alerts, dashboards, and websites for service businesses. See the sales workflow I built for Leadwave."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
