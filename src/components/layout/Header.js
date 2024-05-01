"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
export default function Header() {
  const session = useSession();
  const status = session.status;

  const [fullName, setFullName] = useState("");

  useEffect(() => {
    console.log("From header", session);
    if (status === "authenticated") {
      setFullName(session?.data?.fullName);
    }
  }, [session, status]);

  return (
    <header className="flex items-center justify-between">
      <Link className="text-primary font-semibold text-2xl" href="">
        HAMRO BHANSA
      </Link>
      <nav className="flex gap-8 text-gray-500 items-center">
        <Link href={"/"}>Home</Link>
        <Link href={""}>Menu</Link>
        <Link href={""}>About</Link>
        <Link href={""}>Contact</Link>
      </nav>
      <nav className="flex gap-5 items-center">
        {status === "authenticated" ? (
          <>
            <Link href={"/profile"}>
              {fullName !== "" ? (
                <p className="text-md text-gray-500">
                  Hello, {fullName?.split(" ")[0]}
                </p>
              ) : (
                <div className="border-1 hover:scale-105 rounded-full bg-primary border-primary px-3 py-3">
                  <FaUser color="white" />
                </div>
              )}
            </Link>

            <button
              onClick={() => signOut()}
              className="border px-5 py-2 rounded-full hover:bg-gray-500 hover:text-white transition-all border-gray-500 text-gray-500"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link
              href={"/login"}
              className="border px-5 py-2 rounded-full hover:bg-gray-500 hover:text-white transition-all border-gray-500 text-gray-500"
            >
              Login
            </Link>
            <Link
              href={"/register"}
              className="px-5 py-2 rounded-full bg-primary text-white hover:bg-white hover:text-primary transition-all hover:border-primary border-primary border"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
