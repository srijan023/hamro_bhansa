"use client";

import FormElement from "@/components/form/FormElement";
import { useSession } from "next-auth/react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Profile() {
  const { data: session, update, status } = useSession();
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("/user.png");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isSaving, setIsSaving] = useState(false);

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
      if (session?.fullName) {
        setUserName(session.fullName);
      }
      if (session?.image) {
        setUserImage(session.image);
      }
      if (session?.city) {
        setCity(session.city);
      }
      if (session?.country) {
        setCountry(session.country);
      }
      if (session?.street) {
        setStreet(session.street);
      }
      if (session?.phone) {
        setPhone(session.phone);
      }
      if (session?.postalCode) {
        setPostalCode(session.postalCode);
      }
    }
  }, [status, session]);

  // FIXED: session issue

  async function handleProfileInfoChange(ev) {
    ev.preventDefault();
    setIsSaving(true);
    toast("Saving...");
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: userName,
        image: userImage,
        street,
        city,
        country,
        postalCode,
        phone,
      }),
    });
    if (res.ok) {
      toast.success("Saved Data");
      // update the session manually before next login
      update({
        fullName: userName,
        image: userImage,
        street,
        city,
        country,
        postalCode,
        phone,
      });
    } else {
      toast.error("Saving failed!");
    }
    setIsSaving(false);
  }

  if (status == "loading") {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section>
      <div className="mt-8">
        <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2 items-center">
            <div className="">
              <div className="relative flex flex-col gap-2">
                <Image
                  className="mx-auto w-full h-full rounded-full"
                  src={userImage}
                  width={100}
                  height={100}
                  alt="user profile"
                  id="image"
                />
                <CldUploadWidget
                  // TODO: Create a custom input box for image and implement toast on it

                  // signed upload donot need upload preset
                  signatureEndpoint={"/api/signImage"}
                  onSuccess={(result, { widget }) => {
                    setUserImage(result?.info.url);
                    widget.close();
                  }}
                >
                  {({ open }) => {
                    function handleOnClick() {
                      open(); // open widget
                    }
                    return (
                      <button
                        className="rounded-full bg-primary py-2 px-4 text-gray-100 cursor-pointer"
                        onClick={handleOnClick}
                      >
                        Upload Image
                      </button>
                    );
                  }}
                </CldUploadWidget>
              </div>
            </div>
            <form
              className="flex flex-col gap-2 mx-auto"
              onSubmit={handleProfileInfoChange}
            >
              <p className="text-gray-700 bg-gray-300 text-center px-4 py-2 border-gray-300 border-2 rounded-xl">
                {session.user?.email}
              </p>
              <FormElement
                idName="fullName"
                type="text"
                disabled={isSaving}
                placeholder="Full Name"
                value={userName}
                onChange={(ev) => setUserName(ev.target.value)}
              />
              <FormElement
                idName="phone"
                type="tel"
                disabled={isSaving}
                placeholder="Phone number"
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
              />
              <div className="flex gap-3">
                <FormElement
                  idName={"street"}
                  disabled={isSaving}
                  placeholder="Street Name"
                  type="text"
                  value={street}
                  onChange={(ev) => setStreet(ev.target.value)}
                />
                <FormElement
                  idName={"city"}
                  disabled={isSaving}
                  placeholder="City"
                  type="text"
                  value={city}
                  onChange={(ev) => setCity(ev.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <FormElement
                  idName={"postal"}
                  disabled={isSaving}
                  placeholder="Postal code"
                  type="text"
                  value={postalCode}
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
                <FormElement
                  idName={"country"}
                  disabled={isSaving}
                  placeholder="Country"
                  type="text"
                  value={country}
                  onChange={(ev) => setCountry(ev.target.value)}
                />
              </div>
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
