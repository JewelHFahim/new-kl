import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import MainPage from "../layout/MainPage";
import ErrorPage from "../utils/ErrorPage";
import Login from "../pages/login/Login";
import BuyerSingle from "../pages/suppliers/SingleSupplier";
import Invoice from "../pages/invoice/Invoice";
import Ledger from "../pages/ladger/Ledger";
import WareHouse from "../pages/warehouse/WareHouse";
import Profile from "../pages/profile/Profile";
// import PrivateRoute from "./PrivateRoute";
import BuyerList from "../pages/suppliers/SupplierList";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <PrivateRoute>
        <MainPage />
      // </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allbuyer",
        element: <BuyerList />,
      },
      {
        path: "/supplier/:id",
        element: <BuyerSingle />,
      },
      {
        path: "/invoice",
        element: <Invoice />,
      },
      {
        path: "/ledger",
        element: <Ledger />,
      },
      {
        path: "/warehouse",
        element: <WareHouse />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
