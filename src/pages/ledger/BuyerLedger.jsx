import HTitle from "../../utils/HTitle";
import { BiSearchAlt } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import DropdownMonth from "../../utils/dropdown/DropdownMonth";
import {
  useFilterBuyerByDateQuery,
  useFilterBuyerByIdQuery,
  useGetAllBuyerBalanceQuery,
  useGetBuyerOrdereListQuery,
  useGetBuyersQuery,
} from "../../redux/feature/buyers/buyerApi";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { pagination_btn_style } from "../../utils/someClasses";

const BuyerLedger = () => {
  const { register, handleSubmit } = useForm();
  const [buyerId, setBuyerId] = useState();
  const [startDate, setStartDate] = useState(new Date("2023/01/10"));
  const formattedStartDate = startDate.toISOString().slice(0, 10);
  const [endDate, setEndDate] = useState(new Date("2023/01/10"));
  const formattedEndDate = endDate.toISOString().slice(0, 10);

  const { data: buyers } = useGetBuyersQuery();
  const { data: filterBuyer } = useFilterBuyerByIdQuery(buyerId);
  const { data: filteredByDate } = useFilterBuyerByDateQuery({
    startDate: formattedStartDate,
    endDate: formattedEndDate,
  });

  const { data: buyerBalanceList } = useGetAllBuyerBalanceQuery();

  const getBuyerName = (buyerId) => {
    const buyer = buyers?.results?.find((s) => s.id === buyerId);
    return buyer ? buyer.customer_shop_name : "Unknown Buyer";
  };

  const getBalance = (buyerId) => {
    const buyer = buyerBalanceList?.results?.find(
      (s) => s.customer === buyerId
    );
    return buyer ? buyer : "Unknown Buyer";
  };

  const onSubmit = (data) => {
    console.log(data.buyerId);
    setBuyerId(data.buyerId);
  };

  // pagination start
  const PAGE_SIZE = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useGetBuyerOrdereListQuery(currentPage);
  //end

  // filter table data display
  const renderProductItems = (items) => {
    return items?.map((item, i) => (
      <tr key={i} className="divide-x">
        <td className={tableStyle}> {item.invoice_date?.slice(0, 10)} </td>
        <td className={tableStyle}> {item.order_number} </td>
        <td className="px-2 py-4 min-w-[200px] max-w-[300px] opacity-60">
          {item.order_note !== "" ? item.order_note : "order notes..."}
        </td>
        <td className={tableStyle}> {getBuyerName(item.customer)}</td>

        <td className={tableStyle}>
          {getBalance(item.customer).debit_balance}
        </td>
        <td className={tableStyle}>
          {getBalance(item.customer).credit_balance}
        </td>
        <td className={tableStyle}>
          {getBalance(item.customer).total_balance}
        </td>
      </tr>
    ));
  };

  const tableStyle = "px-6 py-4 whitespace-nowrap";

  // Sorting By Order Number
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedData, setSortedData] = useState([]);

  // Sorting By Order Number
  const sortByOrderNumber = () => {
    if (sortOrder === "asc") {
      const sorted = [...data?.results].sort((a, b) =>
        a.order_number.localeCompare(b.order_number)
      );
      setSortedData(sorted);
      setSortOrder("desc");
    } else {
      const sorted = [...data?.results].sort((a, b) =>
        b.order_number.localeCompare(a.order_number)
      );
      setSortedData(sorted);
      setSortOrder("asc");
    }
  };

  const handleSort = () => {
    sortByOrderNumber();
  };

  // Sorting By Name
  const [sortName, setSortName] = useState("asc");
  const [sortedName, setSortedName] = useState([]);

  const sortByName = (dataToSort) => {
    if (sortName === "asc") {
      const sorted = [...dataToSort].sort((a, b) =>
        getBuyerName(a.customer).localeCompare(getBuyerName(b.customer))
      );
      setSortedName(sorted);
      setSortName("desc");
    } else {
      const sorted = [...dataToSort].sort((a, b) =>
        getBuyerName(b.customer).localeCompare(getBuyerName(a.customer))
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
          getBalance(a.customer).credit_balance -
          getBalance(b.customer).credit_balance
      );
      setSortedCreditBalance(sorted);
      setSortCreditBalance("desc");
    } else {
      const sorted = [...dataToSort].sort(
        (a, b) =>
          getBalance(b.customer).credit_balance -
          getBalance(a.customer).credit_balance
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
          getBalance(a.customer).debit_balance -
          getBalance(b.customer).debit_balance
      );
      setSortedDebitBalance(sorted);
      setSortDebitBalance("desc");
    } else {
      const sorted = [...dataToSort].sort(
        (a, b) =>
          getBalance(b.customer).debit_balance -
          getBalance(a.customer).debit_balance
      );
      setSortedDebitBalance(sorted);
      setSortDebitBalance("asc");
    }
  };

  const handleSortByDebitBalance = () => {
    sortByDebitBalance(data?.results);
  };

  // Sorting By Debit Balance
  const [sortBalance, setSortBalance] = useState("asc");
  const [sortedBalance, setSortedBalance] = useState([]);

  const sortByBalance = (dataToSort) => {
    if (sortBalance === "asc") {
      const sorted = [...dataToSort].sort(
        (a, b) =>
          getBalance(a.customer).total_balance -
          getBalance(b.customer).total_balance
      );
      setSortedBalance(sorted);
      setSortBalance("desc");
    } else {
      const sorted = [...dataToSort].sort(
        (a, b) =>
          getBalance(b.customer).total_balance -
          getBalance(a.customer).total_balance
      );
      setSortedBalance(sorted);
      setSortBalance("asc");
    }
  };

  const handleSortByBalance = () => {
    sortByBalance(data?.results);
  };

  // end


  const theadsDatas = [
    {
      title: "Date",
      function: "",
      condition: "",
    },
    {
      title: "Invoice No.",
      function: handleSort,
      condition: sortOrder,
    },
    {
      title: "Details",
      function: "",
      condition: "",
    },
    {
      title: "Name",
      function: handleSortByName,
      condition: sortedName,
    },

    {
      title: "Debit(tk)",
      function: handleSortByDebitBalance,
      condition: sortedDebitBalance,
    },

    {
      title: "Credit(tk)",
      function: handleSortByCreditBalance,
      condition: sortedCreditBalance,
    },

    {
      title: "Balance(tk)",
      function: handleSortByBalance,
      condition: sortedBalance,
    },
  ];

  return (
    <div className="px-[24px] relative h-screen">
      <div className="mt-4">
        <HTitle>Ledger - Buyer</HTitle>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[110px] h-[20px] bg-[#BEBDEB] rounded-[12px] px-2 flex items-center gap-2"
        >
          <BiSearchAlt className="text-[12px]" />
          <input
            type="text"
            {...register("buyerId")}
            placeholder="Insert Code/ID"
            className="w-full h-full text-black font-semibold bg-transparent focus:outline-none text-[10px] px-"
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
              {
              theadsDatas.map((item, i) => (
                <th key={i} className="py-3 px-6" onClick={item.function} >
                  <p className="flex items-center"> {item.title}
                  <span> { item.condition !== ""  &&
                   <>{item.condition === "asc" ? ( <IoIosArrowUp /> ) : ( <IoIosArrowDown />)}</>
                  }
                    </span>
                  </p>
                </th>
              ))}
            </tr>
            </thead>

          <tbody className="divide-y font-[500]">
            {(filterBuyer?.length > 0 && renderProductItems(filterBuyer)) ||
              (filteredByDate?.length > 0 && renderProductItems(filteredByDate)) ||
              (sortedData.length > 0 && renderProductItems(sortedData)) ||
              (sortedName.length > 0 && renderProductItems(sortedName)) ||
              (sortedCreditBalance.length > 0 && renderProductItems(sortedCreditBalance)) ||
              (sortedDebitBalance.length > 0 && renderProductItems(sortedDebitBalance)) ||
              (sortedBalance.length > 0 && renderProductItems(sortedBalance)) ||
              renderProductItems(data?.results)}
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

export default BuyerLedger;
