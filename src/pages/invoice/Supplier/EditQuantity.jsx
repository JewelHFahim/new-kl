/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useUpdateInvoiceMutation } from "../../../redux/feature/supplier/supplierApi";

function EditQuantity({  isOpen, closeModal, item }) {
  const { register, handleSubmit,  } = useForm({quantity: 1});
  const [updateInvoice] = useUpdateInvoiceMutation(item.id);


  const onSubmit = (data) => {

    const quantity = { quantity: parseFloat(data.quantity) };
    updateInvoice({ data: quantity, id: item.id });
    toast.success("updated");

    console.log(quantity);
    closeModal();
  };

  return (
    <div className="relative flex justify-center">
      {isOpen && (
        <div
          className="fixed inset-0 z-10 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="relative inline-block p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:max-w-sm rounded-xl  sm:my-8 sm:w-full sm:p-6"
            >
              <h2 className="text-[15px]">Edit Quantity</h2>

              <div className="flex items-center justify-between w-full mt-5 gap-x-2">
                <input
                  {...register("quantity")} 
                  type="number"
                  placeholder={item.quantity}
                  className="flex-1 block h-10 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:text-gray-300  focus:border-primary focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
                <button
                  onClick={closeModal}
                  className="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium dark:text-gray-200 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-40"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 sm:mx-2 w-full py-2.5 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-md hover:bg-green-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditQuantity;
