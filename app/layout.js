import { Analytics } from "@vercel/analytics/next";

import { Inter } from "next/font/google";
import "./globals.css";
import MiniDrawer from "./components/Sidebar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MetaForge Pro - Professional Meta Tag Generator Suite",
  description:
    "Generate professional Open Graph and Twitter Card meta tags with MetaForge Pro. 17+ generators for all social media platforms - fast, accurate, and free.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon links for better browser support */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/metaicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/metaicon.png" />

        {/* Font optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* App metadata */}
        <meta name="application-name" content="MetaForge Pro" />
        <meta name="theme-color" content="#667eea" />
      </head>
      <body
        className={inter.className}
        style={{
          backgroundColor: "black",
          margin: 0,
          padding: 0,
          fontFamily: inter.style.fontFamily,
        }}
      >
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <MiniDrawer />
          <div
            style={{
              flexGrow: 1,
              marginTop: "64px",
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <div style={{ flexGrow: 1 }}>
              {children}
              <Analytics />
            </div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
