import apiSlice from "../../api/apiSlice";

const supplierApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSuppliers: builder.query({
      query: () => "/supplier/supplier-list/",
      providesTags: ["keylagbe"],
    }),

    getAllInvoiceSupplier: builder.query({
      query: () => "/supplier/supplier-order/list/",
      providesTags: ["keylagbe"],
    }),

    getSuppliersOrdersDetails: builder.query({
      query: (id) => `/supplier/supplier-order/detail/${id}/`,
      providesTags: ["keylagbe"],
    }),

    getSingleSupplier: builder.query({
      query: (id) => `/supplier/supplier-detail/${id}/`,
      providesTags: ["keylagbe"],
    }),

    deleteSupplier: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/supplier/supplier-delete/${id}/`,
      }),
      invalidatesTags: ["keylagbe"],
    }),

    getSupplierProducts: builder.query({
      query: (id) => `/product/search-supplier/?supplier=${id}`,
      providesTags: ["keylagbe"],
    }),

    searchProductBySupplier: builder.query({
      query: (name) => `/product/search-product/?search=${name}`,
      providesTags: ["keylagbe"],
    }),

    filterSupplierById: builder.query({
      query: (id) => `/supplier/search-supplier-order-number/?search=${id}`,
      providesTags: ["keylagbe"],
    }),

    filterSupplierByDate: builder.query({
      query: ({ startDate, endDate }) =>
        `/supplier/supplier-order/?start_date=${startDate}&end_date=${endDate}`,
      providesTags: ["keylagbe"],
    }),

    postSupplier: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/supplier/supplier-create/",
        body: data,
      }),
      invalidatesTags: ["keylagbe"],
    }),

    updateSupplier: builder.mutation({
      query: ({ data, id }) => ({
        method: "POST",
        url: `/supplier/supplier-update/${id}/`,
        body: data,
      }),
      invalidatesTags: ["keylagbe"],
    }),

    updateInvoice: builder.mutation({
      query: ({ data, id }) => ({
        method: "POST",
        url: `/supplier/supplier-order-product/update/${id}/`,
        body: data,
      }),
      invalidatesTags: ["keylagbe"],
    }),


    getSupplierOrderedProducts: builder.query({
      query: (id) => `/supplier/search-supplier-order-product/?order=${id}`,
      providesTags: ["keylagbe"],
    }),

    getSupplierOrdereList: builder.query({
      query: (currentPage) =>`/supplier/supplier-order/list/?page_number=${currentPage}`,
      providesTags: ["keylagbe"],
    }),


    getSupplierBalanceDetail: builder.query({
      query: (id) => `/supplier/search-supplier-balance/?supplier=${id}/`,
      providesTags: ["keylagbe"],
    }),

    getSupplierBalanceList: builder.query({
      query: () => `/supplier/search-supplier-balance/`,
      providesTags: ["keylagbe"],
    }),

    getSingleSupplierTotalOrder: builder.query({
      query: (ids) =>`/supplier/search-supplier-from-supplier-order/?supplier=${ids.join('&supplier=')}`,
      providesTags: ["keylagbe"],
    }),


    deleteInvoiceProduct: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/supplier/supplier-order-product/delete/${id}/`,
      }),
      invalidatesTags: ["keylagbe"],
    }),

    deleteSupplierOrder: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/supplier/supplier-order/delete/${id}/`,
      }),
      invalidatesTags: ["keylagbe"],
    }),


  }),
});

export const {
  useGetSuppliersQuery,
  usePostSupplierMutation,
  useGetSingleSupplierQuery,
  useUpdateSupplierMutation,
  useGetAllInvoiceSupplierQuery,
  useGetSuppliersOrdersDetailsQuery,
  useGetSupplierProductsQuery,
  useSearchProductBySupplierQuery,
  useFilterSupplierByIdQuery,
  useFilterSupplierByDateQuery,
  useGetSupplierOrderedProductsQuery,
  useGetSupplierOrdereListQuery,
  useGetSupplierBalanceDetailQuery,
  useDeleteSupplierMutation,
  useGetSupplierBalanceListQuery,
  useGetSingleSupplierTotalOrderQuery,
  useUpdateInvoiceMutation,
  useDeleteInvoiceProductMutation,
  useDeleteSupplierOrderMutation
} = supplierApi;
export default supplierApi;
