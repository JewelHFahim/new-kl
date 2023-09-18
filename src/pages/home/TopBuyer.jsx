/* eslint-disable react/prop-types */

import {
  useGetAllInvoiceBuyerQuery,
  useGetBuyersQuery,
} from "../../redux/feature/buyers/buyerApi";

const TopBuyer = ({ user }) => {
  const { data: allOrders } = useGetAllInvoiceBuyerQuery();
  console.log(allOrders);
  const { data: buyers } = useGetBuyersQuery();

  if (!allOrders || !buyers) {
    return null;
  }

  const orderDataByBuyer = allOrders?.results?.reduce((acc, order) => {
    const { customer, order_total } = order;
    console.log(order_total);
    if (!acc[customer]) {
      acc[customer] = {
        orderCount: 1,
        orderTotal: order_total, // Initialize with the order_total
        buyerInfo: null,
      };
    } else {
      acc[customer].orderCount += 1;
      acc[customer].orderTotal += order_total; // Add the order_total to the total for the supplier
    }
    return acc;
  }, {});

  console.log(orderDataByBuyer);

  Object.keys(orderDataByBuyer).forEach((buyerId) => {
    const matchingBuyer = buyers?.results?.find(
      (s) => s.id === parseInt(buyerId, 10)
    );
    0;
    console.log(matchingBuyer);
    if (matchingBuyer) {
      orderDataByBuyer[buyerId].buyerInfo = matchingBuyer;
      console.log(orderDataByBuyer[buyerId].buyerInfo);
    }
  });

  const buyerOrderCountArray = Object.keys(orderDataByBuyer).map((buyerId) => {
    const { buyerInfo, orderCount, orderTotal } = orderDataByBuyer[buyerId];
    console.log(buyerInfo);
    const buyerName = buyerInfo
      ? buyerInfo.customer_shop_name
      : "Unknown Supplier";
    return { buyerName, orderCount, orderTotal };
  });

  console.log(buyerOrderCountArray);

  return (
    <>
      <div className="mt-12">
        <h1 className="text-textColorBlack font-worksans font-[600] mb-6">
          Top Seller
        </h1>

        <div className="overflow-x-auto font-worksans">
          <table className="table font-worksans">
            {/* head */}

            <thead className=" bg-[#BAD1E8] rounded-[8px]">
              <tr>
                <th>Buyer</th>
                <th>Order Count</th>
                <th>Order Total</th>
              </tr>
            </thead>

            {buyerOrderCountArray?.map((data, i) => (
              <tbody key={i}>
                <tr>
                  <td className="flex items-center gap-2">
                    <img
                      src={user}
                      alt=""
                      className="w-12 h-12 rounded-[8px]"
                    />
                    <p className="text-[12px] font-[500] font-worksans text-textColorBlack">
                      {data?.buyerName}
                    </p>
                  </td>

                  <td>
                    <p>{data.orderCount}</p>
                  </td>

                  <td>
                    <p className="bg-[#EEF2FA] w-[53px] h-[24px] text-[#5348D1] text-[12px] font-[500] rounded-[8px] flex justify-center items-center">
                      ৳ {data.orderTotal}
                    </p>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default TopBuyer;
