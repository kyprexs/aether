import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/ThemeContext";

export const metadata: Metadata = {
  title: "AetherDrive — The Intelligent Pulse Behind Every Vehicle",
  description: "Transform vehicle maintenance from reactive to predictive with AI-powered telemetry, smart scheduling, and real-time insights.",
  keywords: ["fleet management", "predictive maintenance", "automotive AI", "vehicle telematics", "smart scheduling"],
  authors: [{ name: "AetherDrive Team" }],
  openGraph: {
    title: "AetherDrive — The Intelligent Pulse Behind Every Vehicle",
    description: "Transform vehicle maintenance from reactive to predictive with AI-powered telemetry, smart scheduling, and real-time insights.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-[#0A0E1A] text-[#E6EAF0]">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
