import { useContext } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { ThemeContext } from "../../../context/AppContext";
import MobileMenu from "../../../components/Menu/MobileMenu/MobileMenu";
import { RiMessage3Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Notification from "../../../components/notification/Notification";

const Navbar = () => {
  const { toggleDrawer } = useContext(ThemeContext);

  return (
    <>
      <div className="navbar bg-base-100 px-[27px] py-[25px] border-b">
        <div className="navbar-start">
          <HiMenuAlt1 onClick={toggleDrawer} className="text-2xl" />
          <MobileMenu />
        </div>

        {/* <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div> */}

        <div className="navbar-end flex gap-4">
          <button className="">

            <RiMessage3Line className="text-2xl" />
            
          </button>

          <button>
            <Notification />
          </button>

          <Link to="/profile">
            <button className="">
              <FaRegUser className="text-xl" />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
