import HTitle from "../../utils/HTitle";
import { BiSearchAlt } from "react-icons/bi";
import DropdownMonth from "../../utils/dropdown/DropdownMonth";
import {
  useFilterSupplierByDateQuery,
  useFilterSupplierByIdQuery,
  useGetSupplierBalanceListQuery,
  useGetSupplierOrdereListQuery,
  useGetSuppliersQuery,
} from "../../redux/feature/supplier/supplierApi";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { pagination_btn_style } from "../../utils/someClasses";

const SupplierLedger = () => {
  const { register, handleSubmit } = useForm();

  const [startDate, setStartDate] = useState(new Date());
  const formattedStartDate = startDate.toISOString().slice(0, 10);
  console.log(formattedStartDate);
  const [endDate, setEndDate] = useState(new Date());
  const formattedEndDate = endDate.toISOString().slice(0, 10);
  const [supplierId, setSupplierId] = useState();

  const { data: suppliers } = useGetSuppliersQuery();
  const { data: filterSuppler } = useFilterSupplierByIdQuery(supplierId);
  const { data: filteredByDate } = useFilterSupplierByDateQuery({
    startDate: formattedStartDate,
    endDate: formattedEndDate,
  });
  console.log(filteredByDate);
  const { data: supplierBalanceList } = useGetSupplierBalanceListQuery();

  // pagination start
  const PAGE_SIZE = 15;
  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage);
  const { data } = useGetSupplierOrdereListQuery(currentPage);
  console.log(data);
  //end

  const getSupplierName = (supplierId) => {
    const supplier = suppliers?.results?.find((s) => s.id === supplierId);
    return supplier ? supplier.supplier_name : "Unknown Supplier";
  };

  const getSupplierBalance = (supplierId) => {
    const supplier = supplierBalanceList?.results?.find(
      (s) => s.supplier === supplierId
    );
    return supplier ? supplier : "Unknown Supplier";
  };

  const onSubmit = (data) => {
    console.log(data.suplierId);
    setSupplierId(data.suplierId);
  };

  // filter and map
  const renderProductItems = (items) => {
    return items?.map((item, i) => (
      <tr key={i} className="divide-x">
        <td className={tableStyle}> {item.invoice_date?.slice(0, 10)} </td>
        <td className={tableStyle}> {item.order_number} </td>
        <td className="px-2 py-4 min-w-[200px] max-w-[300px] opacity-60">
          {item.order_note !== "" ? item.order_note : "order notes..."}
        </td>
        <td className={tableStyle}>{getSupplierName(item.supplier)}</td>
        <td className={tableStyle}>
          {getSupplierBalance(item.supplier).debit_balance}{" "}
        </td>
        <td className={tableStyle}>
          {getSupplierBalance(item.supplier).credit_balance}{" "}
        </td>
        <td className={tableStyle}>
          {getSupplierBalance(item.supplier).total_balance}
        </td>
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
              <th className="py-3 px-6">Debit(tk)</th>
              <th className="py-3 px-6">Credit(tk)</th>
              <th className="py-3 px-6">Balance(tk)</th>
            </tr>
          </thead>

          <tbody className="divide-y font-[500]">
            {filterSuppler?.length !== 0
              ? renderProductItems(filterSuppler)
              : filteredByDate?.results?.length !== 0
              ? renderProductItems(filteredByDate)
              : data && renderProductItems(data?.results)}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div>
        {data?.count > 0 && (
          <div className="flex justify-center items-center gap-4 py-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={!data?.previous}
              className={`${
                data?.previous ? "" : "hidden"
              } ${pagination_btn_style} `}
            >
              <MdArrowBackIos />
              Previous
            </button>

            <span>
              Page {currentPage} of {Math.ceil(data?.count / PAGE_SIZE)}
            </span>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={!data?.next}
              className={` ${
                data?.next ? "" : "hidden"
              } ${pagination_btn_style}`}
            >
              Next
              <MdArrowForwardIos />
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default SupplierLedger;
