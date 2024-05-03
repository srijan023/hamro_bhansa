"use client";

import { useEffect, useState } from "react";
import MenuItem from "../menu/MenuItem";
import SectionHeader from "./SectionHeaders";

export default function HomeMenu() {
  const [items, setItems] = useState([]);
  const fetchMenuItems = () => {
    fetch("/api/menuItems")
      .then((res) => res.json())
      .then((itms) => {
        setItems(itms);
      });
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);
  return (
    <section className="mt-6">
      <SectionHeader
        leftImage={"/spices.png"}
        rightImage={"/leaf.png"}
        heading={"Menu"}
        subheading={"Check out"}
      />
      <div className="grid grid-cols-3 gap-x-6 gap-y-10">
        {items.length &&
          items
            .filter((item) => item.isFavourite)
            .map((item) => (
              <MenuItem
                key={item.name}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            ))}
      </div>
    </section>
  );
}
