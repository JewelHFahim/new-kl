import CButton from "../../utils/CButton";
import HTitle from "../../utils/HTitle";
import AddProduct from "./AddProduct";

const Invoice = () => {
  return (
    <div className="px-6 pb-5">
      <HTitle>Invoice</HTitle>

      <div className="mt-[35px] h-[180px] rounded-[14px] shadow-md p-3">
        <div className="flex justify-between items-center">
          <p className="text-[10px] text-[#000] font-poppins">
            <span className="font-[600]">Invoice#</span> <span>30542</span>
          </p>

          <p className="text-[10px] text-[#000] font-poppins">
            <span className="font-[600]">Date:</span> <span>15/07/2023</span>
          </p>
        </div>

        <div className="mt-[10px] font-poppins h-[133px] rounded-[14px] bg-[#F5F7F6] p-3">
          <p className="text-[12px] font-[700] text-[#000] border-b pb-1">
            Invoice To:
          </p>

          <p className="mt-3 text-[10px] text-[#000]">
            <span className="font-[600]">Name :</span>
            <span>Supplier Name</span>
          </p>

          <p className="py-1 text-[10px] text-[#000]">
            <span className="font-[600]">Phone :</span>
            <span>017- 000 00000</span>
          </p>

          <p className="text-[10px] text-[#000]">
            <span className="font-[600]">Address :</span>
            <span>Supplier Address in Dhaka Bangladesh.</span>
          </p>
        </div>
      </div>

      <div className="mt-[35px] flex justify-end">
        <button onClick={() => window.my_modal_3.showModal()} className="text-[12px] text-[#0500FF] font-poppins font-[500]">
          Add Product
        </button>

        <AddProduct/>
      </div>

      <div className=" h-[313px] rounded-[14px] shadow-md mx-[-24px] ">
        <div className="overflow-x-auto">
          <table className="table font-poppins text-[#000]">
            <thead>
              <tr className="text-[10px]">
                <th>SL</th>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody className="bg-[#F5F7F6]">
              {[1, 2, 3].map((item, i) => (
                <tr key={i} className="text-[9px] font-[300]">
                  <th className="text-[10px] font-[500]">{i + 1}</th>
                  <td>Potato</td>
                  <td>500</td>
                  <td>5</td>
                  <td>5,000</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex justify-between items-center px-6">
          <div className="w-[50%]"></div>

          <div className="text-[#000] text-[8px] w-[50%] px-3">

            <div className="border-b pb-2 mb-1 flex flex-col gap-y-2">
              <p className="flex justify-between">
                Sub Total: <span>27,000</span>
              </p>
              <p className="flex justify-between">
                Tax: <span>27,00</span>
              </p>
              <p className="flex justify-between">
                Delivery: <span>100</span>
              </p>
            </div>

            <p className="font-[600] flex justify-between">Total: <span>29,800</span></p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex  justify-center gap-4">
        <CButton>Print Invoice</CButton>
        <CButton>Save Invoice</CButton>
      </div>

    </div>
  );
};

export default Invoice;
