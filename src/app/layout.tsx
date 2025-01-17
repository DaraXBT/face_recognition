import "@/styles/globals.css";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {ThemeProvider} from "@/components/theme-provider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Student Attendance Face Recognition",
  description: "Real-time student attendance tracking using face recognition",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
