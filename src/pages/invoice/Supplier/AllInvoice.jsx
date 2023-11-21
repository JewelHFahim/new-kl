import { Link } from "react-router-dom";
import {
  useDeleteSupplierOrderMutation,
  useGetAllInvoiceSupplierQuery,
} from "../../../redux/feature/supplier/supplierApi";
import Loading from "../../../utils/Loading";
import toast from "react-hot-toast";

const AllInvoiceSupplier = () => {

  
  const { data: supplierOrders, isLoading } = useGetAllInvoiceSupplierQuery();
  const [deleteSupplierOrder] = useDeleteSupplierOrderMutation();

  const handleDeleteOrder = (id) => {
    deleteSupplierOrder(id);
    toast.error("Deleted");
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-6">
      <div className="max-w-lg">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Supplier All Invoice
        </h3>
      </div>
      <div className="mt-8 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Order</th>
              <th className="py-3 px-6">Supplier</th>
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
              {supplierOrders?.results?.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.order_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.supplier}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.invoice_date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
                  <td >
                    <div className="flex items-center gap-5 font-medium">
                      <Link to={`/invoicedetails/${item.id}`}>
                        <button className="text-green-600">View</button>
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
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default AllInvoiceSupplier;
