import apiSlice from "../../api/apiSlice";

const buyerApi = apiSlice.injectEndpoints({
  
    endpoints: (builder) => ({

    getBuyers: builder.query({
      query: () => "/customer/customer-list/",
      providesTags: ['keylagbe'],
    }),

    getAllInvoiceBuyer: builder.query({
      query: () => "/product/order/list/",
      providesTags: ['keylagbe'],
    }),

    getAllOrderedProducts: builder.query({
      query: (id) => `/product/search-order-product-customer/?order=${id}`,
      providesTags: ['keylagbe'],
    }),


    getSingleOrder: builder.query({
      query: (id) => `/product/order/detail/${id}/`,
      providesTags: ['keylagbe'],
    }),

    getSingleBuyer: builder.query({
      query: (id) => `/customer/customer-detail/${id}/`,
      providesTags: ['keylagbe'],
    }),

    postBuyer: builder.mutation({
      query: (data) => ({
        method: "POST",
        url:"/customer/customer-create/",
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

export const { useGetBuyersQuery, useGetSingleBuyerQuery, usePostBuyerMutation, useUpdateBuyerMutation, useGetAllInvoiceBuyerQuery, useGetSingleOrderQuery, useGetAllOrderedProductsQuery } = buyerApi;
export default buyerApi;
