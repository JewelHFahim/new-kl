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
  useGetSuppliersOrdersDetailsQuery
} = supplierApi;
export default supplierApi;
