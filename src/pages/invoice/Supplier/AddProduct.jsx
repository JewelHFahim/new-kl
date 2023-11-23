import { useState, useEffect } from "react";
import { input_filed_style } from "../../../utils/someClasses";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { BsArrowLeft } from "react-icons/bs";
import { addToInvoice } from "../../../redux/feature/supplier/supplierSlice";
import ProductListDropdown from "./ProductListDropdown";
import { v4 as uuidv4 } from 'uuid';


const AddSupplierProduct = () => {


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedItem, setSelectedItem] = useState(null);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [quantity, setQuantity] = useState(0); 

  useEffect(() => {
    if (selectedItem) {
      setProductName(selectedItem.product_name);
      setProductPrice(selectedItem.selling_price);
      setQuantity(selectedItem.stock);
    }
  }, [selectedItem]);

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductPriceChange = (e) => {
    setProductPrice(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const clearForm = e.target;

    const product = {
      id: uuidv4(),
      product_name: productName,
      product_price: productPrice,
      quantity,
      product: selectedItem?.id,
    };

    dispatch(addToInvoice(product));

    console.log(product);

    clearForm.reset();
    toast.success("Added");
    navigate("/invoice");
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-[30%] transform duration-300 z-10 ">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded max-w-4xl mx-auto  border drop-shadow-lg relative"
        >
          <div>
          <label className="text-gray-700 dark:text-gray-200 flex">
                Product Name:
                <ProductListDropdown
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                />
              </label>
            <input
              value={productName}
              onChange={handleProductNameChange}
              type="text"
              className={input_filed_style}
            />
          </div>

          <div className="mt-2">
            <label className="text-gray-700 dark:text-gray-200">
              Selling Price
            </label>
            <input
              value={productPrice}
              onChange={handleProductPriceChange}
              type="number"
              className={input_filed_style}
            />
          </div>

          <div className="mt-2">
            <label className="text-gray-700 dark:text-gray-200">Quantity</label>
            <input
              value={quantity}
              onChange={handleQuantityChange}
              type="number"
              className={input_filed_style}
            />
          </div>

          <div className="flex justify-end mt-6 z-0">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Submit
            </button>

            <Link
              to="/invoice"
              className="flex items-center gap-2 text-sm text-primary absolute bottom-0 left-0 m-2 mt-4"
            >
              <BsArrowLeft /> Back To Invoice
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSupplierProduct;
