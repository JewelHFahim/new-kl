import HTitle from "../../../utils/HTitle";
import CButton from "../../../utils/CButton";
import {
  useGetSuppliersOrdersDetailsQuery,
  useGetSuppliersQuery,
} from "../../../redux/feature/supplier/supplierApi";
import { useParams } from "react-router-dom";
import { useGetSupplierProductsQuery } from "../../../redux/feature/supplierProducts/supplierProductApi";
import { useGetProductsQuery } from "../../../redux/feature/products/productApi";

const DetailsInvoice = () => {
  const { id } = useParams();

  const { data: orderDetails } = useGetSuppliersOrdersDetailsQuery(id);

  const { data: allsuppliers } = useGetSuppliersQuery();

  const mappedSuppliers = allsuppliers?.results?.map((item) => {
    return item;
  });

  const supplier = mappedSuppliers?.find(
    (supplier) => supplier?.id === orderDetails?.supplier
  );

  const { data: orderedProducts } = useGetSupplierProductsQuery(
    orderDetails?.id
  );

  console.log(orderedProducts, " name");

  const { data: allProducts } = useGetProductsQuery();

  const orderedProductName = allProducts?.results?.map((product) => {
    return product;
  });

  console.log(orderedProductName);

  console.log(orderedProductName?.product_name, "hello");

  return (
    <section className="px-6 pb-5">
      <HTitle>Invoice</HTitle>

      <section className="mt-[35px] h-[180px] rounded-[14px] shadow-md p-3 ">
        <div className="flex justify-between items-center">
          <p className="text-[10px] text-[#000] font-poppins">
            <span className="font-[600]">Invoice#</span>
            <span>{orderDetails?.order_number}</span>
          </p>

          <p className="text-[10px] text-[#000] font-poppins flex gap-2">
            <span className="font-[600]">Date:</span>
            {orderDetails?.invoice_date}
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

      <div className=" h-[313px] rounded-[14px] shadow-md mx-[-24px] mt-6">
        <div className="overflow-x-auto">
          <table className="table font-poppins text-[#000]">
            <thead>
              <tr className="text-[10px]">
                <th>SL</th>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody className="bg-[#F5F7F6]">
              {orderedProducts?.map((item, i) => (
                <tr key={i} className="text-[9px] font-[300]">
                  <th className="text-[10px] font-[500]"> {i + 1} </th>

                  <td>
                    {item?.product === orderedProductName?.id &&
                      orderedProductName.product_name}
                  </td>

                  <td>{item?.product_price}</td>
                  <td>{item?.quantity}</td>
                  <td>{Number(item.product_price) * Number(item?.quantity)}</td>
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
                Sub Total: <span>12</span>
              </p>
              <p className="flex justify-between">
                Tax: <span>12</span>
              </p>
              <p className="flex justify-between">
                Delivery: <span>100</span>
              </p>
            </div>

            <p className="font-[600] flex justify-between">
              Total: <span>12</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex  justify-center gap-4">
        <CButton>Print Invoice</CButton>
      </div>
    </section>
  );
};

export default DetailsInvoice;
