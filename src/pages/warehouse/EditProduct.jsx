/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { CgCloseO } from "react-icons/cg";
import { toast } from "react-hot-toast";
import {
  useSingleProductQuery,
  useUpdateProductMutation,
} from "../../redux/feature/products/productApi";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: singleProduct } = useSingleProductQuery(id);
  const [updateProduct] = useUpdateProductMutation(id);

  const onSubmit = (data, event) => {
    event.preventDefault();

    const clearForm = event.target;
    const updateData = { ...data, supplier: singleProduct.supplier };
    updateProduct({ data, id });
    console.log(updateData);
    clearForm.reset();
    toast.success("Updated Supplier");
    navigate("/warehouse");
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-[30%] transform duration-300 z-[99]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded max-w-4xl mx-auto dark:bg-gray-800 border drop-shadow-lg relative"
        >
          <Link to="/warehouse" className="text-2xl text-slate-500 hover:text-red-600 absolute right-4 top-4">
            <CgCloseO />
          </Link>

          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white text-center">
            Edit Product
          </h2>

          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Product name
              </label>
              <input
                defaultValue={singleProduct?.product_name}
                {...register("product_name")}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Description
              </label>
              <input
                defaultValue={singleProduct?.product_description}
                {...register("product_description")}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Buying Price
              </label>
              <input
                defaultValue={singleProduct?.buying_price}
                {...register("buying_price")}
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Selling Price
              </label>
              <input
                defaultValue={singleProduct?.selling_price}
                {...register("selling_price")}
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Stock
              </label>
              <input
                defaultValue={singleProduct?.stock}
                {...register("stock")}
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
