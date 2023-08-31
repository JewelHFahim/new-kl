import apiSlice from "../../api/apiSlice";

const invoiceApi = apiSlice.injectEndpoints({
  
    endpoints: (builder) => ({

    getBuyers: builder.query({
      query: () => "/customer/customer-list/",
      providesTags: ['keylagbe'],
    }),


    getSupplierProducts: builder.query({
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

export const {  useGetSupplierProductsQuery, usePostSupplierProductMutation} = invoiceApi;
export default invoiceApi;
