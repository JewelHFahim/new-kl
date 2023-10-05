/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { HiArrowLongLeft } from 'react-icons/hi2';
import { useUpdateInvoiceMutation } from "../../../redux/feature/supplier/supplierApi";


const  EditInvoice = () =>{

  const { id } = useParams();


  const [updateInvoice] = useUpdateInvoiceMutation(id)

  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {

    const quantity = {quantity:parseFloat(data.quantity)};
    console.log(quantity)

    updateInvoice({data: quantity, id});

    // console.log(data)
  
  }

  return (
    <div className="relative flex justify-center">


   
        <div
          className="fixed inset-0 z-10 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">

            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
              &#8203;
            </span>

            <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
              <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                Edit Invoice
              </h3>
              

              <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                
                <div className="flex flex-col">
                <label  className="text-sm text-gray-700 dark:text-gray-200 ">
                  Quantity
                </label>

                <input type="number" 
                {...register("quantity")}
              placeholder="Qunatity" className="border py-[5px] rounded-lg px-2 focus:outline-none placeholder:text-opacity-[50%] placeholder:text-slate-400 placeholder:text-[12px]"/>

            
                </div>

               

                <div className="mt-4 sm:flex sm:items-center sm:-mx-2">

                  <button type="submit"
                    className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  >
                    Save
                  </button>
                </div>
              </form>
              <Link to={`/supplierallinvoice/`}><p className="text-[10px] mt-3 mx-1 text-primary flex items-center gap-1"> <HiArrowLongLeft className="text-lg"/> Back Invoice</p></Link>
            </div>
          </div>
        </div>
     
    </div>
  );
}

export default EditInvoice;
