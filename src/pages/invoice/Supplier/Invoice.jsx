import { useState, useEffect } from "react";
import axios from "axios";
import {
  useGetSingleSupplierQuery,
  useGetSuppliersQuery,
} from "../../../redux/feature/supplier/supplierApi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HTitle from "../../../utils/HTitle";
import { useForm } from "react-hook-form";
import CButton from "../../../utils/CButton";
import { toast } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  addSupplierUnderProducts,
  addSuppliers,
  removeFromInvoiceSup,
} from "../../../redux/feature/supplier/supplierSlice";
import ToggleSupplier from "./ToggleSupplier";
import { FaRegTrashAlt } from "react-icons/fa";

const Invoice = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const formattedDate = startDate.toISOString().slice(0, 16);
  const dispatch = useDispatch();
  const { handleSubmit } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const { data: allSuppliers } = useGetSuppliersQuery();

  const { addedProducts, addedSupplier, total } = useSelector(
    (state) => state.supplier
  );

  const { data: singleSupplier } = useGetSingleSupplierQuery(addedSupplier);

  // Handle supplier selection
  const handleSupplierChange = (e) => {
    const selected = e.target.value;
    setSelectedSupplier(selected);
    dispatch(addSuppliers(selected));
    const url = `https://jabed.pythonanywhere.com/product/search-supplier/?supplier=${selected}`;
    setSearchUrl(url);
  };

  useEffect(() => {
    if (searchUrl) {
      axios
        .get(searchUrl)
        .then((response) => {
          dispatch(addSupplierUnderProducts(response.data));
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [dispatch, searchUrl]);

  const invoiceData = {
    phone: singleSupplier?.contact_person_phone,
    email: null,
    order_note: "",
    status: "New",
    invoice_date: formattedDate,
    payment_due: isChecked,
    supplier: singleSupplier?.id,
    order_total: total,
  };

  // Generate Order
  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "https://jabed.pythonanywhere.com/supplier/supplier-order/create/",
        invoiceData
      );
      console.log(invoiceData);

      const generatedId = response.data.id;

      const updatedCart = addedProducts.map((item) => ({
        ...item,
        order: generatedId,
      }));

      const postRequests = updatedCart.map((item) =>
        axios.post(
          "https://jabed.pythonanywhere.com/supplier/supplier-order-product/create/",
          item
        )
      );

      await Promise.all(postRequests);
      toast.success("Invoice Created");
      setIsSubmitting(false);
      navigate("/supplierallinvoice")
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  //    remove from invoice
  const handleRevome = (item) => {
    dispatch(removeFromInvoiceSup(item));
    console.log(item);
    toast.error("Remove");
  };

  return (
    <section onSubmit={handleSubmit(onSubmit)} className="px-6 pb-5">
      <HTitle> Supplier - Invoice</HTitle>

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
              dateFormat="dd-MM-yyyy"
            />
          </p>
        </div>

        <div className="mt-[10px] font-poppins h-[133px] rounded-[14px] bg-[#F5F7F6] p-3">
          <p className="text-[12px] font-[700] text-[#000] border-b pb-1 flex gap-2 items-center">
            Invoice To:
            <select
              id="supplierDropdown"
              onChange={handleSupplierChange}
              value={selectedSupplier}
            >
              <option value="">All Suppliers</option>
              {allSuppliers?.results?.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.supplier_name}
                </option>
              ))}
            </select>
          </p>

          <div className="mt-3 text-[10px] text-[#000] flex items-center gap-2">
            <p className="font-[600]">Name: </p>
            <span>{singleSupplier?.supplier_name}</span>
          </div>

          <p className="py-1 text-[10px] text-[#000] flex gap-2">
            <span className="font-[600]">Phone : </span>
            <span> {singleSupplier?.contact_person_phone} </span>
          </p>

          <p className="text-[10px] text-[#000] flex gap-2">
            <span className="font-[600]">Address :</span>
            <span> {singleSupplier?.supplier_address} </span>
          </p>
        </div>
      </section>

      <div className="mt-2 flex justify-end">
        <ToggleSupplier isChecked={isChecked} setIsChecked={setIsChecked} />
      </div>

      <div className="mt-[35px] flex justify-end">
        <Link to="/addproductinvoice">
          <button className="text-[12px] text-[#0500FF] font-poppins font-[500]">
            Add Product
          </button>
        </Link>
      </div>

      {addedProducts?.length > 0 && (
        <div className=" h-[100%] rounded-[14px] shadow-md mx-[-24px]">
          <div className="overflow-x-auto">
            <table className="table font-poppins text-[#000]">
              <thead>
                <tr className="text-[10px]">
                  <th>SL</th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th className="p-0">Total</th>
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
                    <td className="p-0">
                      {Number(item?.product_price) * Number(item?.quantity)}
                    </td>

                    <td>
                      <button onClick={() => handleRevome(item)}>
                        <FaRegTrashAlt className="text-[17px] text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}

                <tr className="border-t">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="text-[8px] p-0 font-semibold">Total:</td>
                  <td className="text-[8px] p-0 font-semibold"> {total} </td>
                  <td className="pb-4"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {
        addedProducts?.length > 0 &&

        <div className="mt-6 flex  justify-center gap-4">
        <CButton>Print Invoice</CButton>

        <button onClick={onSubmit} disabled={isSubmitting}>
          <CButton> {isSubmitting ? "Saving..." : "Save"}</CButton>
        </button>
      </div>}
    </section>
  );
};

export default Invoice;
