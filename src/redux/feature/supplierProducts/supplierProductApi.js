import apiSlice from "../../api/apiSlice";

const invoiceApi = apiSlice.injectEndpoints({
  
    endpoints: (builder) => ({

    getBuyers: builder.query({
      query: () => "/customer/customer-list/",
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

export const {  usePostInvoiceMutation, usePostSupplierProductMutation} = invoiceApi;
export default invoiceApi;
