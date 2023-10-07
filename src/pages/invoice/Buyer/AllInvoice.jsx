import { Link } from "react-router-dom";
import {
  useDeleteBuyerOrderMutation,
  useGetAllInvoiceBuyerQuery,
  useGetBuyersQuery,
} from "../../../redux/feature/buyers/buyerApi";
import Loading from "../../../utils/Loading";
import toast from "react-hot-toast";

const AllInvoiceByer = () => {
  const { data: buyerOrders, isLoading } = useGetAllInvoiceBuyerQuery();

  const { data: allBuyers } = useGetBuyersQuery();

  const [deleteBuyerOrder] = useDeleteBuyerOrderMutation();


  const mappedProducts = allBuyers?.results?.map((item) => {
    return item;
  });

  const findProductById = (buyerId) => {
    return mappedProducts?.find((buyer) => buyer?.id === buyerId);
  };


  const handleDeleteOrder = (id) => {
    deleteBuyerOrder(id);
    toast.error("Deleted");
  };



  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-6">
      <div className="max-w-lg">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Buyer All Invoice
        </h3>
      </div>

      <div className="mt-8 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Order</th>
              <th className="py-3 px-6">Buyer</th>
              <th className="py-3 px-6">Phone</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Status</th>
              <th></th>
            </tr>
          </thead>

          {isLoading ? (
            <Loading />
          ) : (
            <tbody className="text-gray-600 divide-y">
              {buyerOrders?.results?.map((item, idx) => {
                const buyer = findProductById(item.customer);
                console.log(buyer);
                return (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.order_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {buyer?.customer_shop_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.invoice_date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.status}
                    </td>
                    <td>
                    <div className="flex items-center gap-5 font-medium text-green-600">
                      <Link to={`/invoicedetails-buyer/${item.id}`}>
                        <button>View</button>
                      </Link>

                      <button
                        onClick={() => handleDeleteOrder(item.id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default AllInvoiceByer;
