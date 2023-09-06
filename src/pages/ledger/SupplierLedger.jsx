import HTitle from "../../utils/HTitle";
import { BiSearchAlt } from "react-icons/bi";
import DropdownMonth from "../../utils/dropdown/DropdownMonth";
import { useGetAllInvoiceSupplierQuery } from "../../redux/feature/invoice/invoiceApi";
import {
  useFilterSupplierByDateQuery,
  useFilterSupplierByIdQuery,
  useGetSuppliersQuery,
} from "../../redux/feature/supplier/supplierApi";
import { useForm } from "react-hook-form";
import { useState } from "react";

const SupplierLedger = () => {
  const { register, handleSubmit } = useForm();

  const [startDate, setStartDate] = useState(new Date());
  const formattedStartDate = startDate.toISOString().slice(0, 10);
  const [endDate, setEndDate] = useState(new Date());
  const formattedEndDate = endDate.toISOString().slice(0, 10);
  const [supplierId, setSupplierId] = useState();

  const { data: supplierOrders } = useGetAllInvoiceSupplierQuery();
  const { data: suppliers } = useGetSuppliersQuery();
  const { data: filterSuppler } = useFilterSupplierByIdQuery(supplierId);
  const { data: filteredByDate } = useFilterSupplierByDateQuery({
    startDate: formattedStartDate,
    endDate: formattedEndDate,
  });

  console.log(filteredByDate);

  const getSupplierName = (supplierId) => {
    const supplier = suppliers?.results?.find((s) => s.id === supplierId);
    return supplier ? supplier.supplier_name : "Unknown Supplier";
  };

  const onSubmit = (data) => {
    console.log(data.suplierId);
    setSupplierId(data.suplierId);
  };

  // filter and map
  const renderProductItems = (items) => {
    return items?.map((item, i) => (
      <tr key={i} className="divide-x">
        <td className={tableStyle}> {item.invoice_date} </td>
        <td className={tableStyle}> {item.order_number} </td>
        <td className="px-2 py-4 min-w-[200px] max-w-[300px] opacity-60">
          {item.order_note !== "" ? item.order_note : "order notes..."}
        </td>
        <td className={tableStyle}>{getSupplierName(item.supplier)}</td>
        <td className={tableStyle}>{item.debit} 300</td>
        <td className={tableStyle}>{item.credit} 500</td>
        <td className={tableStyle}>{item.balance} 200</td>
      </tr>
    ));
  };

  const tableStyle = "px-6 py-4 whitespace-nowrap";

  return (
    <div className="px-[24px] relative h-screen">
      <div className="mt-4">
        <HTitle>Ledger - Supplier</HTitle>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[110px] h-[20px] bg-[#BEBDEB] rounded-[12px] px-2 flex items-center gap-2"
        >
          <BiSearchAlt className="text-[12px]" />
          <input
            type="text"
            {...register("suplierId")}
            placeholder="Insert Code/ID"
            className="w-full h-full bg-transparent focus:outline-none text-[10px] px-"
          />
        </form>
        <DropdownMonth
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </div>

      <div className="mt-3 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-left bg-[#F5F7F6] text-[10px] font-poppins text-[#000]">
          <thead className="border-b bg-[#BEBDEB]">
            <tr className="divide-x">
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-3">Invoice No.</th>
              <th className="py-3 px-6">Details</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Debit</th>
              <th className="py-3 px-6">Credit</th>
              <th className="py-3 px-6">Balance</th>
            </tr>
          </thead>

          <tbody className="divide-y font-[500]">
            {filterSuppler?.length !== 0 ? renderProductItems(filterSuppler) : filteredByDate?.length !== 0 ? renderProductItems(filteredByDate) : supplierOrders && renderProductItems(supplierOrders?.results)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierLedger;
