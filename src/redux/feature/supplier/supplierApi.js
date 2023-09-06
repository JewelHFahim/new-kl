import apiSlice from "../../api/apiSlice";

const supplierApi = apiSlice.injectEndpoints({

  endpoints: (builder) => ({


    getSuppliers: builder.query({
      query: () => "/supplier/supplier-list/",
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
      query: ({startDate, endDate}) => `/supplier/supplier-order/?start_date=${startDate}&end_date=${endDate}`,
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
  }),
});

export const {
  useGetSuppliersQuery,
  usePostSupplierMutation,
  useGetSingleSupplierQuery,
  useUpdateSupplierMutation,
  useGetSuppliersOrdersDetailsQuery,
  useGetSupplierProductsQuery,
  useSearchProductBySupplierQuery, 
  useFilterSupplierByIdQuery,
  useFilterSupplierByDateQuery
} = supplierApi;
export default supplierApi;
