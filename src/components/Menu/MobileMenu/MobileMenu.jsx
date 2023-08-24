import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import logo from "../../../assets/Asset 2.png";
import { MdOutlineDashboard } from "react-icons/md";
import { BiUser, BiBook } from "react-icons/bi";
import { BsGraphUp } from "react-icons/bs";
import { RiCalendar2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../../../redux/feature/menuSlice";
import { addLogout } from "../../../redux/feature/userSlice";
import { AiOutlineSetting } from "react-icons/ai";
import { Link } from "react-router-dom";

const MobileMenu = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.menu.isOpen);

  const handleToggleDrawer = () => {
    dispatch(toggleDrawer());
  };

  const menus = [
    {
      title: "Dashboard",
      icon: <MdOutlineDashboard />,
      url: "/",
    },
    {
      title: "Company Profile",
      icon: <BiUser />,
      url: "/allbuyer",
    },
    {
      title: "Ledger",
      icon: <BsGraphUp />,
      url: "/ledger",
    },
    {
      title: "Add Invoice",
      icon: <BiBook />,
      url: "/invoice",
    },
    {
      title: "Warehouse",
      icon: <RiCalendar2Line />,
      url: "/warehouse",
    },
    {
      title: "My Account",
      icon: <AiOutlineSetting />,
      url: "/profile",
    },
  ];

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={handleToggleDrawer}
        direction="left"
        E
        className=""
      >
        <div>
          <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
            <a href="#">
              <img className="w-[151px] h-[87px]" src={logo} alt="" />
            </a>

            <div className="flex flex-col justify-between flex-1 mt-6">
              {/* Menus */}
              <nav>
                {menus.map((menu, i) => (
                  <Link
                    key={i}
                    to={menu.url}
                    className="flex items-center px-4 py-2 my-5 text-gray-700 hover:bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-200"
                  >
                    <div className="text-xl">{menu.icon}</div>
                    <span className="mx-4 font-medium">{menu.title}</span>
                  </Link>
                ))}
              </nav>

              <div className="h-[160px] bg-[#F6F6F6] rounded-[24px] flex flex-col items-center text-[#3F3F44]">
                <div className="w-[71px] h-[71px] bg-[#F6F6F6] rounded-full mt-[-35px] flex justify-center items-center">
                  <div className="w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                    <img src={logo} alt="" className="w-[37px] h-[21px]" />
                  </div>
                </div>

                <h1 className="text-[25px] font-[900] font-roboto uppercase">
                  Keylagbe
                </h1>

                <div className="w-[160px] h-[40px] rounded-[8px] bg-[#BBD3EA] flex justify-center items-center mt-[30px]">
                  <button
                    onClick={() => dispatch(addLogout())}
                    className="text-[14px] font-[700]"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Drawer>
    </>
  );
};

export default MobileMenu;
