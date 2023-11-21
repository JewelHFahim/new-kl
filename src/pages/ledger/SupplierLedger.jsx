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
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const SupplierLedger = () => {
  const { register, handleSubmit } = useForm();

  const [startDate, setStartDate] = useState(new Date());
  const formattedStartDate = startDate.toISOString().slice(0, 10);
  const [endDate, setEndDate] = useState(new Date());
  const formattedEndDate = endDate.toISOString().slice(0, 10);
  const [supplierId, setSupplierId] = useState();

  const { data: suppliers } = useGetSuppliersQuery();
  const { data: filterSuppler } = useFilterSupplierByIdQuery(supplierId);
  const { data: filteredByDate } = useFilterSupplierByDateQuery({
    startDate: formattedStartDate,
    endDate: formattedEndDate,
  });
  const { data: supplierBalanceList } = useGetSupplierBalanceListQuery();

  // pagination start
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useGetSupplierOrdereListQuery(currentPage);
  const PAGE_SIZE = data?.count;
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
          {getSupplierBalance(item.supplier).debit_balance}
        </td>
        <td className={tableStyle}>
          {getSupplierBalance(item.supplier).credit_balance}
        </td>
        <td className={tableStyle}>
          {getSupplierBalance(item.supplier).total_balance}
        </td>
      </tr>
    ));
  };

  const tableStyle = "px-6 py-4 whitespace-nowrap";

  // ***************SORTING TABLE*********************//
  // Sorting By Order Number
  const [sortInvoiceNo, setSortInvoiceNo] = useState("asc");
  const [sortedData, setSortedData] = useState([]);

  const sortByInvoiceNo = () => {
    if (sortInvoiceNo === "asc") {
      const sorted = [...data?.results].sort((a, b) =>
        a.order_number.localeCompare(b.order_number)
      );
      setSortedData(sorted);
      setSortInvoiceNo("desc");
    } else {
      const sorted = [...data?.results].sort((a, b) =>
        b.order_number.localeCompare(a.order_number)
      );
      setSortedData(sorted);
      setSortInvoiceNo("asc");
    }
  };

  const handleSortByInvoiceNo = () => {
    sortByInvoiceNo();
  };

  
  // Sorting By Name
  const [sortName, setSortName] = useState("asc");
  const [sortedName, setSortedName] = useState([]);

  const sortByName = (dataToSort) => {
    if (sortName === "asc") {
      const sorted = [...dataToSort].sort((a, b) =>
        getSupplierName(a.supplier).localeCompare(getSupplierName(b.supplier))
      );
      setSortedName(sorted);
      setSortName("desc");
    } else {
      const sorted = [...dataToSort].sort((a, b) =>
        getSupplierName(b.supplier).localeCompare(getSupplierName(a.supplier))
      );
      setSortedName(sorted);
      setSortName("asc");
    }
  };

  const handleSortByName = () => {
    sortByName(data?.results);
  };

 // Sorting By Credit Balance
 const [sortCreditBalance, setSortCreditBalance] = useState("asc");
 const [sortedCreditBalance, setSortedCreditBalance] = useState([]);

 const sortByCreditBalance = (dataToSort) => {
   if (sortCreditBalance === "asc") {
     const sorted = [...dataToSort].sort(
       (a, b) =>
         getSupplierBalance(a.supplier).credit_balance -
         getSupplierBalance(b.supplier).credit_balance
     );
     setSortedCreditBalance(sorted);
     setSortCreditBalance("desc");
   } else {
     const sorted = [...dataToSort].sort(
       (a, b) =>
         getSupplierBalance(b.supplier).credit_balance -
         getSupplierBalance(a.supplier).credit_balance
     );
     setSortedCreditBalance(sorted);
     setSortCreditBalance("asc");
   }
 };

 const handleSortByCreditBalance = () => {
   sortByCreditBalance(data?.results);
 };

   // Sorting By Debit Balance
   const [sortDebitBalance, setSortDebitBalance] = useState("asc");
   const [sortedDebitBalance, setSortedDebitBalance] = useState([]);
 
   const sortByDebitBalance = (dataToSort) => {
     if (sortDebitBalance === "asc") {
       const sorted = [...dataToSort].sort(
         (a, b) =>
           getSupplierBalance(a.supplier).debit_balance -
           getSupplierBalance(b.supplier).debit_balance
       );
       setSortedDebitBalance(sorted);
       setSortDebitBalance("desc");
     } else {
       const sorted = [...dataToSort].sort(
         (a, b) =>
           getSupplierBalance(b.supplier).debit_balance -
           getSupplierBalance(a.supplier).debit_balance
       );
       setSortedDebitBalance(sorted);
       setSortDebitBalance("asc");
     }
   };
 
   const handleSortByDebitBalance = () => {
     sortByDebitBalance(data?.results);
   };

   // Sorting By Total Balance
  const [sortBalance, setSortBalance] = useState("asc");
  const [sortedBalance, setSortedBalance] = useState([]);

  const sortByBalance = (dataToSort) => {
    if (sortBalance === "asc") {
      const sorted = [...dataToSort].sort(
        (a, b) =>
          getSupplierBalance(a.supplier).total_balance -
          getSupplierBalance(b.supplier).total_balance
      );
      setSortedBalance(sorted);
      setSortBalance("desc");
    } else {
      const sorted = [...dataToSort].sort(
        (a, b) =>
          getSupplierBalance(b.supplier).total_balance -
          getSupplierBalance(a.supplier).total_balance
      );
      setSortedBalance(sorted);
      setSortBalance("asc");
    }
  };

  const handleSortByBalance = () => {
    sortByBalance(data?.results);
  };

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

              <th className="py-3 px-3 " onClick={handleSortByInvoiceNo}>
                <p className="flex items-center">Invoice No. {sortedData === "asc" ? <IoIosArrowUp /> : <IoIosArrowDown />}</p>
              </th>

              <th className="py-3 px-6" >Details </th>

              <th className="py-3 px-6" onClick={handleSortByName}> 
                <p className="flex items-center"> Name {sortedName === "asc" ? <IoIosArrowUp /> : <IoIosArrowDown />}</p>
              </th>

              <th className="py-3 px-6" onClick={handleSortByDebitBalance}>
                <p className="flex items-center">  Debit(tk) {sortedDebitBalance === "asc" ? <IoIosArrowUp /> : <IoIosArrowDown />}</p>
              </th>

              <th className="py-3 px-6" onClick={handleSortByCreditBalance}>
                
                <p className="flex items-center"> Credit(tk) {sortedCreditBalance === "asc" ? <IoIosArrowUp /> : <IoIosArrowDown />}</p>
                </th>

              <th className="py-3 px-6" onClick={handleSortByBalance}>
                
                <p className="flex items-center"> Balance(tk){sortedBalance === "asc" ? <IoIosArrowUp /> : <IoIosArrowDown />}</p>
                </th>
            </tr>
          </thead>

          <tbody className="divide-y font-[500]">
            {(filterSuppler?.length > 0 && renderProductItems(filterSuppler)) ||
              (filteredByDate?.results?.length > 0 && renderProductItems(filteredByDate)) ||
              (sortedData.length > 0 && renderProductItems(sortedData)) ||
              (sortedName.length > 0 && renderProductItems(sortedName)) ||
              (sortedCreditBalance.length > 0 && renderProductItems(sortedCreditBalance)) ||
              (sortedDebitBalance.length > 0 && renderProductItems(sortedDebitBalance)) ||
              (sortedBalance.length > 0 && renderProductItems(sortedBalance)) ||
              (data?.results && renderProductItems(data?.results))}
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
