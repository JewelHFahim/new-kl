import apiSlice from "../../api/apiSlice";

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // getProducts: builder.query({
    //   query: () => `/product/product-list/`,
    //   providesTags: ["keylagbe"],
    // }),

    // singleProduct: builder.query({
    //   query: (id) => `/product/product-detail/${id}/`,
    //   providesTags: ["keylagbe"],
    // }),

    postSupplierOrder: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/supplier/supplier-order/create/",
        body: data,
      }),
      invalidatesTags: ["keylagbe"],
    }),

    // deleteProduct: builder.mutation({
    //   query: (id) => ({
    //     method: "DELETE",
    //     url: `/product/product-delete/${id}/`,
    //   }),
    //   invalidatesTags: ["keylagbe"],
    // }),

    // updateProduct: builder.mutation({
    //   query: ({data,id}) => ({
    //     method: "POST",
    //     url: `/product/product-update/${id}/`,
    //     body: data
    //   }),
    //   invalidatesTags: ["keylagbe"],
    // }),

  }),
});

export const { usePostSupplierOrderMutation } = orderApi;
export default orderApi;
