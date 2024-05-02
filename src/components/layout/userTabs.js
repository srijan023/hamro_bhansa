"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({ isAdmin }) {
  const path = usePathname();
  return (
    <div className="flex text-gray-400 justify-center gap-10 text-xl mb-4">
      <Link
        href={"/profile"}
        id="profile"
        className={`text-center ${path === "/profile" ? "text-primary" : ""}`}
      >
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            id="categories"
            href={"/categories"}
            className={`text-center ${path === "/categories" ? "text-primary" : ""
              }`}
          >
            Categories
          </Link>
          <Link
            id="menuItems"
            href={"/menuItems"}
            className={`text-center ${path === "/menuItems" ? "text-primary" : ""
              }`}
          >
            Menu Items
          </Link>
          <Link
            id="users"
            href={"/users"}
            className={`text-center ${path === "/users" ? "text-primary" : ""}`}
          >
            Users
          </Link>
        </>
      )}
    </div>
  );
}
