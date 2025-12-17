import Header from "@/components/header";
import "./globals.css";
import { Outfit } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";

import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";
import Background3D from "@/components/Background3D";
import LoadingScreen from "@/components/loading-screen";
import CustomCursor from "@/components/custom-cursor";
import ScrollProgressBar from "@/components/scroll-progress-bar";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Gautam | Personal Portfolio",
  description: "Gautam is a full-stack developer who blends DevOps precision and system design thinking to build scalable, production-ready products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth!" suppressHydrationWarning>
      <body
        className={`${outfit.className} bg-gray-50 text-gray-950 relative pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        <div className="bg-[#fbe2e3] absolute -top-24 -z-10 right-44 h-125 w-125 rounded-full blur-[10rem] sm:w-275 dark:bg-[#946263] opacity-20"></div>
        <div className="bg-[#dbd7fb] absolute -top-4 -z-10 -left-140 h-125 w-200 rounded-full blur-[10rem] sm:w-275 md:-left-132 lg:-left-112 xl:-left-60 2xl:-left-20 dark:bg-[#676394] opacity-20"></div>
        <ThemeContextProvider>
          <CustomCursor />
          <LoadingScreen />
          <Background3D />
          <ActiveSectionContextProvider>
            <ScrollProgressBar />
            <Header />
            {children}
            <Footer />

            <Toaster position="top-right" />

          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}