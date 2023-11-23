import { BiPlus, BiSearchAlt } from "react-icons/bi";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import {
  useDeleteProductMutation,
  useGetPaginateProductListQuery,
} from "../../redux/feature/products/productApi";
import AddProduct from "./AddNewProduct";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  useGetSuppliersQuery,
  useSearchProductBySupplierQuery,
} from "../../redux/feature/supplier/supplierApi";
import { pagination_btn_style } from "../../utils/someClasses";
import productImg from "../../assets/productImg.jpeg";
import { useForm } from "react-hook-form";

const ProductsTable = () => {
  const { id } = useParams();
  const [name, setName] = useState();
  const { register, handleSubmit } = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: products } = useGetPaginateProductListQuery(currentPage);
  const [deleteProduct] = useDeleteProductMutation(id);
  const { data: searchedProducts } = useSearchProductBySupplierQuery(name);
  const { data: suppliers } = useGetSuppliersQuery();

  const supplierName = (supId) => {
    const foundSupplier = suppliers?.results?.find((sup) => sup?.id === supId);

    if (foundSupplier) {
      return foundSupplier.supplier_name;
    }

    return null;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    console.log(id);
    toast.error("Deleted");
  };

  const onSubmit = (data) => {
    const selected = data.pname;
    setName(selected);
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 flex flex-col gap-2 lg:flex-row  justify-between items-center border-b border-gray-200">
                
                <h2 className="text-xl font-semibold text-gray-800">
                  Products
                </h2>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className=" rounded-[8px] h-[32px] mt-4 flex items-center pl-4 border"
                >
                  <BiSearchAlt className="text-[20px]" />

                  <input
                    {...register("pname")}
                    type="text"
                    placeholder="Product Name"
                    className="w-full h-8 bg-transparent px-[14px] focus:outline-none"
                  />

                  <button className="px-4 py-1 rounded-lg bg-[#8F8DF1] text-white">
                    Search
                  </button>
                </form>

                <div className="inline-flex gap-x-2">
                  <button
                    onClick={openModal}
                    className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary text-white hover:bg-[#8F8DF1] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all text-sm "
                    href=""
                  >
                    <BiPlus className="text-lg" />
                    Add Product
                  </button>
                  <AddProduct
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                  />
                </div>
              </div>

              <table className="min-w-full divide-y divide-gray-200 overflow-y-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="pl-6 lg:pl-3 xl:pl-2 pr-6 py-3 text-left"
                    >
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          Name
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-left">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          Supplier
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-left">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          Stock
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-left">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          Buying Price
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-left">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          Selling Price
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-right"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 ">
                  {(searchedProducts?.length !== 0
                    ? searchedProducts
                    : products?.results
                  )?.map((product, i) => (
                    <tr key={i}>
                      <td className="h-px w-px pl-2 whitespace-nowrap">
                        <div className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3">
                          <div className="flex items-center gap-x-3">
                            <img
                              className="inline-block h-[2.375rem] w-[2.375rem] rounded-full object-cover"
                              src={productImg}
                              alt="Product Img"
                            />
                            <div className="grow">
                              <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                {product.product_name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="h-px w-72 whitespace-nowrap">
                        <div className="px-6 py-3">
                          <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                            {supplierName(product.supplier)}
                          </span>
                        </div>
                      </td>
                      <td className="h-px w-px whitespace-nowrap">
                        <div
                          className={`px-6 py-3 ${
                            product.stock <= 3 ? "text-red-700 font-bold" : ""
                          }`}
                        >
                          {product.stock}
                        </div>
                      </td>

                      <td className="h-px w-px whitespace-nowrap">
                        <div className="px-6 py-3">{product.buying_price}</div>
                      </td>

                      <td className="h-px w-px whitespace-nowrap">
                        <div className="px-6 py-3">{product.selling_price}</div>
                      </td>

                      <td className="h-px w-px whitespace-nowrap">
                        <div className="px-4 py-1.5">
                          <Link to={`/warehouse/${product.id}`}>
                            <button className="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium px-2">
                              Edit
                            </button>
                          </Link>

                          <button
                            onClick={() => handleDelete(product.id)}
                            className="inline-flex items-center gap-x-1.5 text-sm text-red-400 decoration-2 
                            hover:text-red-500 font-medium"
                            href="#"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Footer */}
              <div className="px-6 py-4 flex justify-between items-center border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex gap-2">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {products?.results?.length}
                    </span>
                    results of
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {products?.count}
                    </span>
                  </p>
                </div>

                {/* Pagination */}
                <div>
                  {products?.count > 0 && (
                    <div className="flex justify-center items-center gap-4 py-2">
                      <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={!products?.previous}
                        className={`${
                          products?.previous ? "" : "hidden"
                        } ${pagination_btn_style} `}
                      >
                        <MdArrowBackIos /> Previous
                      </button>

                      <span>
                        Page {currentPage} of{" "}
                        {Math.ceil(products?.count / products?.results?.length)}
                      </span>

                      <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={!products?.next}
                        className={` ${
                          products?.next ? "" : "hidden"
                        } ${pagination_btn_style}`}
                      >
                        Next <MdArrowForwardIos />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
