import HTitle from "../../../utils/HTitle";
import CButton from "../../../utils/CButton";
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../../redux/feature/products/productApi";
import {
  useDeleteBuyerInvoiceProductMutation,
  useGetAllOrderedProductsQuery,
  useGetBuyersQuery,
  useGetSingleOrderQuery,
} from "../../../redux/feature/buyers/buyerApi";
import { FaArrowLeftLong } from "react-icons/fa6";
import Loading from "../../../utils/Loading";
import ReactToPrint from "react-to-print";
import { useRef, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import EditQuantity from "./EditQuantity";
import toast from "react-hot-toast";
import FormateDate from "../../../utils/FormateDate";

const DetailsBuyerInvoice = () => {
  const { id } = useParams();

  const { data: orderDetails } = useGetSingleOrderQuery(id);
  console.log(orderDetails);

  const { data: allBuyers } = useGetBuyersQuery();

  const [deleteBuyerInvoiceProduct] = useDeleteBuyerInvoiceProductMutation();

  const mappedBuyer = allBuyers?.results?.map((item) => {
    return item;
  });

  const buyer = mappedBuyer?.find(
    (buyer) => buyer?.id === orderDetails?.customer
  );

  const { data: orderedProducts, isLoading } = useGetAllOrderedProductsQuery(
    orderDetails?.id
  );
  console.log(orderedProducts);

  const { data: allProducts } = useGetProductsQuery();
  const mappedProducts = allProducts?.results?.map((item) => {
    return item;
  });

  const findProductById = (productId) => {
    return mappedProducts?.find((product) => product?.id === productId);
  };

  function calculateTotalPrice() {
    let totalPrice = 0;
    for (const product of orderedProducts || []) {
      totalPrice += product.quantity * product.product_price;
    }
    return totalPrice;
  }
  const totalPrice = calculateTotalPrice(orderedProducts);

  // PDF
  const componentRef = useRef();

  // Delete Product
  const handleDeleteInvoiceProduct = (id) => {
    deleteBuyerInvoiceProduct(id);
    toast.error("Deleted");
  };

  // Edit Product Quantity
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <section className="px-6 pb-5">
      <HTitle>Buyer-Invoice-Details</HTitle>

      <section className="myInvoice" ref={componentRef}>

        <section className="mt-[35px] h-[180px] rounded-[14px] shadow-md p-3 ">
          <div className="flex justify-between items-center">
            <p className="text-[10px] text-[#000] font-poppins">
              <span className="font-[600]">Invoice#</span>
              <span>{orderDetails?.order_number}</span>
            </p>

            <p className="text-[10px] text-[#000] font-poppins flex gap-2">
              <span className="font-[600]">Date:</span>
              {FormateDate(orderDetails?.invoice_date)}
            </p>
          </div>

          <div className="mt-[10px] font-poppins h-[133px] rounded-[14px] bg-[#F5F7F6] p-3">
            <p className="text-[12px] font-[700] text-[#000] border-b pb-1 flex items-center">
              Invoice To:
            </p>

            <div className="mt-3 text-[10px] text-[#000] flex items-center gap-2">
              <p className="font-[600]">Name: </p>
              <span>{buyer?.customer_shop_name}</span>
            </div>

            <p className="py-1 text-[10px] text-[#000] flex gap-2">
              <span className="font-[600]">Phone : </span>
              <span>{buyer?.contact_person_phone}</span>
            </p>

            <p className="text-[10px] text-[#000] flex gap-2">
              <span className="font-[600]">Address :</span>
              <span>{buyer?.customer_shop_address}</span>
            </p>
          </div>
        </section>
        
        {isLoading ? (
          <Loading />
        ) : (
          <div className=" h-[100%] rounded-[14px] shadow-md mx-[-24px] mt-6 pb-4">
            <div className="overflow-x-auto">
              <table className="table font-poppins text-[#000] text-center">
                <thead>
                  <tr className="text-[10px]">
                    <th>SL</th>
                    <th>Item</th>
                    <th>Price(tk)</th>
                    <th>Quantity</th>
                    <th>Total(tk)</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody className="bg-[#F5F7F6]">
                  {orderedProducts?.map((item, i) => {
                    const product = findProductById(item.product);
                    return (
                      <tr key={i} className="text-[9px] font-[300]">
                        <th className="text-[10px] font-[500]"> {i + 1} </th>
                        <td>{product.product_name}</td>
                        <td>{item?.product_price}</td>
                        <td>{item?.quantity}</td>
                        <td>
                          {" "}
                          {Number(item.product_price) *
                            Number(item?.quantity)}{" "}
                        </td>
                        <td className="flex justify-center items-center gap-x-2 px-0 text-[18px]">
                          <button
                            onClick={openModal}
                            className=" text-green-600"
                          >
                            <FiEdit />
                          </button>
                          <EditQuantity
                            openModal={openModal}
                            isOpen={isOpen}
                            closeModal={closeModal}
                            item={item}
                          />

                          <button
                            onClick={() => handleDeleteInvoiceProduct(item.id)}
                            className=" text-red-600"
                          >
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                  <tr className="text-[12px] bg-slate-100">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Total Amount</td>
                    <td> {totalPrice} tk</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      <div className="mt-6 flex flex-col items-center justify-center gap-4">
        <CButton>
          <ReactToPrint
            trigger={() => <button>Print</button>}
            content={() => componentRef.current}
          />
        </CButton>

        <Link to="/buyerallinvoice">
          <button className="text-primary flex items-center gap-2">
            <FaArrowLeftLong /> Back All Invoice
          </button>
        </Link>
      </div>
    </section>
  );
};

export default DetailsBuyerInvoice;
