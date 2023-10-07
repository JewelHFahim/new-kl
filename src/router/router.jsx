import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import MainPage from "../layout/MainPage";
import ErrorPage from "../utils/ErrorPage";
import Login from "../pages/login/Login";
import WareHouse from "../pages/warehouse/WareHouse";
import Profile from "../pages/profile/Profile";
import SupplierList from "../pages/companyprofile/suppliers/SupplierList";
import SingleSupplier from "../pages/companyprofile/suppliers/SingleSupplier";
import BuyerList from "../pages/companyprofile/buyers/BuyerList";
import SingleBuyer from "../pages/companyprofile/buyers/SingleBuyer";
import EditProduct from "../pages/warehouse/EditProduct";
import Invoice from "../pages/invoice/Supplier/Invoice";
import AllInvoiceSupplier from "../pages/invoice/Supplier/AllInvoice";
import DetailsInvoice from "../pages/invoice/Supplier/DetailsInvoice";
import InvoiceBuyer from "../pages/invoice/Buyer/InvoiceBuyer";
import AllInvoiceByer from "../pages/invoice/Buyer/AllInvoice";
import DetailsBuyerInvoice from "../pages/invoice/Buyer/DetailsBuyerInvoice";
import PrivateRouter from "./PrivateRoute";
import SupplierLedger from "../pages/ledger/SupplierLedger";
import BuyerLedger from "../pages/ledger/BuyerLedger";
import AddBuyerProduct from "../pages/invoice/Buyer/AddBuyerProduct";
import AddSupplierProduct from "../pages/invoice/Supplier/AddProduct";
import Test from "../pages/Test/Test";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRouter>
        <MainPage />
      </PrivateRouter>
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
        path: "/invoice-buyer",
        element: <InvoiceBuyer />,
      },
      {
        path: "/invoicedetails/:id",
        element: <DetailsInvoice />,
      },
      {
        path: "/invoicedetails-buyer/:id",
        element: <DetailsBuyerInvoice />,
      },
      {
        path: "/supplierallinvoice",
        element: <AllInvoiceSupplier />,
      },
      {
        path: "/buyerallinvoice",
        element: <AllInvoiceByer />,
      },
      {
        path: "/ledger-suppliers",
        element: <SupplierLedger />,
      },
      {
        path: "/ledger-buyers",
        element: <BuyerLedger />,
      },
      {
        path: "/warehouse",
        element: <WareHouse />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/addproductinvoice",
        element: <AddSupplierProduct />,
      },
      {
        path: "/addbuyerproduct",
        element: <AddBuyerProduct />,
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

  {
    path: "/test",
    element: <Test />,
  },
]);

export default router;
