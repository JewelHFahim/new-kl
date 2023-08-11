import HTitle from "../../utils/HTitle";
import { AiOutlinePlus } from "react-icons/ai";
import img1 from "../../assets/user.jpg";
import img2 from "../../assets/grapg.svg";
import CButton from "../../utils/CButton";

const BuyerList = () => {
  return (
    <div className="p-[24px]">
      <HTitle>Buyer List</HTitle>

      <div className="flex justify-end items-center">
        <button className="w-[136px] h-[26px] bg-primary rounded-[13px] flex gap-2 justify-center items-center text-textColorBlack shadow-md">
          <AiOutlinePlus /> Add Supplier
        </button>
      </div>

      <div className="grid grid-cols-1 gap-[27px]">
        {[1, 2, 3, 4, 5].map((item, i) => (
          <div
            key={i}
            className="mt-4 h-[167px] rounded-[24px] flex flex-col overflow-hidden shadow-lg"
          >
            <div className="h-[60%] flex flex-row justify-between px-[14px] pt-[14px]">
              <div>
                <img
                  src={img1}
                  alt=""
                  className="w-[54px] h-[54px] rounded-[15px] object-cover"
                />
              </div>
              <div>
                <h3 className="text-[#0D120E] text-[14px] font-[700] font-poppins ">
                  Supplier Store Name
                </h3>
                <p className="text-[12px] text-[#7F909F] py-2">
                  Type: <span className="font-[600]">Supplier</span>
                </p>
                <p className="text-[12px] text-[#7F909F]">
                  Phone: <span className="font-[600]">017-00000000</span>
                </p>
              </div>
              <div className="w-[45px] h-[30px]">
                <img src={img2} alt="" className="w-full h-full" />
              </div>
            </div>

            <div className="h-[40%] bg-[#8875FB] flex justify-between items-center px-[32px] font-worksans">
              <div className="">
                <p className="text-[12px] font-[700] text-white text-opacity-[705]">
                  Total (Dr./Cr.)
                </p>
                <p className="text-[24px] text-[#00FFC2] font-[500] ">$167</p>
              </div>

              <CButton>View Details</CButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerList;
