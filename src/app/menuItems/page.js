"use client";
import FormElement from "@/components/form/FormElement";
import Dropdown from "@/components/form/dropdown";
import UserTabs from "@/components/layout/UserTabs";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaPen,
  FaPlus,
  FaRegNoteSticky,
  FaStar,
  FaTrash,
} from "react-icons/fa6";

export default function MenuItem() {
  const [isSaving, setIsSaving] = useState(false);
  const [itemImage, setItemImage] = useState("/written.png");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCategory, setItemCategory] = useState("Select Category");
  const [isFavourite, setIsFavourite] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [items, setItems] = useState([]);
  const [updating, setUpdating] = useState(false);

  const fetchCategories = () => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((categories) => {
        setCategories(categories);
      });
  };

  const fetchMenuItems = () => {
    fetch("/api/menuItems")
      .then((res) => res.json())
      .then((itms) => {
        setItems(itms);
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchMenuItems();
  }, []);

  const resetValues = () => {
    setItemName("");
    setItemImage("/written.png");
    setItemDescription("");
    setItemPrice("");
    setItemCategory("Select Category");
    setIsFavourite(false);
  };

  const toggleDisplay = function () {
    setIsActiveMenu(!isActiveMenu);
  };

  const handleOptionClicked = (ev) => {
    setItemCategory(ev.target.textContent);
    setIsActiveMenu(false);
  };

  const updateMenuData = async () => {
    setIsSaving(true);
    toast("Updating Item");
    const res = await fetch("/api/menuItems", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: itemName,
        image: itemImage,
        description: itemDescription,
        price: itemPrice,
        category: itemCategory,
        isFavourite: isFavourite,
      }),
    });
    if (res.ok) {
      toast.success("Updated item");
      fetchMenuItems();
      resetValues();
    } else {
      toast.error("Could not update data");
    }
    setUpdating(false);
    setIsSaving(false);
    setShowModel(false);
  };

  const handleItemUpload = async (ev) => {
    ev.preventDefault();
    setIsSaving(true);
    toast("Saving item");
    const res = await fetch("/api/menuItems", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: itemName,
        image: itemImage,
        description: itemDescription,
        price: itemPrice,
        category: itemCategory,
        isFavourite: isFavourite,
      }),
    });
    if (res.ok) {
      toast.success("Saved item");
      fetchMenuItems();
    } else {
      toast.error("Could not save item");
    }
    resetValues();
    setIsSaving(false);
  };

  const addNewMenuItem = () => {
    resetValues();
    setShowModel(true);
  };

  const handleDeleteItem = async (name) => {
    toast("Deleting Item");
    const res = await fetch("/api/menuItems", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
      }),
    });
    if (res.ok) {
      toast.success("Item deleted successfully");
      fetchMenuItems();
    } else {
      toast.error("Error deleting item");
    }
  };

  const handleUpdateItem = (itm) => {
    setItemCategory(itm.category);
    setItemImage(itm.image);
    setItemName(itm.name);
    setItemDescription(itm.description);
    setItemPrice(itm.price);
    setIsFavourite(itm.isFavourite);
    setShowModel(true);
    setUpdating(true);
  };

  return (
    <section className="mt-8 relative">
      {/* TODO: manage this isAdmin part on both menu-items and categories */}
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto">
        <div
          onClick={addNewMenuItem}
          className="mx-auto flex justify-between w-1/2 text-gray-500 border border-gray-700 rounded-md px-3 py-2 cursor-pointer hover:border-primary hover:bg-gray-50"
        >
          <span>Create new Menu Item</span>
          <div className="text-xl text-gray-500 ">
            <FaPlus />
          </div>
        </div>
        <div
          className={`flex gap-2 z-10 items-center ${
            !showModel && "hidden"
          } absolute top-2 bg-white px-2 py-5 border border-gray-500 rounded-md mx-auto w-2/3 left-0 right-0`}
        >
          <div className="w-full">
            <div className="relative flex flex-col gap-2 rounded-md">
              <Image
                className="mx-auto w-full h-full rounded-md"
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
            className="flex flex-col gap-2 mx-auto w-full"
            onSubmit={handleItemUpload}
          >
            <FormElement
              idName="name"
              type="text"
              disabled={updating}
              placeholder="Item Name"
              value={itemName}
              onChange={(ev) => setItemName(ev.target.value)}
            />
            <p
              className={`absolute top-4 cursor-pointer right-4 ${
                isFavourite ? "text-primary" : "text-gray-500"
              }`}
              onClick={() => setIsFavourite(!isFavourite)}
            >
              <FaStar />
            </p>
            <FormElement
              idName="desc"
              type="text"
              disabled={isSaving}
              placeholder="Item Description"
              value={itemDescription}
              onChange={(ev) => setItemDescription(ev.target.value)}
            />
            <div className="flex gap-3">
              <Dropdown
                isActiveMenu={isActiveMenu}
                toggleDisplay={toggleDisplay}
                categories={categories}
                handleOptionClicked={handleOptionClicked}
                itemCategory={itemCategory}
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
            <div className="flex gap-3 items-center w-full">
              <button
                onClick={() => {
                  setShowModel(false);
                  setUpdating(false);
                  resetValues();
                }}
                type="button"
                className="text-gray-500 w-full border border-gray-500 px-4 py-2 rounded-full"
              >
                Close
              </button>
              <button
                type="submit"
                className={`px-4 py-2 text-gray-100 w-full bg-primary rounded-full ${
                  updating && "hidden"
                }`}
                disabled={isSaving}
              >
                Save
              </button>
              <button
                type="button"
                onClick={updateMenuData}
                className={`px-4 py-2 text-gray-100 w-full bg-blue-300 rounded-full ${
                  !updating && "hidden"
                }`}
                disabled={isSaving}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex flex-col gap-4 mt-4">
          {items.length && categories.length ? (
            categories.map((cat) => {
              return (
                <>
                  <h1 className="text-2xl text-primary text-center font-semibold">
                    {cat.name}
                  </h1>
                  {items.map((itm) => {
                    if (itm.category === cat.name) {
                      return (
                        <div
                          key={itm.name}
                          className="w-2/3 h-[130px] mx-auto bg-gray-200 px-2 py-2 rounded-xl"
                        >
                          <div className="rounded-xl h-full flex">
                            <div className="relative w-1/3 ">
                              <Image
                                className="rounded-xl"
                                src={itm.image}
                                alt={itm.name}
                                layout="fill"
                                objectFit="cover"
                              />
                            </div>
                            <div className="text-center flex w-full mt-3 p-4 items-center justify-between">
                              <h3 className="font-semibold text-md text-gray-600">
                                {itm.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {itm.description}
                              </p>
                              <h4 className="font-semibold text-gray-600">
                                {" "}
                                Rs. {itm.price}
                              </h4>
                              <div className="flex gap-5">
                                <p
                                  className={`${
                                    itm.isFavourite
                                      ? "text-primary"
                                      : "text-gray-500"
                                  }`}
                                >
                                  <FaStar />
                                </p>
                                <button
                                  className=" flex justify-center gap-3 items-center text-blue-400 text-centerhover:transition-all transition-all"
                                  onClick={() => handleUpdateItem(itm)}
                                >
                                  <FaPen />
                                </button>
                                <button
                                  className="flex justify-center items-center text-center text-red-400 hover:transition-all transition-all hover:bg-gray-300"
                                  onClick={() => handleDeleteItem(itm.name)}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </>
              );
            })
          ) : (
            <div className="text-center text-2xl text-gray-400 mt-4 font-semibold flex gap-2 justify-center items-center">
              <FaRegNoteSticky /> No items created
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
