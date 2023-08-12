import { useState } from "react";
import { MdKeyboardArrowDown } from 'react-icons/md';


const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      {/* Dropdown toggle button */}
      <button
        onClick={toggleDropdown}
        className="relative z-10 flex items-center px-2 h-[22px] text-[12px] border rounded-[12px] focus:border-blue-500 focus:ring-opacity-40  focus:ring-blue-300 focus:ring focus:outline-none text-[#3F3F44B2] text-opacity-[70%]"
      >
        <span className="mx-1">All</span>
        <MdKeyboardArrowDown className="text-lg"/>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute right-0 z-20 w-40 p-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl"
          onClick={() => setIsOpen(false)}
        >
          <a href="#" className=""> Invoice: #305421</a>




          {/* Rest of the menu items */}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
