import apiSlice from "../../api/apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getProducts: builder.query({
      query: () => `/product/product-list/`,
      providesTags: ["keylagbe"],
    }),

    singleProduct: builder.query({
      query: (id) => `/product/product-detail/${id}/`,
      providesTags: ["keylagbe"],
    }),

    postProduct: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/product/product-create/",
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

    updateProduct: builder.mutation({
      query: ({data,id}) => ({
        method: "POST",
        url: `/product/product-update/${id}/`,
        body: data
      }),
      invalidatesTags: ["keylagbe"],
    }),

  }),
});

export const { useGetProductsQuery, usePostProductMutation, useSingleProductQuery, useUpdateProductMutation } = productApi;
export default productApi;
