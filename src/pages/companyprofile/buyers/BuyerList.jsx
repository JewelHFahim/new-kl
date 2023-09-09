import { AiOutlinePlus } from "react-icons/ai";
import img1 from "../../../assets/user.jpg";
import img2 from "../../../assets/grapg.svg";
import CButton from "../../../utils/CButton";
import { useState } from "react";
import { Link } from "react-router-dom";
import HTitle from "../../../utils/HTitle";
import AddBuyer from "./AddBuyer";
import {
  useDeleteBuyerMutation,
  useGetBuyersQuery,
} from "../../../redux/feature/buyers/buyerApi";

const BuyerList = () => {
  const { data: buyers } = useGetBuyersQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteBuyer] = useDeleteBuyerMutation();

  const handleDelete = (id) => {
    deleteBuyer(id);
    console.log(id);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-[24px]">
      <HTitle>Buyer List</HTitle>

      <div className="flex justify-end items-center">
        <button
          onClick={openModal}
          className="w-[136px] h-[26px] bg-primary rounded-[13px] flex gap-2 justify-center items-center text-textColorBlack shadow-md "
        >
          <AiOutlinePlus /> Add Buyer
        </button>
      </div>

      <AddBuyer isModalOpen={isModalOpen} closeModal={closeModal} />

      {buyers?.results?.length >= 0 ? (
        <div className="grid grid-cols-1 gap-[27px]">
          {buyers?.results?.map((item, i) => (
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
                    {item?.customer_shop_name}
                  </h3>
                  <p className="text-[12px] text-[#7F909F] py-2">
                    Type: <span className="font-[600]">Buyer</span>
                  </p>
                  <p className="text-[12px] text-[#7F909F]">
                    Phone:
                    <span className="font-[600]">
                      {item.contact_person_phone}
                    </span>
                  </p>
                </div>
                <div className="w-[45px] h-[30px]">
                  <img src={img2} alt="" className="w-full h-full" />
                </div>
              </div>

              <div className="h-[40%] bg-[#8875FB] flex justify-between items-center px-[32px] font-worksans">
                <Link to={`/buyer/${item?.id}`}>
                  <CButton>View Details</CButton>
                </Link>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="border border-red-300 px-4 rounded-lg text-red-300 hover:text-white hover:bg-red-300 transform duration-200 shadow-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="flex justify-center py-16">
          <span className="loading loading-infinity w-20 loading-l text-primary"></span>
        </p>
      )}
    </div>
  );
};

export default BuyerList;
