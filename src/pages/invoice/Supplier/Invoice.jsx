import { useState, useEffect } from "react";
import axios from "axios";
import {
  useGetSingleSupplierQuery,
  useGetSuppliersQuery,
} from "../../../redux/feature/supplier/supplierApi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addSupplierUnderProducts,
  addSuppliers,
} from "../../../redux/feature/invoice/invoiceSlice";
import HTitle from "../../../utils/HTitle";

const Invoice = () => {


  const dispatch = useDispatch();
  const [selectedSupplier, setSelectedSupplier] = useState("");

  const [searchUrl, setSearchUrl] = useState("");

  const { data: allSuppliers } = useGetSuppliersQuery();

  const { addedProducts, addedSupplier } = useSelector(
    (state) => state.invoice
  );

  const { data: singleSupplier } = useGetSingleSupplierQuery(addedSupplier);

  // Handle supplier selection
  const handleSupplierChange = (e) => {
    const selected = e.target.value;
    setSelectedSupplier(selected);
    dispatch(addSuppliers(selected));

    // Construct the search URL with the selected supplier
    const url = `http://192.168.3.16:8000/product/search-supplier/?supplier=${selected}`;
    setSearchUrl(url);
  };

  // Perform the search when the URL changes
  useEffect(() => {
    if (searchUrl) {
      axios
        .get(searchUrl)
        .then((response) => {
          dispatch(addSupplierUnderProducts(response.data));
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [dispatch, searchUrl]);

  return (
    <section className="px-6 pb-5">

      <HTitle>Invoice</HTitle>

      <div>
        <label htmlFor="supplierDropdown">Select Supplier: </label>
        <select
          id="supplierDropdown"
          onChange={handleSupplierChange}
          value={selectedSupplier}
        >
          <option value="">All Suppliers</option>
          {allSuppliers?.results?.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.supplier_name}
            </option>
          ))}
        </select>

        <p>Supplier Name: {singleSupplier?.supplier_name}</p>
        <p>Phone: {singleSupplier?.contact_person_phone}</p>
        <p>Address: {singleSupplier?.supplier_address}</p>

        <Link to={`/addproductinvoice`}>
          <button>Add Product</button>
        </Link>

        <div>
          {addedProducts?.map((product, i) => (
            <p key={i}>{product?.product_name}</p>
          ))}
        </div>
      </div>


    </section>
  );
};

export default Invoice;
