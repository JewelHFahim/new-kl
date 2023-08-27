import HTitle from "../../../utils/HTitle";
import { LuEdit } from "react-icons/lu";
import { BsPlus } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import img1 from "../../../assets/user.jpg";
import img2 from "../../../assets/grapg.svg";
import img3 from "../../../assets/box.jpeg";
import { useGetProductsQuery } from "../../../redux/feature/products/productApi";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGetSingleBuyerQuery } from "../../../redux/feature/buyers/buyerApi";
import EditBuyer from "./EditBuyer";

const SingleBuyer = () => {

  const {id} = useParams();
  const { data } = useGetProductsQuery();
  
  const {data: singleBuyer } = useGetSingleBuyerQuery(id);

  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-[24px]">
      <HTitle>Buyer</HTitle>

      <div className="h-[267px] rounded-[14px] my-5 p-3 relative flex flex-col items-center shadow-md">
        <button onClick={openModal} className="absolute right-3 top-3">
          <LuEdit className="text-[22px]" />
        </button>
        <EditBuyer isModalOpen={isModalOpen} closeModal={closeModal} />

        <div className="flex flex-col items-center gap-y-3">
          <div className=" relative w-[68px] h-[68px]">
            <img src={img1} alt="" className="w-[68px] h-[68px] rounded-full" />

            <div className="absolute right-[-5px] bottom-[-8px] z-50 bg-white w-[30px] h-[30px] rounded-full flex justify-center items-center shadow-md">
              <BsPlus className="text-[20px]" />
            </div>
          </div>

          <div className="font-poppins text-center">
            <h2 className="text-[16px] font-[600] text-textColorBlack ">
              {singleBuyer?.customer_shop_name}
            </h2>
            <p className="text-[#838B88] text-[12px]">Buyer</p>
          </div>
        </div>

        <div className="h-[98px] w-full bg-[#F5F7F6] rounded-[14px] mt-4 p-3 font-poppins text-[#000] text-[12px]">
          <p className="flex justify-between border-b border-[#D9E9E3]">
            <span>Code:</span> <span>BSD015-{singleBuyer?.id}</span>
          </p>

          <p className="flex justify-between  mt-3">
            <span>Address:</span> <span>H-11, R-15, BLock-G, Banasree ({singleBuyer?.customer_shop_address})</span>
          </p>
        </div>
      </div>

      {/* Contact Person */}
      <div className="mt-7 w-full h-[162px] rounded-[14px] shadow-md font-poppins p-3">
        <p className="text-[12px]">Contact Person:</p>

        <div className="h-[98px] w-full bg-[#F5F7F6] rounded-[14px] mt-4 p-3 font-poppins text-[#000] text-[12px]">
          <p className="flex justify-between border-b border-[#D9E9E3]">
            Name: Contact Person Name ({singleBuyer?.contact_person_name})
          </p>

          <p className="flex justify-between  mt-3">Phone: 017-000 00000 ({singleBuyer?.contact_person_phone})</p>
        </div>
      </div>

      {/* Balance */}
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

      {/* Products */}
      <div className=" mt-[75px]">
        <h2 className="text-[20px] font-[600] text-textColorBlack">Products</h2>

        <div className="bg-[#BAD1E8] rounded-[8px] h-[32px] mt-4 flex items-center px-4">
          <BiSearchAlt className="text-[20px]" />
          <input
            type="text"
            placeholder="Product Name"
            className="w-full h-8 bg-transparent px-[14px] focus:outline-none"
          />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-y-6">
          {data?.results?.map((item, i) => (
            <div key={i} className="flex  items-center gap-3">
              <img
                src={img3}
                alt=""
                className="w-[48px] h-[48px] rounded-[8px] shadow-md"
              />
              <p className="text-[12px] font-worksans text-textColorBlack font-[500]">
                {item.product_name}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default SingleBuyer;
