import HTitle from "../../../utils/HTitle";
import CButton from "../../../utils/CButton";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../../redux/feature/products/productApi";
import {  useGetAllOrderedProductsQuery, useGetBuyersQuery, useGetSingleOrderQuery } from "../../../redux/feature/buyers/buyerApi";

const DetailsBuyerInvoice = () => {

  const { id } = useParams();
  const { data: orderDetails } = useGetSingleOrderQuery(id);
  const { data: allBuyers} = useGetBuyersQuery();
  const mappedBuyer = allBuyers?.results?.map((item) => { return item });
  const buyer = mappedBuyer?.find((buyer) => buyer?.id === orderDetails?.customer);



  
  const { data: orderedProducts } = useGetAllOrderedProductsQuery( orderDetails?.id );

  const { data: allProducts } = useGetProductsQuery();
  const mappedProducts = allProducts?.results?.map((item) => { return item });
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

  return (
    <section className="px-6 pb-5">
      <HTitle>Buyer Invoice</HTitle>

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
                {orderedProducts?.map((item, i) => {

                  const product = findProductById(item.product);
                  return (
                    <tr key={i} className="text-[9px] font-[300]">
                      <th className="text-[10px] font-[500]"> {i + 1} </th>
                      <td>{product.product_name}</td>
                      <td>{item?.product_price}</td>
                      <td>{item?.quantity}</td>
                      <td>
                        {Number(item.product_price) * Number(item?.quantity)}{" "}
                      </td>
                    </tr>
                  );
                }
                
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-3 flex justify-between items-center px-6">
            <div className="w-[50%]"></div>

            <div className="text-[#000] text-[8px] w-[50%] px-3">
              <div className="border-b pb-2 mb-1 flex flex-col gap-y-2">
                <p className="flex justify-between">
                  Sub Total: <span>{totalPrice}</span>
                </p>
                <p className="flex justify-between">
                  Tax: <span> {totalPrice * 0.1} </span>
                </p>
                <p className="flex justify-between">
                  Delivery: <span>100</span>
                </p>
              </div>

              <p className="font-[600] flex justify-between">
                Total: <span> {totalPrice + totalPrice * 0.1 + 100} </span>
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

export default DetailsBuyerInvoice;
