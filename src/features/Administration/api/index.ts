import {createApi} from "@reduxjs/toolkit/query/react";
import {axiosBaseQuery, CommonServerListResult, IHandbookItem} from "../../../shared";
import * as NS from '../namespace'
import {IServerUser} from "../../../entities/User";
import {IServerBrend} from "../../../entities/Car/namespace";

export const adminAPI = createApi({
    reducerPath: 'admin',
    baseQuery: axiosBaseQuery({baseUrl: ''}),
    tagTypes: ['handbook', 'user', 'car_data', 'models'],
    endpoints: build => ({
        getHandbookItems: build.query<{ data: IHandbookItem[] }, string>({
            query: code => `handbook/?key=${code}`,
            providesTags: ['handbook']
        }),
        updateHandbookItem: build.mutation<NS.HandbookResponse, NS.HandbookPutPayload>({
            query: ({key, initCode, ...body}) => ({
                method: "PUT",
                body,
                url: `handbook/?key=${key}`,
                params: {
                    key,
                    code: initCode
                }
            }),
            invalidatesTags: ['handbook']
        }),
        createHandbookItem: build.mutation<NS.HandbookResponse, NS.HandbookCreatePayload>({
            query: ({key, ...body}) => ({
                method: "POST",
                url: 'handbook/',
                body,
                params: {
                    key: key
                }
            }),
            invalidatesTags: ['handbook']
        }),
        deleteHandbookItem: build.mutation<{ result: string }, NS.HandbookDeletePayload>({
            query: args => ({
                method: 'DELETE',
                url: "handbook/",
                params: args
            }),
            invalidatesTags: ['handbook']
        }),
        getUsers: build.query<CommonServerListResult<NS.IAdminServerUser>, NS.UserGetPayload>({
            query: (args) => ({
                method: 'GET',
                url: 'administration/user/',
                params: {
                    ...args,
                    query: args.query
                }
            }),
            providesTags: ['user']
        }),
        patchUserStatus: build.mutation<{ result: string }, NS.UserPatchPayload>({
            query: ({id, ...body}) => ({
                method: 'PATCH',
                url: `administration/user/${id}/`,
                body
            }),
            invalidatesTags: ['user']
        }),
        updateCarData: build.mutation<NS.HandbookResponse, NS.CarDataUpdatePayload>({
            query: ({url, id, data}) => ({
                method: "PUT",
                body: data,
                url: `${url}${id}/`,
            }),
            invalidatesTags: ['car_data']
        }),
        createCarData: build.mutation<NS.HandbookResponse, NS.CarDataCreatePayload>({
            query: ({url, data}) => ({
                method: "POST",
                url: `${url}`,
                body: data,
            }),
            invalidatesTags: ['car_data']
        }),
        deleteCarData: build.mutation<{ result: string }, NS.CarDataDeletePayload>({
            query: ({ url, id }) => ({
                method: 'DELETE',
                url: `${url}${id}/`,

            }),
            invalidatesTags: ['car_data']
        }),
        getBrends: build.query<CommonServerListResult<NS.IServerModel>, NS.CommonCarGetPayload>({
            query: (args) => ({
                method: 'GET',
                url: 'car/brends/',
                params: args
            }),
            providesTags: ['car_data']
        }),
        getModels: build.query<CommonServerListResult<NS.IServerModel>, NS.ModelsGetPayload>({
            query: (args) => ({
                method: 'GET',
                url: 'car/models/',
                params: args
            }),
            providesTags: ['car_data']
        }),
        getGenerations: build.query<CommonServerListResult<NS.IServerGeneration>, NS.GenerationsGetPayload>({
            query: (args) => ({
                method: 'GET',
                url: 'car/generations/',
                params: args
            }),
            providesTags: ['car_data']
        }),
        getGenerationVariants: build.query<CommonServerListResult<NS.IServerGenerationVariant>, NS.GenerationVariantGetPayload>({
            query: (args) => ({
                method: 'GET',
                url: 'car/generation_variants/',
                params: args
            }),
            providesTags: ['car_data']
        }),
        getConcreteCars: build.query<CommonServerListResult<NS.IServerConcreteCar>, NS.ConcreteCarPayload>({
            query: (args) => ({
                method: 'GET',
                url: 'car/concrete-car/',
                params: args
            }),
            providesTags: ['car_data']
        }),
        getEquipments: build.query<CommonServerListResult<NS.IServerEquipment>, NS.EquipmentGetPayload>({
            query: (args) => ({
                method: 'GET',
                url: 'car/equipments/',
                params: args
            }),
            providesTags: ['car_data']
        }),
        getProducers: build.query<CommonServerListResult<NS.IServerProducer>, NS.CommonCarGetPayload>({
            query: (args) => ({
                method: 'GET',
                url: 'producers/',
                params: args
            }),
            providesTags: ['car_data']
        }),
        getEngines: build.query<CommonServerListResult<NS.IServerEngine>, NS.CommonCarGetPayload>({
            query: (args) => ({
                method: 'GET',
                url: 'engines/',
                params: args
            }),
            providesTags: ['car_data']
        }),
        getTransmissions: build.query<CommonServerListResult<NS.IServerTransmission>, NS.CommonCarGetPayload>({
            query: (args) => ({
                method: 'GET',
                url: 'transmission/',
                params: args
            }),
            providesTags: ['car_data']
        }),
    })
})

export const {
    useCreateHandbookItemMutation,
    useGetHandbookItemsQuery,
    useDeleteHandbookItemMutation,
    useGetUsersQuery,
    usePatchUserStatusMutation,
    useCreateCarDataMutation,
    useUpdateCarDataMutation,
    useDeleteCarDataMutation,
    useGetConcreteCarsQuery,
    useGetModelsQuery,
    useGetGenerationsQuery,
    useGetGenerationVariantsQuery,
    useGetEnginesQuery,
    useGetEquipmentsQuery,
    useGetBrendsQuery,
    useGetTransmissionsQuery,
    useGetProducersQuery,
    useUpdateHandbookItemMutation
} = adminAPI