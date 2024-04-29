"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { status } = session;

  async function handleFileChange(event) {
    const files = event.target.files;
    const data = new FormData();
    data.set("file", files[0]);
    if (files?.length > 0) {
      await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
    }
  }
  // sesssion is changed later and therefore we need to handle that change
  // if we initialize the userName based on the value of the session, it is initialized to null initially and later when the value comes to the session it is not rechanged.
  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session?.data?.user?.name);
    }
  }, [session, status, session?.data?.user?.name]);

  async function handleProfileInfoChange(ev) {
    ev.preventDefault();
    setSaved(false);
    setIsSaving(true);
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName: userName }),
    });
    if (res.ok) {
      setSaved(true);
      setUserName("");
    }
    setIsSaving(false);
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
        {saved && (
          <h2 className="px-8 py-2 w-1/2 mb-3 text-gray-700  text-center rounded-xl mx-auto bg-green-300">
            Profile saved!
          </h2>
        )}

        {isSaving && (
          <h2 className="px-8 py-2 w-1/2 mb-3 text-gray-700  text-center rounded-xl mx-auto bg-blue-300">
            Saving Changes!
          </h2>
        )}
        <div className="max-w-xl mx-auto">
          <div className="flex gap-2 items-center">
            <div className="">
              <div className="relative flex flex-col gap-2">
                <Image
                  className="mx-auto w-full h-full"
                  src={userImage}
                  width={100}
                  height={100}
                  alt="user profile"
                  id="image"
                />
                <label className="rounded-full bg-primary py-2 px-4 text-gray-100 cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <span>Upload Image</span>
                </label>
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
                disabled={isSaving}
              />
              <button
                type="submit"
                className="w-full px-4 py-2 text-gray-100 bg-primary rounded-full"
                disabled={isSaving}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
