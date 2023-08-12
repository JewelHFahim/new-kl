import { BsPlus } from "react-icons/bs";
import HTitle from "../../utils/HTitle";
import { LuEdit } from "react-icons/lu";
import img1 from "../../assets/user.jpg";
import img2 from "../../assets/grapg.svg";


const Profile = () => {
  return (
    <div className="px-[24px]">

      
      <HTitle>Profile</HTitle>

      <div className="h-[267px] rounded-[14px] my-5 p-3 relative flex flex-col items-center shadow-md">
        <div className="absolute right-3 top-3">
          <LuEdit className="text-[22px]" />
        </div>

        <div className="flex flex-col items-center gap-y-3">
          <div className=" relative w-[68px] h-[68px]">
            <img src={img1} alt="" className="w-[68px] h-[68px] rounded-full" />

            <div className="absolute right-[-5px] bottom-[-8px] z-50 bg-white w-[30px] h-[30px] rounded-full flex justify-center items-center shadow-md">
              <BsPlus className="text-[20px]" />
            </div>
          </div>

          <div className="font-poppins text-center">
            <h2 className="text-[16px] font-[600] text-textColorBlack ">
              Buyer Shop name
            </h2>
            <p className="text-[#838B88] text-[12px]">Buyer</p>
          </div>
        </div>

        <div className="h-[98px] w-full bg-[#F5F7F6] rounded-[14px] mt-4 p-3 font-poppins text-[#000] text-[12px]">
          <p className="flex justify-between border-b border-[#D9E9E3]">
            <span>Log in ID:</span> <span>BSD015</span>
          </p>

          <p className="flex justify-between  mt-3">
            <span>Password:</span> <span>***********</span>
          </p>
        </div>
      </div>

      <div className="mt-7 h-[140px] rounded-[24px] flex flex-col overflow-hidden shadow-md">
        <div className="h-[50%] flex flex-row justify-between p-[24px] bg-[#F6F6F6]">
          <h3 className="text-textColorBlack text-[16px] font-[600] font-worksans ">
            Balance
          </h3>

          <div className="w-[40px] h-[30px]">
            <img src={img2} alt="img" className="w-full h-full" />
          </div>
        </div>

        <div className="h-[50%] bg-textColorBlack flex justify-between items-center px-[70px] font-worksans">
          <div className="">
            <p className="text-[12px] font-[300] text-white text-opacity-[70%]">
              Debit
            </p>
            <p className="text-[24px] text-[#CCEABB] font-[500] ">$167</p>
          </div>

          <div className="">
            <p className="text-[12px] font-[300] text-white text-opacity-[70%]">
              Credit
            </p>
            <p className="text-[24px] text-[#CCEABB] font-[500] ">$167</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;
