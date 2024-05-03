// Chaning the fonts

import AppContext from "@/components/layout/AppContext";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={roboto.className}>
        <main className="max-w-6xl mx-auto mx-auto-header p-4">
          <AppContext>
            <Toaster />
            <Header />
            {children}
            <Footer />
          </AppContext>
        </main>
      </body>
    </html>
  );
}
