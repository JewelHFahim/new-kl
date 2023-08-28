/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { CgCloseO } from "react-icons/cg";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { usePostProductMutation } from "../../redux/feature/products/productApi";
import SelectMenu from "./SelectMenu";
import { useState } from "react";
import { input_filed_style } from "../../utils/someClasses";
const AddProduct = ({ isModalOpen, closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [postProduct] = usePostProductMutation();

  const [selectedItem, setSelectedItem] = useState(null);

  const navigate = useNavigate();

  const onSubmit = (data, event) => {
    event.preventDefault();
    const clearForm = event.target;
    const productData = {
      ...data,
      is_available: true,
      supplier: selectedItem.id,
    };
    postProduct(productData);
    console.log(productData);
    clearForm.reset();
    toast.success("Added Buyer");
    navigate("/warehouse");
  };

  return (
    
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-[30%] transform duration-300">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-8 rounded max-w-4xl mx-auto dark:bg-gray-800 border drop-shadow-lg relative"
          >
            <div
              onClick={closeModal}
              className="text-2xl text-slate-500 hover:text-red-600 absolute right-4 top-4"
            >
              <CgCloseO />
            </div>

            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white text-center">
              Add Product
            </h2>

            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-gray-700 dark:text-gray-200">
                  Product Name
                </label>
                <input
                  {...register("product_name", { required: true })}
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
                  Description
                </label>
                <input
                  {...register("product_description", { required: true })}
                  type="text"
                  className={input_filed_style}
                />
                {errors.product_description && (
                  <span className="text-sm text-red-300">
                    This field is required !
                  </span>
                )}
              </div> */}

              {/* <div>
                <label className="text-gray-700 dark:text-gray-200">
                  Buying Price
                </label>
                <input
                  {...register("buying_price", { required: true })}
                  type="number"
                  className={input_filed_style}
                />
                {errors.buying_price && (
                  <span className="text-sm text-red-300">
                    This field is required !
                  </span>
                )}
              </div> */}

              {/* <div>
                <label className="text-gray-700 dark:text-gray-200">
                  Selling Price
                </label>
                <input
                  {...register("selling_price", { required: true })}
                  type="number"
                  className={input_filed_style}
                />
                {errors.selling_price && (
                  <span className="text-sm text-red-300">
                    This field is required !
                  </span>
                )}
              </div> */}

              {/* <div>
                <label className="text-gray-700 dark:text-gray-200">
                  Stock
                </label>
                <input
                  {...register("stock", { required: true })}
                  type="number"
                  className={input_filed_style}
                />
                {errors.stock && (
                  <span className="text-sm text-red-300">
                    This field is required !
                  </span>
                )}
              </div> */}

              <div className="z-10 mt-6">
                <SelectMenu
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                />
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
          </form>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
