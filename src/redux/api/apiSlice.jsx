import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.3.16:8000/supplier" }),
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => `/supplier-list/`,
    }),
  }),
});

export const { useGetProductQuery } = productApi;
