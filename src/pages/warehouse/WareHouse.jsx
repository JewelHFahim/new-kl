import HTitle from "../../utils/HTitle";
import { BiSearchAlt } from "react-icons/bi";
import DropdownMonth from "../../utils/dropdown/DropdownMonth";
import WarehouseChart from "../../components/charts/WarehouseChart";
import { FiEdit } from "react-icons/fi";
import ProductsTable from "./ProductsTable";
import { useGetProductsQuery } from "../../redux/feature/products/productApi";
import { Link } from "react-router-dom";

const WareHouse = () => {

  const { data: products } = useGetProductsQuery();

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
        <DropdownMonth />
      </div>

      <div className="mt-3 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-left bg-[#F5F7F6] text-[10px] font-poppins text-[#000]">
          <thead className="border-b ">
            <tr className="divide-x">
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-3">ID</th>
              <th className="py-3 px-6">Product</th>
              <th className="py-3 px-6">IN/OUT</th>
              <th className="py-3 px-6">Quantity</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Total</th>
            </tr>
          </thead>

          <tbody className="divide-y font-[500]">
            {products?.results?.map((item, idx) => (
              <tr key={idx} className="divide-x">
                <td className={tableStyle}> 03/09/23 </td>

                <td className={tableStyle}> {item.id} </td>

                <td className="px-2 py-4 min-w-[200px] max-w-[300px] font-[300]">
                  {item.product_name}
                </td>
                <td className={tableStyle}> In </td>

                <td className={tableStyle}>{item.stock}</td>

                <td className={tableStyle}>{item.selling_price}</td>

                <td className={tableStyle}>
                  {item.stock * item.selling_price}
                </td>

                <td>
                   <Link to={`/warehouse/${item.id}`}> <FiEdit className="text-lg " /></Link>
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
