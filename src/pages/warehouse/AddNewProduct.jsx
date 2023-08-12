import CButton from "../../utils/CButton";
import box from "../../assets/box2.jpg"
import { BsPlus } from "react-icons/bs";

const AddNewProduct = () => {
  return (
    <div>
      <dialog id="my_modal_4" className="modal">
        <form method="dialog" className="modal-box bg-[#8792F3]">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">
            ✕
          </button>

          <div className="flex justify-around gap-4 items-center w-full ">

            <div className="w-[64px] h-[64px] rounded-[8px]  shadow-xl relative">
              <img src={box} alt="" className="w-full h-full rounded-[8px]"/>
              <div className="absolute right-[-5px] bottom-[-8px] z-50 bg-white w-[30px] h-[30px] rounded-full flex justify-center items-center shadow-md">
              <BsPlus className="text-[20px]" />
            </div>
            </div>

            <div className="flex flex-col gap-2 w-[70%]">
              <input
                type="text"
                className="h-[27px] rounded-[24px] text-[10px] font-poppins px-[20px] focus:outline-none"
                placeholder="Product Name"
              />
              <input
                type="text"
                className="h-[27px] rounded-[24px] text-[10px] font-poppins px-[20px] focus:outline-none"
                placeholder="Supplier Name/Code"
              />
            </div>

          </div>

          <div className="flex justify-center mt-6">
            <CButton className={`rounded-[73px]`}>Add Product</CButton>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default AddNewProduct;
