import { Outlet } from "react-router-dom";
import Navbar from "../utils/shared/Navbar/Navbar";

const MainPage = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainPage;
