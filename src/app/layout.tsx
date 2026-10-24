import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import { Footer } from "@/components/Home/footer";
import "./globals.css";
import { Navbar } from "@/components/Home/navbar";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Wanderlust",
  description: "Discover your next adventure with curated travel experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${josefinSans.className}h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
         <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
