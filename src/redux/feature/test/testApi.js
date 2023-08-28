import apiSlice from "../../api/apiSlice";

const testApi = apiSlice.injectEndpoints({
  
    endpoints: (builder) => ({


    getTestUsers: builder.query({
      query: () => "/users",
      providesTags: ['keylagbe'],
    }),

    postTestUser: builder.mutation({
      query: (data) => ({
        method: "POST",
        url:"/users",
        body: data
      }),
      invalidatesTags: ['keylagbe'],
    }),

    // orders
    getTestOrders: builder.query({
      query: () => "/orders",
      providesTags: ['keylagbe'],
    }),

    postTestOrders: builder.mutation({
      query: (data) => ({
        method: "POST",
        url:"/orders",
        body: data
      }),
      invalidatesTags: ['keylagbe'],
    }),

    
  }),
});

export const { usePostTestUserMutation, useGetTestUsersQuery, useGetTestOrdersQuery, usePostTestOrdersMutation } = testApi;
export default testApi;
