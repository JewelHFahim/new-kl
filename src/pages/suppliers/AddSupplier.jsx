/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { CgCloseO } from "react-icons/cg";
import { usePostSupplierMutation } from "../../redux/feature/supplier/supplierApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddSupplier = ({ isModalOpen, closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [postSupplier] =
    usePostSupplierMutation();
  const navigate = useNavigate();

  const onSubmit = (data, event) => {
    event.preventDefault();
    const clearForm = event.target;

    const res = postSupplier(data);
    console.log(res.requestId);

    clearForm.reset();
    toast.success("Added Buyer");
    navigate("/allbuyer")
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
              Add Buyer
            </h2>

            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="username"
                >
                  Shop Name
                </label>
                <input
                  {...register("supplier_name", { required: true })}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
                {errors.supplier_name && <span className="text-sm text-red-300">This field is required !</span>}
              </div>

              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="emailAddress"
                >
                  Supplier Address
                </label>
                <input
                  {...register("supplier_address", { required: true })}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
                {errors.supplier_address && <span className="text-sm text-red-300">This field is required !</span>}
              </div>

              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="password"
                >
                  Contact Person
                </label>
                <input
                  {...register("contact_person_name", { required: true })}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
                {errors.contact_person_name && (
                  <span className="text-sm text-red-300">This field is required !</span>
                )}
              </div>

              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="password"
                >
                  Phone number
                </label>
                <input
                  {...register("contact_person_phone", { required: true })}
                  type="number"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
                {errors.contact_person_phone && (
                  <span className="text-sm text-red-300">This field is required !</span>
                )}
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
      )}
    </div>
  );
};

export default AddSupplier;
