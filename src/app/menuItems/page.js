"use client";
import UserTabs from "@/components/layout/UserTabs";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import FormElement from "@/components/form/FormElement";
import Image from "next/image";
import toast from "react-hot-toast";

export default function MenuItem() {
  const [isSaving, setIsSaving] = useState(false);
  const [itemImage, setItemImage] = useState("/written.png");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCategory, setItemCategory] = useState("");

  const handleItemUpload = async (ev) => {
    ev.preventDefault();
    setIsSaving(true);
    toast("Saving description");
    const res = await fetch("/api/menuItems", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemName,
        itemImage,
        itemDescription,
        itemPrice,
        itemCategory,
      }),
    });
    if (res.ok) {
      toast.success("Saved Details");
      setItemName("");
      setItemImage("/written.png");
      setItemDescription("");
      setItemPrice("");
    }
    setIsSaving(false);
  };

  return (
    <section className="mt-8">
      {/* TODO: manage this isAdmin part on both menu-items and categories */}
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto">
        <div className="flex gap-2 items-center">
          <div className="">
            <div className="relative flex flex-col gap-2">
              <Image
                className="mx-auto w-full h-full rounded-full"
                src={itemImage}
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
                  setItemImage(result?.info.url);
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
            onSubmit={handleItemUpload}
          >
            <FormElement
              idName="name"
              type="text"
              disabled={isSaving}
              placeholder="Item Name"
              value={itemName}
              onChange={(ev) => setItemName(ev.target.value)}
            />
            <FormElement
              idName="desc"
              type="text"
              disabled={isSaving}
              placeholder="Item Description"
              value={itemDescription}
              onChange={(ev) => setItemDescription(ev.target.value)}
            />
            <div className="flex gap-3">
              <FormElement
                idName={"itemCategory"}
                disabled={isSaving}
                placeholder={"Item Category"}
                value={itemCategory}
                onChange={(ev) => setItemCategory(ev.target.value)}
              />

              <FormElement
                idName={"basePrice"}
                disabled={isSaving}
                placeholder="Base Price"
                type="number"
                value={itemPrice}
                onChange={(ev) => setItemPrice(ev.target.value)}
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
    </section>
  );
}
