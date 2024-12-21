import React, { useState } from "react";
import { Menu, MapPin, Phone } from "lucide-react";
import CartIcon from "./navigation/CartIcon";
import MobileMenu from "./navigation/MobileMenu";
import { menuItems } from "../constants/menuItems";

const TopNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setExpandedItem(null);
  };

  const toggleSubmenu = (title: string) => {
    setExpandedItem(expandedItem === title ? null : title);
  };

  return (
    <div className="font-['Montserrat'] font-light">
      <nav className="bg-primary px-4 sm:px-6 py-4 shadow-md">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <button
              onClick={toggleMenu}
              className="lg:hidden text-white hover:text-accent transition-colors duration-300 p-2 -ml-2"
              aria-label="Toggle menu"
            >
              <Menu size={26} className="text-white" />
            </button>

            <button
              onClick={() => setIsStoreModalOpen(true)}
              className="flex items-center gap-2 text-sm text-white whitespace-nowrap hover:text-accent transition-colors duration-300 py-2 px-3 rounded-lg active:bg-white/10"
            >
              <MapPin size={18} />
              <span className="hidden xs:inline">TROUVER UNE BOUTIQUE</span>
            </button>

            <div className="flex items-center gap-4 sm:hidden">
              <CartIcon />
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="flex items-center gap-2 text-sm text-white whitespace-nowrap hover:text-accent transition-colors duration-300 py-2 px-3 rounded-lg active:bg-white/10"
            >
              <Phone size={18} />
              CONTACTEZ-NOUS
            </button>
            <CartIcon />
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isOpen}
        onClose={toggleMenu}
        menuItems={menuItems}
        expandedItem={expandedItem}
        onToggleSubmenu={toggleSubmenu}
      />
    </div>
  );
};

export default TopNavbar;