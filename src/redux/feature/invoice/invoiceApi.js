import apiSlice from "../../api/apiSlice";

const invoiceApi = apiSlice.injectEndpoints({
  
    endpoints: (builder) => ({


    getBuyers: builder.query({
      query: () => "/customer/customer-list/",
      providesTags: ['keylagbe'],
    }),


    getSingleBuyer: builder.query({
      query: (id) => `/customer/customer-detail/${id}/`,
      providesTags: ['keylagbe'],
    }),

    postInvoice: builder.mutation({
      query: (data) => ({
        method: "POST",
        url:"/supplier/supplier-order/create/",
        body: data
      }),
      invalidatesTags: ['keylagbe'],
    }),

    updateBuyer: builder.mutation({
      query: ({data, id}) => ({
        method: "POST",
        url:`/customer/customer-update/${id}/`,
        body: data
      }),
      invalidatesTags: ['keylagbe'],
    }),

    
  }),
});

export const {  usePostInvoiceMutation, } = invoiceApi;
export default invoiceApi;
