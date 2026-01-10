import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitPulse",
  description:
    "The Pulse of your Codebase. Visualize, Analyze, and Optimize your development workflow.",
  icons: {
    icon: "/gitpulse.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
