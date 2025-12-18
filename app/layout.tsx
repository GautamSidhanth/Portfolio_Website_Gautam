import Header from "@/components/header";
import "./globals.css";
import { Outfit } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";

import { Toaster } from "react-hot-toast";
import Background3D from "@/components/Background3D";
import LoadingScreen from "@/components/loading-screen";
import CustomCursor from "@/components/custom-cursor";
import ScrollProgressBar from "@/components/scroll-progress-bar";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Gautam | Full-Stack Developer",
  description: "Gautam is a full-stack developer with expertise in React, Next.js, and DevOps. efficient, scalable, and user-centric web solutions.",
  authors: [{ name: "Gautam Sidhanth" }],
  keywords: ["Full-Stack Developer", "React", "Next.js", "DevOps", "Portfolio", "Web Development"],
  openGraph: {
    title: "Gautam | Full-Stack Developer",
    description: "Gautam is a full-stack developer with expertise in React, Next.js, and DevOps.",
    url: "https://gautam.dev", 
    siteName: "Gautam's Portfolio",
    images: [
      {
        url: "/og.png", 
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gautam | Full-Stack Developer",
    description: "Gautam is a full-stack developer with expertise in React, Next.js, and DevOps.",
    images: ["/og.png"], 
  },
  metadataBase: new URL("https://gautam.dev"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth! dark" suppressHydrationWarning>
      <body
        className={`${outfit.className} min-h-screen bg-gray-900 text-gray-50 text-opacity-90 relative pt-28 sm:pt-36`}
        suppressHydrationWarning
      >
        <div className="bg-[#946263] absolute -top-24 -z-10 right-44 h-125 w-125 rounded-full blur-[10rem] sm:w-275 opacity-20"></div>
        <div className="bg-[#676394] absolute -top-4 -z-10 -left-140 h-125 w-200 rounded-full blur-[10rem] sm:w-275 md:-left-132 lg:-left-112 xl:-left-60 2xl:-left-20 opacity-20"></div>
        
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
      </body>
    </html>
  );
}