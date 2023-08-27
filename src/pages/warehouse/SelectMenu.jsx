import { useRef, useState } from "react";
import { useGetSuppliersQuery } from "../../redux/feature/supplier/supplierApi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { input_filed_style } from "../../utils/someClasses";

const SelectMenu = ({ selectedItem, setSelectedItem }) => {
  const { data: suppliers } = useGetSuppliersQuery();
  const listboxRef = useRef();

  const [searchVal, setSearchVal] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleSearch = (e) => {
    setSearchVal(e.target.value.toLowerCase());
  };

  const filteredItems =
    suppliers?.results?.filter(
      (item) =>
        !searchVal ||
        (item.supplier_name &&
          item.supplier_name.toLowerCase().includes(searchVal))
    ) || [];

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className="relative max-w-xs px-4 text-base">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className={`flex items-center justify-around ${input_filed_style}`}
        >
          Supplier
          <MdKeyboardArrowDown />
        </button>

        {isOpen && (
          <div className="absolute w-full mt-1 bg-white border rounded-md shadow-sm">
            <input
              type="text"
              placeholder="Search..."
              className={` mt-0 ${input_filed_style}`}
              onChange={handleSearch}
              value={searchVal}
            />
            <ul
              ref={listboxRef}
              className="max-h-48 overflow-y-auto"
              role="listbox"
            >
              {filteredItems.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => handleItemClick(item)}
                  role="option"
                  aria-selected={selectedItem === item}
                  className={`${
                    selectedItem === item ? "bg-indigo-50" : ""
                  } px-3 py-2 cursor-pointer hover:bg-indigo-50`}
                >
                  {item.supplier_name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectMenu;
