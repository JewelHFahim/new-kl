import HTitle from "../../utils/HTitle";
import { BiSearchAlt } from "react-icons/bi";
import Dropdown from "../../utils/dropdown/Dropdown";
import DropdownMonth from "../../utils/dropdown/DropdownMonth";
import WarehouseChart from "../../components/charts/WarehouseChart";
import { FiEdit } from "react-icons/fi";
import ProductsTable from "./ProductsTable";
import {
  useGetProductsQuery,
} from "../../redux/feature/products/productApi";

const WareHouse = () => {
  const { data: products } = useGetProductsQuery();



  const tableItems = [
    {
      date: "01/07/2023",
      invoice: " #30542",
      details:
        "Lorem Ipsum is simply dummy text of the printing and typesetting ind",
      id: "DSD058",
      debit: "12,000",
      credit: "0,000",
      balance: "12, 000",
    },
    {
      date: "01/07/2023",
      invoice: " #30542",
      details:
        "Lorem Ipsum is simply dummy text of the printing and typesetting ind",
      id: "DSD058",
      debit: "12,000",
      credit: "0,000",
      balance: "12, 000",
    },
    {
      date: "01/07/2023",
      invoice: " #30542",
      details:
        "Lorem Ipsum is simply dummy text of the printing and typesetting ind",
      id: "DSD058",
      debit: "12,000",
      credit: "0,000",
      balance: "12, 000",
    },
    {
      date: "01/07/2023",
      invoice: " #30542",
      details:
        "Lorem Ipsum is simply dummy text of the printing and typesetting ind",
      id: "DSD058",
      debit: "12,000",
      credit: "0,000",
      balance: "12, 000",
    },
    {
      date: "01/07/2023",
      invoice: " #30542",
      details:
        "Lorem Ipsum is simply dummy text of the printing and typesetting ind",
      id: "DSD058",
      debit: "12,000",
      credit: "0,000",
      balance: "12, 000",
    },
  ];

  const tableStyle = "px-6 py-4 whitespace-nowrap";

 

  return (
    <div className="p-[24px] relative">
      <div className="mt-4">
        <HTitle>WareHouse</HTitle>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="w-[150px] h-[20px] bg-[#BEBDEB] rounded-[12px] px-2 flex items-center gap-2">
          <BiSearchAlt className="text-[12px]" />
          <input
            type="text"
            placeholder="Insert Code/ID"
            className="w-full h-full bg-transparent focus:outline-none text-[10px] px-"
          />
        </div>
        <Dropdown />
        <DropdownMonth />
      </div>

      <div className="mt-3 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-left bg-[#F5F7F6] text-[10px] font-poppins text-[#000]">
          <thead className="border-b ">
            <tr className="divide-x">
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-3">Invoice No.</th>
              <th className="py-3 px-6">Details</th>
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">Debit</th>
              <th className="py-3 px-6">Credit</th>
              <th className="py-3 px-6">Balance</th>
            </tr>
          </thead>

          <tbody className="divide-y font-[500]">
            {tableItems.map((item, idx) => (
              <tr key={idx} className="divide-x">
                <td className={tableStyle}> {item.date}</td>
                <td className={tableStyle}>{item.invoice}</td>
                <td className="px-2 py-4 min-w-[200px] max-w-[300px] font-[300]">
                  {item.details}
                </td>
                <td className={tableStyle}>{item.id}</td>
                <td className={tableStyle}>{item.debit}</td>
                <td className={tableStyle}>{item.credit}</td>
                <td className={tableStyle}>{item.balance}</td>
                <td>
                  <FiEdit className="text-lg " />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-7 rounded-[8px] shadow-md">
        <WarehouseChart />
      </div>

      <ProductsTable />
    </div>
  );
};

export default WareHouse;
