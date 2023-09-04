import { Link } from "react-router-dom";
import { useGetAllInvoiceSupplierQuery } from "../../../redux/feature/invoice/invoiceApi";

const AllInvoiceSupplier = () => {
  const { data: supplierOrders } = useGetAllInvoiceSupplierQuery();


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
          <tbody className="text-gray-600 divide-y">
            {supplierOrders?.results?.map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.order_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.supplier}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.invoice_date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
                <td>
                  <Link to={`/invoicedetails/${item.id}`}><button>View</button></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllInvoiceSupplier;
