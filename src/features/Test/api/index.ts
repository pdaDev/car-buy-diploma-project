import {createApi} from "@reduxjs/toolkit/query/react";
import {axiosBaseQuery} from "../../../shared";
import * as NS from '../namespace'

export const testAPI = createApi({
    reducerPath: 'test',
    baseQuery: axiosBaseQuery({baseUrl: 'test/'}),
    endpoints: build => ({
        getTestData: build.query<NS.IServerTestCar[], NS.TestPayload>({
            query: (body) => ({
                url: 'cars/',
                method: 'POST',
                privacy: 'all',
                body
            })
        })
    })
})

export const { useGetTestDataQuery } = testAPI
