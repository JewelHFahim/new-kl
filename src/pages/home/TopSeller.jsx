/* eslint-disable react/prop-types */

import {
  useGetAllInvoiceSupplierQuery,
  useGetSuppliersQuery,
} from "../../redux/feature/supplier/supplierApi";

const TopSeller = ({ user }) => {
  const { data: allOrders } = useGetAllInvoiceSupplierQuery();
  const { data: suppliers } = useGetSuppliersQuery();

  if (!allOrders || !suppliers) {
    return null;
  }

  const orderDataBySupplier = allOrders?.results?.reduce((acc, order) => {
    const { supplier, order_total } = order;
    if (!acc[supplier]) {
      acc[supplier] = {
        orderCount: 1,
        orderTotal: order_total, // Initialize with the order_total
        supplierInfo: null,
      };
    } else {
      acc[supplier].orderCount += 1;
      acc[supplier].orderTotal += order_total; // Add the order_total to the total for the supplier
    }
    return acc;
  }, {});

  Object.keys(orderDataBySupplier).forEach((supplierId) => {
    const matchingSupplier = suppliers?.results?.find(
      (s) => s.id === parseInt(supplierId, 10)
    );
    if (matchingSupplier) {
      orderDataBySupplier[supplierId].supplierInfo = matchingSupplier;
    }
  });

  const supplierOrderCountArray = Object.keys(orderDataBySupplier).map(
    (supplierId) => {
      const { supplierInfo, orderCount, orderTotal } =
        orderDataBySupplier[supplierId];
      const supplierName = supplierInfo
        ? supplierInfo.supplier_name
        : "Unknown Supplier";
      return { supplierName, orderCount, orderTotal };
    }
  );

  // console.log(supplierOrderCountArray);

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
                <th>Seller</th>
                <th>Order Count</th>
                <th>Order Total</th>
              </tr>
            </thead>

            {supplierOrderCountArray?.map((data, i) => (
              <tbody key={i}>
                <tr>
                  <td className="flex items-center gap-2">
                    <img
                      src={user}
                      alt=""
                      className="w-12 h-12 rounded-[8px]"
                    />
                    <p className="text-[12px] font-[500] font-worksans text-textColorBlack">
                      {data?.supplierName}
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

export default TopSeller;
