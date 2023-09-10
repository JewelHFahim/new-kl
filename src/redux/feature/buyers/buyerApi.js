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

    filterBuyerById: builder.query({
      query: (id) => `/product/search-customer-order-number/?search=${id}`,
      providesTags: ['keylagbe'],
    }),

    filterBuyerByDate: builder.query({
      query: ({startDate, endDate}) => `/product/customer-order/?start_date=${startDate}&end_date=${endDate}`,
      providesTags: ["keylagbe"],
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

    getBuyerOrdereList: builder.query({
      query: (currentPage) => `/product/order/list/?page_number=${currentPage}`,
      providesTags: ['keylagbe'],
    }),

    getBuyerBalanceDetail: builder.query({
      query: (id) => `/customer/search-customer-balance/?customer=${id}`,
      providesTags: ['keylagbe'],
    }),

    getAllBuyerBalance: builder.query({
      query: () => `/customer/search-customer-balance/`,
      providesTags: ['keylagbe'],
    }),


    deleteBuyer: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/customer/customer-delete/${id}/`,
      }),
      invalidatesTags: ["keylagbe"],
    }),
  }),
});

export const { useGetBuyersQuery, useGetSingleBuyerQuery, usePostBuyerMutation, useUpdateBuyerMutation, useGetAllInvoiceBuyerQuery, useGetSingleOrderQuery, useGetAllOrderedProductsQuery, useFilterBuyerByIdQuery, useFilterBuyerByDateQuery, useGetBuyerOrdereListQuery, useGetBuyerBalanceDetailQuery, useDeleteBuyerMutation, useGetAllBuyerBalanceQuery } = buyerApi;
export default buyerApi;
