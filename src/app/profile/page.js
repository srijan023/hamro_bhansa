"use client";

import FormElement from "@/components/form/FormElement";
import PrimaryButton from "@/components/form/buttonPrimary";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Profile() {
  const session = useSession();
  const [userName, setUserName] = useState(session?.data?.user?.name || "");
  const { status } = session;

  async function handleProfileInfoChange(ev) {
    ev.preventDefault();
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName: userName }),
    });
  }

  if (status == "loading") {
    return "Loadng...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  const userImage = session.data.user.image || "/user.png";

  return (
    <section>
      <div className="mt-8">
        <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
        <form className="max-w-xl mx-auto">
          <div className="flex gap-2 items-center">
            <div className="">
              <div className="relative">
                <Image
                  className="mx-auto w-full h-full"
                  src={userImage}
                  width={100}
                  height={100}
                  alt="user profile"
                />
                <button className="bg-primary text-gray-100 px-4 py-2 rounded-full mt-3 mx-auto">
                  Upload Image
                </button>
              </div>
            </div>
            <form
              className="flex flex-col gap-2 mx-auto"
              onSubmit={handleProfileInfoChange}
            >
              <p className="text-gray-500 text-center px-4 py-2 border-gray-300 border-2 rounded-xl">
                {session.data.user?.email}
              </p>
              <input
                type="text"
                className="px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-0 focus:border-primary "
                placeholder="First and Last Name"
                value={userName}
                onChange={(ev) => setUserName(ev.target.value)}
              />
              <button
                type="submit"
                className="w-full px-4 py-2 text-gray-100 bg-primary rounded-full"
              >
                Save
              </button>
            </form>
          </div>
        </form>
      </div>
    </section>
  );
}
