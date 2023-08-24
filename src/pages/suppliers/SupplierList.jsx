import HTitle from "../../utils/HTitle";
import { AiOutlinePlus } from "react-icons/ai";
import img1 from "../../assets/user.jpg";
import img2 from "../../assets/grapg.svg";
import CButton from "../../utils/CButton";
import { useGetSuppliersQuery } from "../../redux/feature/supplier/supplierApi";
import { useState } from "react";
import AddBuyer from "./AddSupplier";
import { Link } from "react-router-dom";

const SupplierList = () => {
  const { data: suppliers } = useGetSuppliersQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-[24px]">
      <HTitle>Supplier List</HTitle>

      <div className="flex justify-end items-center">
        <button onClick={openModal} className="w-[136px] h-[26px] bg-primary rounded-[13px] flex gap-2 justify-center items-center text-textColorBlack shadow-md ">
          <AiOutlinePlus /> Add Supplier
        </button>
      </div>

      <AddBuyer isModalOpen={isModalOpen} closeModal={closeModal} />

      <div className="grid grid-cols-1 gap-[27px]">
        {suppliers?.results?.map((item, i) => (
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
                  {item?.supplier_name}
                </h3>
                <p className="text-[12px] text-[#7F909F] py-2">
                  Type: <span className="font-[600]">Supplier</span>
                </p>
                <p className="text-[12px] text-[#7F909F]">
                  Phone: <span className="font-[600]">{item.contact_person_phone}</span>
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

              <Link to={`/supplier/${item?.id}`}>
              <CButton>View Details</CButton>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplierList;
