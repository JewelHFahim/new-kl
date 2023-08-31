/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { input_filed_style } from "../../../utils/someClasses";
import { useDispatch } from "react-redux";
import { addToInvoice } from "../../../redux/feature/invoice/invoiceSlice";
import { useState } from "react";
import ProductListDropdown from "./ProductListDropdown";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const AddProduct = () => {
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data, event) => {
    event.preventDefault();
    const clearForm = event.target;
    dispatch(addToInvoice({ ...data, product: selectedItem?.id }));
    console.log({ ...data, product: selectedItem?.id });

    clearForm.reset();
    toast.success("Added");
    navigate("/invoice");
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-[30%] transform duration-300 z-10 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded max-w-4xl mx-auto dark:bg-gray-800 border drop-shadow-lg relative"
        >
          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white text-center">
            Add Product
          </h2>

          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 dark:text-gray-200 flex">
                Product Name:
                <ProductListDropdown
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                />
              </label>
              <input
                defaultValue={selectedItem?.product_name}
                {...register(".product_name", { required: true })}
                type="text"
                className={input_filed_style}
              />
              {errors.product_name && (
                <span className="text-sm text-red-300">
                  This field is required !
                </span>
              )}
            </div>

            {/* <div>
              <label className="text-gray-700 dark:text-gray-200">
                Buying Price
              </label>
              <input
                defaultValue={selectedItem?.buying_price}
                {...register("product_price", { required: true })}
                type="number"
                className={input_filed_style}
              />
              {errors.product_price && (
                <span className="text-sm text-red-300">
                  This field is required !
                </span>
              )}
            </div> */}

            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Selling Price
              </label>
              <input
                defaultValue={selectedItem?.selling_price}
                {...register("product_price", { required: true })}
                type="number"
                className={input_filed_style}
              />
              {errors.product_price && (
                <span className="text-sm text-red-300">
                  This field is required !
                </span>
              )}
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Quantity
              </label>
              <input
                defaultValue={selectedItem?.stock}
                {...register("quantity", { required: true })}
                type="number"
                className={input_filed_style}
              />
              {errors.quantity && (
                <span className="text-sm text-red-300">
                  This field is required !
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6 z-0">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Submit
            </button>
          </div>

          <Link
            to="/invoice"
            className="flex items-center gap-2 text-lg text-primary absolute bottom-0 left-0 m-2"
          >
            <BsArrowLeft /> Back To Invoice
          </Link>
        </form>
      </div>
      {/* )} */}
    </div>
  );
};

export default AddProduct;
