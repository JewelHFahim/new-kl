import { useForm } from "react-hook-form";
import CButton from "../../utils/CButton";
import HTitle from "../../utils/HTitle";
import AddProduct from "./AddProduct";
import DropdownSupplier from "./DropdownSupplier";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const Invoice = () => {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();

  const { addedProducts, total } = useSelector((state) => state.invoice);

  const { register, handleSubmit } = useForm();

  const [selectedItem, setSelectedItem] = useState(null);


  // Test Start
  const [isSubmitting, setIsSubmitting] = useState(false);

  const invoiceData = {
    phone: selectedItem?.phone,
    email: null,
    order_note: "",
    status: "New",
    payment_due: true,
    order_total: 10.0,
    supplier: (selectedItem?.id)
  };

  // const cart = [
  //   {
  //     quantity: 50,
  //     product_price: 50,
  //     order: 9,
  //     product: 7,
  //   },
  //   {
  //     quantity: 10,
  //     product_price: 70,
  //     order: 9,
  //     product: 8,
  //   },
  // ];

  const onSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/users",
        invoiceData
      );
      console.log(response);

      const generatedId = response.data.insertedId;
      const updatedCart = addedProducts.map((item) => {
        return {
          ...item,
          order: generatedId,
        };
      });

      for (const item of updatedCart) {
        await axios.post(
          "http://localhost:5000/orders/",
          item
        );
      }

      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <section onSubmit={handleSubmit(onSubmit)} className="px-6 pb-5">
      <HTitle>Invoice</HTitle>

      <section className="mt-[35px] h-[180px] rounded-[14px] shadow-md p-3 ">
        <div className="flex justify-between items-center">
          <p className="text-[10px] text-[#000] font-poppins">
            <span className="font-[600]">Invoice#</span> <span>30542</span>
          </p>

          <p className="text-[10px] text-[#000] font-poppins">
            <span className="font-[600]">Date:</span> <span> {date} </span>
          </p>
        </div>

        <div className="mt-[10px] font-poppins h-[133px] rounded-[14px] bg-[#F5F7F6] p-3">
          <p className="text-[12px] font-[700] text-[#000] border-b pb-1 flex items-center">
            Invoice To:
            <div className="font-[500]">
              <DropdownSupplier
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
            </div>
          </p>

          <div className="mt-3 text-[10px] text-[#000] flex items-center gap-2">
            <p className="font-[600]">Name: </p>
            <span>{selectedItem?.supplier_name}</span>
          </div>

          <p className="py-1 text-[10px] text-[#000] flex gap-2">
            <span className="font-[600]">Phone : </span>
            <span>{selectedItem?.contact_person_phone} </span>
          </p>

          <p className="text-[10px] text-[#000] flex gap-2">
            <span className="font-[600]">Address :</span>
            <span>{selectedItem?.supplier_address}</span>
          </p>
        </div>

      </section>

      <div className="mt-[35px] flex justify-end">
        <Link to="/addproductinvoice"><button className="text-[12px] text-[#0500FF] font-poppins font-[500]">Add Product</button></Link>
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
                {/* <th></th> */}
              </tr>
            </thead>
            <tbody className="bg-[#F5F7F6]">
              {addedProducts?.map((item, i) => (

                <tr key={i} className="text-[9px] font-[300]">
                  <th className="text-[10px] font-[500]">  {i + 1}  </th>
                  <td>{item?.product_name}</td>
                  <td>{item?.buying_price}</td>
                  <td>{item?.stock}</td>
                  <td>
                    {(Number(item?.buying_price) * Number(item?.stock)).toFixed(
                      2
                    )}
                  </td>
                  {/* <td><button onClick={()=>dispatch(removeFromList(item?.id))} >Remove</button></td> */}
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
                Sub Total: <span>{total}</span>
              </p>
              <p className="flex justify-between">
                Tax: <span>{total * 0.1}</span>
              </p>
              <p className="flex justify-between">
                Delivery: <span>100</span>
              </p>
            </div>

            <p className="font-[600] flex justify-between">
              Total: <span>{total + total * 0.1 + 100}</span>
            </p>
          </div>
        </div>


      </div>


      <div className="mt-6 flex  justify-center gap-4">
        <CButton>Print Invoice</CButton>

        <button onClick={onSubmit} disabled={isSubmitting}>
          <CButton> {isSubmitting ? "Saving..." : "Save"}</CButton>
        </button>
      </div>


    </section>
  );
};

export default Invoice;
