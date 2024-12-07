import React from "react";
import { IoIosMenu, IoIosClose } from "react-icons/io";

type MenuIconProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function MenuIcon({ isOpen, onClick }: MenuIconProps) {
  return (
    <button onClick={onClick}>
      {isOpen ? (
        <IoIosClose className="text-3xl" />
      ) : (
        <IoIosMenu className="text-3xl" />
      )}
    </button>
  );
}
