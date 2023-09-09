import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.3.36:8000" }),
  tagTypes: ["keylagbe"],
  endpoints: () => ({}),
});

export default apiSlice;
