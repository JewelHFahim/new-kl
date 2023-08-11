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

const Home = () => {
  const datas = [
    {
      icon: <PiCurrencyCircleDollarBold />,
      title: "Total Debit",
      amount: "168,2",
      graph: <MdShowChart />,
    },
    {
      icon: <PiCurrencyCircleDollarBold />,
      title: "Avarage Credit",
      amount: "192",
      graph: <MdShowChart />,
    },
    {
      icon: <HiUserGroup />,
      title: "Total Buyer",
      amount: "5,622",
      graph: <MdShowChart />,
    },
    {
      icon: <HiUserGroup />,
      title: "Total Supplier",
      amount: "5723",
      graph: <MdShowChart />,
    },
    {
      icon: <AiOutlineStar />,
      title: "Total Items",
      amount: "7219",
      graph: <MdShowChart />,
    },
  ];

  const sellerData = [
    {
      img: "",
      sale: "10",
      transaction: "150",
    },
    {
      img: "",
      sale: "12",
      transaction: "186",
    },
    {
      img: "",
      sale: "16",
      transaction: "285",
    },
  ];

  return (
    <div className="px-6">
      <div className="flex flex-col items-center">
        <HTitle>Dashboard</HTitle>

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
      <div className="mt-12">
        <h1 className="text-textColorBlack font-worksans font-[600] mb-6">
          Top Buyer
        </h1>

        <div className="overflow-x-auto font-worksans ">
          <table className="table font-worksans">
            {/* head */}

            <thead className=" bg-[#BAD1E8] rounded-[8px]">
              <tr>
                <th>Buyer</th>
                <th>Sale</th>
                <th>Transaction</th>
              </tr>
            </thead>

            {sellerData.map((data, i) => (
              <tbody key={i}>
                <tr>
                  <td className="flex items-center gap-2">
                    <img
                      src={user}
                      alt=""
                      className="w-12 h-12 rounded-[8px]"
                    />
                    <p className="text-[12px] font-[500] font-worksans text-textColorBlack">
                      Hart Hagerty
                    </p>
                  </td>

                  <td>
                    <p className="text-[12px]">{data.sale}</p>
                  </td>

                  <td>
                    <p className="bg-[#EEF2FA] w-[53px] h-[24px] text-[#5348D1] text-[12px] font-[500] rounded-[8px] flex justify-center items-center">
                      ${data.transaction}
                    </p>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>

      {/* Top Seller */}
      <div className="mt-12">
        <h1 className="text-textColorBlack font-worksans font-[600] mb-6">
          Top Seller
        </h1>

        <div className="overflow-x-auto font-worksans ">
          <table className="table font-worksans">
            {/* head */}

            <thead className=" bg-[#BAD1E8] rounded-[8px]">
              <tr>
                <th>Buyer</th>
                <th>Sale</th>
                <th>Transaction</th>
              </tr>
            </thead>

            {sellerData.map((data, i) => (
              <tbody key={i}>
                <tr>
                  <td className="flex items-center gap-2">
                    <img
                      src={user}
                      alt=""
                      className="w-12 h-12 rounded-[8px]"
                    />
                    <p className="text-[12px] font-[500] font-worksans text-textColorBlack">
                      Hart Hagerty
                    </p>
                  </td>

                  <td>
                    <p>{data.sale}</p>
                  </td>

                  <td>
                    <p className="bg-[#EEF2FA] w-[53px] h-[24px] text-[#5348D1] text-[12px] font-[500] rounded-[8px] flex justify-center items-center">
                      ${data.transaction}
                    </p>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>

      {/* Hot Product */}
      <div className="mt-[38px]">
        <h1 className=" text-[16px] font-[600] font-worksans text-textColorBlack">
          Hot Product
        </h1>

        <div className="mt-[28px] shadow-md rounded-md">
          <HotProductChart />
        </div>
      </div>

      {/* Revenue */}
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
