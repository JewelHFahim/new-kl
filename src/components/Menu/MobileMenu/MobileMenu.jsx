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
import "./MobileMenu.css";

const MobileMenu = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.menu.isOpen);

  const handleToggleDrawer = () => {
    dispatch(toggleDrawer());
  };


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

              {/* <nav>
                {menus.map((menu, i) => (
                  <ul key={i}>
                    <Link
                      to={menu.url}
                      className="flex items-center px-4 py-2 my-4 text-gray-700 hover:bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-200"
                    >
                      <div className="text-xl">{menu.icon}</div>
                      <span className="mx-4 font-medium">{menu.title}</span>
                    </Link>

                    {menu.submenu && (
                      <li className="flex flex-col justify-center items-start pl-8 -mt-3 gap-y-1">
                        {menu?.submenu?.map((sbm, i) => (
                          <Link
                            key={i}
                            to={sbm.url}
                            className="hover:bg-gray-100 px-7 py-1 rounded-lg"
                          >
                            {sbm.subttitle}

                            { menu?.submenu?.subchild && 
                            <li>
                              {
                                menu?.submenu?.subchild.map((sm, i)=>(
                                  <a key={i}>{sm.subchild}</a>
                                ))
                              }
                            </li>

                            }
                          </Link>
                        ))}
                      </li>
                    )}
                  </ul>
                ))}
              </nav> */}

              <nav>
                <ul className="menu menu-md rounded-lg max-w-xs w-full">
                  <li>
                    <a href="/">
                      <MdOutlineDashboard />
                      Dashboard
                    </a>
                  </li>

                  {/* Company */}
                  <li>
                    <details open>
                      <summary>
                        <BiUser />
                        Company Profile
                      </summary>

                      <ul>
                        <li>
                          <a href="/buyers">
                            <BiUser />
                            Buyer
                          </a>
                        </li>

                        <li>
                          <a href="suppliers">
                            <BiUser />
                            Supplier
                          </a>
                        </li>
                      </ul>
                    </details>
                  </li>

                  {/* Invoice */}
                  <li>
                    <details open>
                      <summary>
                        <BiBook />
                        Invoice
                      </summary>
                      <ul>
                        <li>
                          <details open>
                            <summary>
                              <BiBook />
                              Buyer Invoice
                            </summary>
                            <ul>
                              <li>
                                <a>
                                  <BiBook />
                                  Total Invoice
                                </a>
                              </li>
                              <li>
                                <a href="/invoice">
                                  <BiBook />
                                  Invoice
                                </a>
                              </li>
                            </ul>
                          </details>
                        </li>

                        <li>
                          <details open>
                            <summary>
                              <BiBook />
                              Supplier Invoice
                            </summary>
                            <ul>
                              <li>
                                <a>
                                  <BiBook />
                                  Total Invoice
                                </a>
                              </li>
                              <li>
                                <a href="/invoice">
                                  <BiBook />
                                  Invoice
                                </a>
                              </li>
                            </ul>
                          </details>
                        </li>
                      </ul>
                    </details>
                  </li>

                  <li>
                    <a href="/warehouse">
                      <RiCalendar2Line />
                      Warehouse
                    </a>
                  </li>

                  <li>
                    <a href="/profile">
                      <AiOutlineSetting />
                      My Account
                    </a>
                  </li>

                </ul>
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
