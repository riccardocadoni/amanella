import Footer from "./footer";
import "./globals.css";
import { Quicksand } from "@next/font/google";
import Header from "./Header";

const quickSand = Quicksand({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={quickSand.className}>
        <Header />
        <div className="bg-slate-50">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
