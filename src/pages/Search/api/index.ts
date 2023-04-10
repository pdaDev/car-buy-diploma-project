import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "shared";

export const searchApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    reducerPath: 'search',
    endpoints: build => ({

    })
})

export const {} = searchApi