import Link from "next/link";
import Image from "next/image";
import Footer from "./footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
          <Link href="/" className="flex space-x-2">
            <Image
              alt="header text"
              src="/hand-logo.png"
              className="sm:w-14 sm:h-14 w-9 h-9"
              width={36}
              height={36}
            />
            <h1 className="sm:text-5xl text-3xl font-bold ml-2 tracking-tight">
              Amanella
            </h1>
          </Link>
        </header>
        <div className="bg-slate-50 h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
