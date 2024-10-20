"use client";
import { PRODUCT_CATEGORIES } from "@/config";
import React, { useState, useRef, useEffect } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isAnyOpen = activeIndex !== null;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };
    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  return (
    <div className="flex gap-4 h-full">
      {PRODUCT_CATEGORIES.map((category, index) => {
        const handleOpen = () => {
          if (activeIndex === index) {
            setActiveIndex(null);
          } else {
            setActiveIndex(index);
          }
        };

        const isOpen = index === activeIndex;

        const navRef = useRef<HTMLDivElement>(null);
        useOnClickOutside(navRef, () => setActiveIndex(null));

        return (
          <div className="flex gap-4 h-full" ref={navRef} key={category.value}>
            <NavItem
              category={category}
              handleOpen={handleOpen}
              isOpen={isOpen}
              key={category.value}
              isAnyOpen={isAnyOpen}
            />
          </div>
        );
      })}
    </div>
  );
};

export default NavItems;
