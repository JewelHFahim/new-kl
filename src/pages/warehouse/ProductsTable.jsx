import { BiPlus } from "react-icons/bi";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import {
  // useDeleteProductMutation,
  useGetProductsQuery,
} from "../../redux/feature/products/productApi";
import AddProduct from "./AddNewProduct";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProductsTable = () => {
  const { id } = useParams();
  const { data: products } = useGetProductsQuery();

  // const [deleteProduct] = useDeleteProductMutation(id);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const handleDelete = (id) => {
  //   deleteProduct(id);
  //   console.log(id);
  //   toast.error("Deleted");
  // };



  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
              <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Products
                  </h2>
                </div>

                <div>
                  <div className="inline-flex gap-x-2">
                    <button
                      onClick={openModal}
                      className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary text-white hover:bg-[#8F8DF1] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
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
              </div>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-slate-800">
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
                          Quantity
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

                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {products?.results?.map((product, i) => (
                    <tr key={i}>
                      <td className="h-px w-px pl-2 whitespace-nowrap">
                        <div className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3">
                          <div className="flex items-center gap-x-3">
                            <img
                              className="inline-block h-[2.375rem] w-[2.375rem] rounded-full"
                              src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                              alt="Image Description"
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
                            Supplier ID: {product.supplier}
                          </span>
                        </div>
                      </td>
                      <td className="h-px w-px whitespace-nowrap">
                        <div className="px-6 py-3">{product.stock}</div>
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
                            <button className="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium px-2"
                            >
                              Edit
                            </button>
                          </Link>

                          {/* <button
                            onClick={() => handleDelete(product.id)}
                            className="inline-flex items-center gap-x-1.5 text-sm text-red-400 decoration-2 
                            hover:text-red-500 font-medium"
                            href="#"
                          >
                            Delete
                          </button> */}

                        </div>
                      </td>


                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Footer */}
              <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {products?.results?.length}
                    </span>
                    Results
                  </p>
                </div>

                {/* Pagination */}
                <div>
                  <div className="inline-flex gap-x-2">
                    <button
                      type="button"
                      className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                    >
                      <MdArrowBackIos />
                      Prev
                    </button>

                    <button
                      type="button"
                      className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                    >
                      Next
                      <MdArrowForwardIos />
                    </button>
                  </div>
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
