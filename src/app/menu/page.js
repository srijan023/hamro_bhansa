"use client";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";

export default function Menu() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

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

  return (
    <div className="my-4">
      {categories.map((category) => {
        return (
          <div className="my-3" key={category.name}>
            <h1 className="text-3xl text-center font-semibold text-primary">
              {category.name}
            </h1>
            <div className="grid grid-cols-4 gap-4">
              {items
                .filter((item) => item.category === category.name)
                .map((filteredItem) => {
                  return (
                    <MenuItem
                      key={filteredItem.name}
                      name={filteredItem.name}
                      description={filteredItem.description}
                      image={filteredItem.image}
                      price={filteredItem.price}
                    />
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
