import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jabed.pythonanywhere.com/" }),
  tagTypes: ["keylagbe"],
  endpoints: () => ({}),
});

export default apiSlice;
