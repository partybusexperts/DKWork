import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dan Kolbaba | AI, Software & Automation Projects",
  description: "Browse the AI tools, sales workflows, dashboards, alerts, directories, and service websites I built. Each project explains the problem, the solution, and its verified status."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
