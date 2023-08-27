import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import MainPage from "../layout/MainPage";
import ErrorPage from "../utils/ErrorPage";
import Login from "../pages/login/Login";
import Invoice from "../pages/invoice/Invoice";
import Ledger from "../pages/ladger/Ledger";
import WareHouse from "../pages/warehouse/WareHouse";
import Profile from "../pages/profile/Profile";
import SupplierList from "../pages/companyprofile/suppliers/SupplierList";
import SingleSupplier from "../pages/companyprofile/suppliers/SingleSupplier";
import BuyerList from "../pages/companyprofile/buyers/BuyerList";
import SingleBuyer from "../pages/companyprofile/buyers/SingleBuyer";
import EditProduct from "../pages/warehouse/EditProduct";

// import PrivateRoute from "./PrivateRoute";
// import SupplierList from "../pages/suppliers/SupplierList";

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

      // Suppliers
      {
        path: "/suppliers",
        element: <SupplierList />,
      },
      {
        path: "/supplier/:id",
        element: <SingleSupplier />,
      },

      // Buyers
      {
        path: "/buyers",
        element: <BuyerList />,
      },
      {
        path: "/buyer/:id",
        element: <SingleBuyer />,
      },

      {
        path: "/warehouse/:id",
        element: <EditProduct />,
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
