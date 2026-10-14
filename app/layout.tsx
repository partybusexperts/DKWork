import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leadwave Systems Lab | Built for business outcomes",
  description: "Interactive demos of AI systems, dashboards, automation, directories, and lead-generation platforms built by Leadwave."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
