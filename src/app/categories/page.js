"use client";
import FormElement from "@/components/form/FormElement";
import PrimaryButton from "@/components/form/buttonPrimary";
import UserTabs from "@/components/layout/UserTabs";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";

// TODO: Profile appearing first before any other element on UserTabs before 5:10

// TODO: Don't render header if the authenticated value is not obtained

export default function Categories() {
  const [categoryName, setCategoryName] = useState("");
  const [isAdmin, setIsAdmin] = useState("false");
  const [categories, setCategories] = useState([]);
  const checkAdminFunc = async () => {
    const res = await fetch("/api/profile");
    const data = await res.json();
    setIsAdmin(data.isAdmin);
  };

  checkAdminFunc();
  if (!isAdmin) {
    return redirect("/profile");
  }

  const fetchCategories = () => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((categories) => {
        setCategories(categories);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async (ev) => {
    ev.preventDefault();
    toast("Creating Category");
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: categoryName }),
    });
    if (res.ok) {
      toast.success("Successfully created category");
      fetchCategories();
      setCategoryName("");
    }
  };

  const handleDeleteCategory = async (val, isEdit) => {
    if (!isEdit) {
      toast("Deleting category");
    }
    const res = await fetch("/api/categories", {
      method: "DELETE",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify({ delVal: val }),
    });
    if (res.ok && !isEdit) {
      toast.success("Successfully deleted category");
      fetchCategories();
    }
  };
  const handleEditCategory = (val) => {
    setCategoryName(val);
    handleDeleteCategory(val, true);
  };

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto">
        <form
          className="flex gap-4 justify-center"
          onSubmit={handleCreateCategory}
        >
          <FormElement
            label=""
            placeholder="New Category Name"
            type="text"
            width="w-2/3"
            value={categoryName}
            onChange={(ev) => setCategoryName(ev.target.value)}
          />
          <PrimaryButton text="Create" btnType="submit" />
        </form>
        <ul className="flex flex-col items-center mt-4 gap-3">
          {categories.length > 0 &&
            categories.map((c) => (
              <div
                className="border-2 flex justify-between items-center border-gray-400 w-2/3 px-4 py-3 rounded-xl"
                key={c.name}
                id="container"
              >
                <p className="value-input capitalize font-semibold border-0 outline-none text-gray-500">
                  {c.name}
                </p>
                <div className="flex gap-3">
                  <div
                    className="bg-red-300 px-2 py-2 rounded-md cursor-pointer"
                    onClick={() => handleDeleteCategory(c.name, false)}
                  >
                    <FaRegTrashCan color="#f3f4f6" />
                  </div>

                  <div
                    className="bg-blue-300 px-2 py-2 rounded-md cursor-pointer"
                    onClick={() => handleEditCategory(c.name)}
                  >
                    <FaPencil color="#f3f4f6" />
                  </div>
                </div>
              </div>
            ))}
        </ul>
      </div>
    </section>
  );
}
