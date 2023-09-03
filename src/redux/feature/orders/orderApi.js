import apiSlice from "../../api/apiSlice";

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    postSupplierOrder: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/supplier/supplier-order/create/",
        body: data,
      }),
      invalidatesTags: ["keylagbe"],
    }),


  }),
});

export const { usePostSupplierOrderMutation } = orderApi;
export default orderApi;
