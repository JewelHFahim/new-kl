import { useContext } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { ThemeContext } from "../../../context/AppContext";
import MobileMenu from "../../../components/Menu/MobileMenu/MobileMenu";
import { RiMessage3Line } from "react-icons/ri";
import { GrNotification } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";

const Navbar = () => {

  const { toggleDrawer } = useContext(ThemeContext);

  return (
    <>
      <div className="navbar bg-base-100 px-[27px] py-[25px] border-b">

        <div className="navbar-start">
          <HiMenuAlt1 onClick={toggleDrawer} className="text-2xl" />
          <MobileMenu/>
        </div>

        {/* <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div> */}

        <div className="navbar-end flex gap-4">

        <button><RiMessage3Line className="text-2xl"/></button>

          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <GrNotification className="text-xl"/>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>

          <button><FaRegUser className="text-xl"/></button>

          
        </div>
      </div>
    </>
  );
};

export default Navbar;
