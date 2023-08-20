import apiSlice from "../../api/apiSlice";

const productApi = apiSlice.injectEndpoints({

  endpoints: (builder) => ({

    getProducts: builder.query({
      query: () => `/product/product-list/`,
    }),

  }),

});

export const {
    useGetProductsQuery
  } = productApi;
export default productApi;