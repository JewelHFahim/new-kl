import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "apiSlice",
  // baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.3.16:8000" }),
  baseQuery: fetchBaseQuery({ baseUrl: "https://jabed.pythonanywhere.com/" }),
  tagTypes: ["keylagbe"],
  endpoints: () => ({}),
});

export default apiSlice;