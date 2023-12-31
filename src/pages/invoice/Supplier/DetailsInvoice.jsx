import HTitle from "../../../utils/HTitle";
import CButton from "../../../utils/CButton";
import {
  useDeleteInvoiceProductMutation,
  useGetSupplierOrderedProductsQuery,
  useGetSuppliersOrdersDetailsQuery,
  useGetSuppliersQuery,
} from "../../../redux/feature/supplier/supplierApi";
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../../redux/feature/products/productApi";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Loading from "../../../utils/Loading";
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import toast from "react-hot-toast";
import { useState } from "react";
import EditQuantity from "./EditQuantity";
import FormateDate from "../../../utils/FormateDate";

const DetailsInvoice = () => {
  const { id } = useParams();

  const { data: orderedProducts, isLoading } =
    useGetSupplierOrderedProductsQuery(id);
    console.log(orderedProducts)

  const { data: orderDetails } = useGetSuppliersOrdersDetailsQuery(id);

  const { data: allsuppliers } = useGetSuppliersQuery();

  const [deleteInvoiceProduct] = useDeleteInvoiceProductMutation();

  const mappedSuppliers = allsuppliers?.results?.map((item) => {
    return item;
  });

  const supplier = mappedSuppliers?.find(
    (supplier) => supplier?.id === orderDetails?.supplier
  );

  const { data: allProducts } = useGetProductsQuery();
  const mappedProducts = allProducts?.results?.map((item) => {
    return item;
  });
  const findProductById = (productId) => {
    return mappedProducts?.find((product) => product?.id === productId);
  };

  function calculateTotalPrice() {
    let totalPrice = 0;
    for (const product of orderedProducts?.results || []) {
      totalPrice += product.quantity * product.product_price;
    }
    return totalPrice;
  }
  const totalPrice = calculateTotalPrice(orderedProducts);
  

  // PDF
  const componentRef = useRef();


  // Delete Product
  const handleDeleteInvoiceProduct = (id) => {
    deleteInvoiceProduct(id);
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
      <HTitle>Invoice</HTitle>

      <section ref={componentRef}>
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
              <span>{supplier?.supplier_name}</span>
            </div>

            <p className="py-1 text-[10px] text-[#000] flex gap-2">
              <span className="font-[600]">Phone : </span>
              <span>{orderDetails?.phone}</span>
            </p>

            <p className="text-[10px] text-[#000] flex gap-2">
              <span className="font-[600]">Address :</span>
              <span>{supplier?.supplier_address}</span>
            </p>
          </div>
        </section>

        {isLoading ? (
          <Loading />
        ) : (
          <div className=" h-[100%] rounded-[14px] shadow-md mx-[-24px] mt-6">
            <div className="overflow-x-auto">
              <table className="table font-poppins text-[#000] text-center">
                <thead>
                  <tr className="text-[10px]">
                    <th>SL</th>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="bg-[#F5F7F6]">
                  {orderedProducts?.results?.map((item, i) => {
                    const product = findProductById(item.product);
                    return (
                      <tr key={i} className="text-[9px] font-[300] text-center">
                        <th className="text-[10px] font-[500]"> {i + 1} </th>
                        <td> {product?.product_name} </td>
                        <td>{item?.product_price}</td>
                        <td>{item?.quantity}</td>
                        <td> {Number(item.product_price) * Number(item?.quantity)} </td>
                        <td className="flex justify-center items-center gap-x-2 px-0 text-[18px]">

                          <button onClick={openModal} className=" text-green-600">
                            <FiEdit />
                          </button>

                          <EditQuantity
                            openModal={openModal}
                            isOpen={isOpen}
                            closeModal={closeModal}
                            item={item}
                          />

                        
                            <button onClick={() => handleDeleteInvoiceProduct(item.id)}
                              className=" text-red-600"
                            >
                              <FiTrash2 />
                            </button>
                          

                        </td>
                      </tr>
                    );
                  })}

                  <tr className="bg-slate-100 text-[10px] font-medium">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Total Amount</td>
                    <td>{totalPrice}</td>
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
        <Link to="/supplierallinvoice">
          <button className="text-primary flex items-center gap-2">
            <FaArrowLeftLong /> Back All Invoice
          </button>
        </Link>
      </div>
    </section>
  );
};

export default DetailsInvoice;
