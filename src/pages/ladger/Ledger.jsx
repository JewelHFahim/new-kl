import HTitle from "../../utils/HTitle";
import { BiSearchAlt } from "react-icons/bi";
import Dropdown from "../../utils/dropdown/Dropdown";
import DropdownMonth from "../../utils/dropdown/DropdownMonth";
import { useGetAllInvoiceSupplierQuery } from "../../redux/feature/invoice/invoiceApi";
import { useGetSuppliersQuery } from "../../redux/feature/supplier/supplierApi";

const Ledger = () => {

  const {data: orders } = useGetAllInvoiceSupplierQuery();
  const {data: suppliers } = useGetSuppliersQuery();


   const getSupplierName = (supplierId) => {
    const supplier = suppliers?.results?.find((s) => s.id === supplierId);
    return supplier ? supplier.supplier_name : 'Unknown Supplier';
  };

  const tableStyle = "px-6 py-4 whitespace-nowrap";

  const bottomTableDatas = [
    {
      title: "Total Debit",
      balance: 12000
    },
    {
      title: "Total Credit",
      balance: 50000
    },
    {
      title: "Balance",
      balance: 30000
    },
  ]

  return (
    <div className="px-[24px] relative h-screen">

      <div className="mt-4">
        <HTitle>Ledger</HTitle>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="w-[110px] h-[20px] bg-[#BEBDEB] rounded-[12px] px-2 flex items-center gap-2">
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
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Debit</th>
              <th className="py-3 px-6">Credit</th>
              <th className="py-3 px-6">Balance</th>
            </tr>
          </thead>

          <tbody className="divide-y font-[500]">
            {orders?.results?.map((item, idx) => (
              <tr key={idx} className="divide-x">
                <td className={tableStyle}> {item.invoice_date}</td>
                <td className={tableStyle}>{item.order_number}</td>
                <td className="px-2 py-4 min-w-[200px] max-w-[300px] font-[300]">
                  {item.phone}
                </td>
                <td className={tableStyle}>{getSupplierName(item.supplier)}</td>
                <td className={tableStyle}>{item.debit} 300</td>
                <td className={tableStyle}>{item.credit}500</td>
                <td className={tableStyle}>{item.balance}200</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="absolute bottom-0 h-[72px] bg-[#8792F3] flex justify-center items-center  w-screen mx-[-24px]">
        <div className="flex justify-between gap-10 divide-x-2">
          {
            bottomTableDatas.map((item, i)=>(
              <div key={i} className="px-4">
              <p className="text-white text-[12px] font-[700] font-poppins text-center"> {item.balance} <br /> <span>{item.title}</span> </p>
            </div>
            ))
          }
        </div>
      </div>

    </div>
  );
};

export default Ledger;
