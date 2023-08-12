import CButton from "../../utils/CButton";

const AddProduct = () => {
  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <form method="dialog" className="modal-box bg-[#8792F3]">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">
            ✕
          </button>

          <div className="flex flex-col gap-2 mt-4">
            <input
              type="text"
              className="h-[27px] rounded-[24px] text-[10px] font-poppins px-[20px]"
              placeholder="Product Name"
            />
            <input
              type="text"
              className="h-[27px] rounded-[24px] text-[10px] font-poppins px-[20px]"
              placeholder="Price"
            />
            <input
              type="text"
              className="h-[27px] rounded-[24px] text-[10px] font-poppins px-[20px]"
              placeholder="Product Quantity"
            />
          </div>

          <div className="flex justify-center mt-6">
            <CButton className={`rounded-[73px]`}>Add Product</CButton>
          </div>

        </form>
      </dialog>
    </div>
  );
};

export default AddProduct;
