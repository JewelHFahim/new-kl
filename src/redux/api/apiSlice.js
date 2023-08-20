import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.3.16:8000" }),
  tagTypes: ["products"],
  endpoints: () => ({}),
});

export default apiSlice;