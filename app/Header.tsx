"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();

  return (
    <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-4">
      <Link href="/" className="flex space-x-2">
        <Image
          alt="header text"
          src="/hand-logo.svg"
          className="sm:w-14 sm:h-14 w-9 h-9"
          width={36}
          height={36}
        />
        <h1 className="sm:text-5xl text-3xl ml-2 tracking-tight">Amanella</h1>
      </Link>
      {path === "/" ? (
        <Link
          href="/pro"
          className="flex space-x-2 px-1 border-black w-auto h-auto items-center justify-center rounded-md border"
        >
          PRO (beta)
        </Link>
      ) : (
        <Link
          href="/"
          className="flex space-x-2 px-1 border-black w-auto h-auto items-center justify-center rounded-md border "
        >
          DISEGNA
        </Link>
      )}
    </header>
  );
}
