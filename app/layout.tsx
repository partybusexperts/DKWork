import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Phone & Chat Tools for Service Businesses | Dan Kolbaba",
  description: "AI phone and chat assistants collect quote details and show your team who to call back. Try the QuoteBot I built and see real projects."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
