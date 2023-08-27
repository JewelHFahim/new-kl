import apiSlice from "../../api/apiSlice";

const buyerApi = apiSlice.injectEndpoints({
  
    endpoints: (builder) => ({


    getBuyers: builder.query({
      query: () => "/customer/customer-list/",
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

export const { useGetBuyersQuery, useGetSingleBuyerQuery, usePostBuyerMutation, useUpdateBuyerMutation } = buyerApi;
export default buyerApi;
