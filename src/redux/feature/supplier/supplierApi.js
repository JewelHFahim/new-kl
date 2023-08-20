import apiSlice from "../../api/apiSlice";

const supplierApi = apiSlice.injectEndpoints({
  
    endpoints: (builder) => ({


    getSuppliers: builder.query({
      query: () => "/supplier/supplier-list/",
    }),

    postSupplier: builder.mutation({
      query: (data) => ({
        method: "POST",
        url:"/supplier/supplier-create/",
        body: data
      }),
    }),

    
  }),
});

export const { useGetSuppliersQuery, usePostSupplierMutation } = supplierApi;
export default supplierApi;
