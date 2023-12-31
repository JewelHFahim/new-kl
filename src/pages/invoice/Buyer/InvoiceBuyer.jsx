import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HTitle from "../../../utils/HTitle";
import { useForm } from "react-hook-form";
import CButton from "../../../utils/CButton";
import { toast } from "react-hot-toast";
import DatePicker from "react-datepicker";
import { FaRegTrashAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import {
  useGetBuyersQuery,
  useGetSingleBuyerQuery,
} from "../../../redux/feature/buyers/buyerApi";
import {
  addBuyer,
  removeFromInvoice,
} from "../../../redux/feature/buyers/buyerSlice";
import ToggleBuyer from "./ToggleBuyer";

const InvoiceBuyer = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const formattedDate = startDate.toISOString().slice(0, 16);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState("");
  const { data: allBuyers } = useGetBuyersQuery();
  const { addedProducts, addedBuyer, total } = useSelector(
    (state) => state.buyer
  );
  console.log(addedProducts);
  const { data: singleBuyer } = useGetSingleBuyerQuery(addedBuyer);

  // Handle supplier selection
  const handleBuyerChange = (e) => {
    const selected = e.target.value;
    setSelectedBuyer(selected);
    dispatch(addBuyer(selected));
  };

  // invoice data
  const invoiceData = {
    phone: singleBuyer?.contact_person_phone,
    email: null,
    order_note: "",
    payment_due: isChecked,
    order_total: total,
    invoice_date: formattedDate,
    customer: singleBuyer?.id,
  };

  //  generate invoice
  const onSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "https://jabed.pythonanywhere.com/product/order/create/",
        invoiceData
      );

      console.log(response)

      const generatedId = response.data.id;
      const updatedCart = addedProducts.map((item) => ({
        order: generatedId,
        product: item.product,
        quantity: item.quantity,
        product_price: item.product_price,
        discount_price: item.discount_price,
      }));

      const postRequests = updatedCart.map((item) =>
        axios.post("https://jabed.pythonanywhere.com/product/order-product/create/", item )
      );

      console.log(postRequests)

      await Promise.all(postRequests);
      toast.success("Invoice Created");
      setIsSubmitting(false);
      navigate("/buyerallinvoice");
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const handleRevome = (item) => {
    dispatch(removeFromInvoice(item));
    console.log(item);
    toast.error("Remove");
  };

  return (
    <section onSubmit={handleSubmit(onSubmit)} className="px-6 pb-5">
      <HTitle>Buyer-Invoice</HTitle>

      <section className="mt-[35px] h-[180px] rounded-[14px] shadow-md p-3 ">
        <div className="flex justify-between items-center">
          <p className="text-[10px] text-[#000] font-poppins">
            <span className="font-[600]">Invoice#</span> <span>30542</span>
          </p>

          <p className="text-[10px] text-[#000] font-poppins flex gap-2">
            <span className="font-[600]">Date:</span>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </p>
        </div>

        <div className="mt-[10px] font-poppins h-[133px] rounded-[14px] bg-[#F5F7F6] p-3">
          <p className="text-[12px] font-[700] text-[#000] border-b pb-1 flex gap-2 items-center">
            Invoice To:
            <select
              id="supplierDropdown"
              onChange={handleBuyerChange}
              value={selectedBuyer}
            >
              <option value="">All Buyers</option>
              {allBuyers?.results?.map((buyer) => (
                <option key={buyer.id} value={buyer.id}>
                  {buyer.customer_shop_name}
                </option>
              ))}
            </select>
          </p>

          <div className="mt-3 text-[10px] text-[#000] flex items-center gap-2">
            <p className="font-[600]">Name: </p>
            <span>{singleBuyer?.customer_shop_name}</span>
          </div>

          <p className="py-1 text-[10px] text-[#000] flex gap-2">
            <span className="font-[600]">Phone : </span>
            <span> {singleBuyer?.contact_person_phone} </span>
          </p>

          <p className="text-[10px] text-[#000] flex gap-2">
            <span className="font-[600]">Address :</span>
            <span> {singleBuyer?.customer_shop_address} </span>
          </p>
        </div>
      </section>

      <div className="mt-2 flex justify-end">
        <ToggleBuyer isChecked={isChecked} setIsChecked={setIsChecked} />
      </div>

      <div className="mt-[35px] flex justify-end">
        <Link to="/addbuyerproduct">
          <button className="text-[12px] text-[#0500FF] font-poppins font-[500]">
            Add Product
          </button>
        </Link>
      </div>

      {addedProducts?.length > 0 && (
        <div className="h-[100%] rounded-[14px] shadow-md mx-[-24px]">
          <div className="overflow-x-auto">
            <table className="table font-poppins text-[#000]">
              <thead>
                <tr className="text-[10px]">
                  <th>SL</th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Discount</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>

              <tbody className="bg-[#F5F7F6]">
                {addedProducts?.map((item, i) => (
                  <tr key={i} className="text-[9px] font-[300]">
                    <th className="text-[10px] font-[500]"> {i + 1} </th>
                    <td>{item?.product_name}</td>
                    <td>{item?.product_price}</td>
                    <td>{item?.quantity}</td>
                    <td>{item?.discount_price}</td>
                    <td>
                      {Number(item?.product_price) * Number(item?.quantity) -
                        Number(item?.quantity) * Number(item?.discount_price)}
                    </td>
                    <td>
                      <button onClick={() => handleRevome(item)}>
                        <FaRegTrashAlt className="text-[17px] text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}

                <tr className="border-t bg-slate-100">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="text-[8px] font-semibold">Total:</td>
                  <td className="text-[8px] font-semibold"> {total} </td>
                  <td className="pb-4"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {addedProducts?.length > 0 && (
        <div className="mt-6 flex  justify-center gap-4">
          <CButton>Print Invoice</CButton>

          <button onClick={onSubmit} disabled={isSubmitting}>
            <CButton> {isSubmitting ? "Saving..." : "Save"}</CButton>
          </button>
        </div>
      )}
    </section>
  );
};

export default InvoiceBuyer;
