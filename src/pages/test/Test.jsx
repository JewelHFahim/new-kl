/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { useGetSuppliersQuery } from "../../redux/feature/supplier/supplierApi";
import { useDispatch, useSelector } from "react-redux";
import { addOrderedProducts } from "../../redux/feature/invoice/invoiceSlice";

const ProductFilter = ({ selectedItem, setSelectedItem }) => {
const dispatch = useDispatch();

  const { orderedProducts } = useSelector(state=> state.invoice)

  const [suppliers, setSuppliers] = useState([]);
  const [searchUrl, setSearchUrl] = useState("");

  const { data: supplierList } = useGetSuppliersQuery();


  const [supplierUnderProducts, setSupplierUnderProducts] = useState([]);
  console.log(supplierUnderProducts, "supplierUnderProducts");


  useEffect( () => {
    setSuppliers(supplierList?.results);
  }, [supplierList?.results]);

  const handleSupplierChange = (e) => {
    const selected = e.target.value;
    setSelectedItem(selected);
    
    const url = `http://192.168.3.16:8000/product/search-supplier/?supplier=${selected}`;
    setSearchUrl(url);
  };

  useEffect(() => {
    if (searchUrl) {
      axios
        .get(searchUrl)
        .then((response) => {
          // Handle the response data as needed
          console.log(response.data);
          setSupplierUnderProducts(response.data);
          dispatch(addOrderedProducts(response.data))
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
        });
    }
  }, [searchUrl, dispatch]);

  return (
    <div>
      <label htmlFor="supplierDropdown">Select Supplier: </label>
      <select
        id="supplierDropdown"
        onChange={handleSupplierChange}
        value={selectedItem}
      >
        <option value="">All Suppliers</option>
        {suppliers?.map((supplier) => (
          <option key={supplier.id} value={supplier.id}>
            {supplier.supplier_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductFilter;
