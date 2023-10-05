import HTitle from "../../utils/HTitle";
import { BsGraphUp } from "react-icons/bs";
import { PiCurrencyCircleDollarBold } from "react-icons/pi";
import { MdShowChart } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { AiOutlineStar } from "react-icons/ai";
import DashBoardStatisticks from "../../utils/DashBoardStatisticks";
import user from "../../assets/user.jpg";
import StatementChart from "../../components/charts/StatementChart";
import HotProductChart from "../../components/charts/HotProductChart";
import RevenueChart from "../../components/charts/RevenueChart";
import TopBuyer from "./TopBuyer";
import TopSeller from "./TopSeller";
import { useGetBuyersQuery } from "../../redux/feature/buyers/buyerApi";
import { useGetSuppliersQuery } from "../../redux/feature/supplier/supplierApi";
import { useGetProductsQuery } from "../../redux/feature/products/productApi";

const Home = () => {

  const {data: buyers } = useGetBuyersQuery();
  const {data: suppliers } = useGetSuppliersQuery();
  const {data: products } = useGetProductsQuery();


  const datas = [
    {
      icon: <PiCurrencyCircleDollarBold />,
      title: "Total Debit",
      amount: "$168,2",
      graph: <MdShowChart />,
    },
    {
      icon: <PiCurrencyCircleDollarBold />,
      title: "Avarage Credit",
      amount: "$192",
      graph: <MdShowChart />,
    },
    {
      icon: <HiUserGroup />,
      title: "Total Buyer",
      amount: buyers?.results?.length,
      graph: <MdShowChart />,
    },
    {
      icon: <HiUserGroup />,
      title: "Total Supplier",
      amount: suppliers?.results?.length,
      graph: <MdShowChart />,
    },
    {
      icon: <AiOutlineStar />,
      title: "Total Items",
      amount: products?.results?.length,
      graph: <MdShowChart />,
    },
  ];


  return (
    <div className="px-6">
      <div className="flex flex-col items-center">
        <HTitle>Dashboard </HTitle>


        <h2 className="text-20px font-[300] text-[#000] font-worksans mt-[30px] text-center">
          Good Morning, <span className="font-[600]">Jhon Kerry</span>
        </h2>

        <div className="mt-[24px] bg-primary w-[183px] h-12 flex justify-center items-center rounded-[8px]">
          <button className="text-textColorBlack flex items-center gap-[24px]">
            <BsGraphUp />
            <p className=" text-[16px] font-[600]">Ledger Sheet</p>
          </button>
        </div>
      </div>

      <div className="rounded-md shadow-md mt-[40px]">
        <StatementChart />
      </div>

      {/* Statistics */}
      <div className="mt-10 grid grid-cols-1 gap-6">
        {datas.map((data, i) => (
          <DashBoardStatisticks key={i} data={data}></DashBoardStatisticks>
        ))}
      </div>

      {/* Top Buyer */}
      <TopBuyer user={user} ></TopBuyer>

      {/* Top Seller */}
      <TopSeller user={user}></TopSeller>

      {/* Hot Product Chart*/}
      <div className="mt-[38px]">
        <h1 className=" text-[16px] font-[600] font-worksans text-textColorBlack">
          Hot Product
        </h1>

        <div className="mt-[28px] shadow-md rounded-md">
          <HotProductChart />
        </div>
      </div>

      {/* Revenue Chart*/}
      <div className="my-[38px]">
        <h1 className=" text-[16px] font-[600] font-worksans text-textColorBlack">
          Revenue
        </h1>

        <div className="mt-[28px] shadow-md rounded-md">
          <RevenueChart />
        </div>
      </div>
    </div>
  );
};

export default Home;
