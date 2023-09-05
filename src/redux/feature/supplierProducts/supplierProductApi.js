import apiSlice from "../../api/apiSlice";

const invoiceApi = apiSlice.injectEndpoints({
  
    endpoints: (builder) => ({

    getSupplierOrderedProducts: builder.query({
      query: (id) => `/supplier/search-supplier-order-product/?order=${id}`,
      providesTags: ['keylagbe'],
    }),

   
    postSupplierProduct: builder.mutation({
      query: (data) => ({
        method: "POST",
        url:"/supplier/supplier-order-product/create/",
        body: data
      }),
      invalidatesTags: ['keylagbe'],
    }),


    
  }),
});

export const {  useGetSupplierOrderedProductsQuery, usePostSupplierProductMutation} = invoiceApi;
export default invoiceApi;
