/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useGetProductsQuery } from "../../../redux/feature/products/productApi";
import { addOrderedProducts } from "../../../redux/feature/buyers/buyerSlice";

const ProductListDropdownBuyer = ({ selectedItem, setSelectedItem}) => {

  
const {data: products} = useGetProductsQuery();


  const listboxRef = useRef();
  const [searchVal, setSearchVal] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleSearch = (e) => {
    setSearchVal(e.target.value.toLowerCase());
  };

  const filteredItems =
    products?.results?.filter(
      (item) =>
        !searchVal ||
        (item?.product_name &&
          item?.product_name.toLowerCase().includes(searchVal))
    ) || [];

  const handleItemClick = (item) => {
    setSelectedItem(item);
    // dispatchEvent(addOrderedProducts(item))
    console.log(item)
    setIsOpen(false);
  };

  return (
    <div className="relative max-w-xs px-4 text-base z-10">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className={`flex items-center justify-around text-[12px]`}
        >
          Select Products
          <MdKeyboardArrowDown />
        </button>

        {isOpen && (
          <div className="absolute w-[200px] mt-1 bg-white border rounded-md shadow-sm">
            <input
              type="text"
              placeholder="Search..."
              className={` mt-0 

              "block w-[200px] px-2   text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"


              `}
              onChange={handleSearch}
              value={searchVal}
            />
            <ul
              ref={listboxRef}
              className="max-h-48 overflow-y-auto"
              role="listbox"
            >
              {filteredItems?.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => handleItemClick(item)}
                  role="option"
                  aria-selected={selectedItem === item}
                  className={`${
                    selectedItem === item ? "bg-indigo-50" : ""
                  } px-3 py-2 cursor-pointer hover:bg-indigo-50`}
                >
                  {item?.product_name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListDropdownBuyer;
