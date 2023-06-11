import {createApi} from "@reduxjs/toolkit/query/react";
import {axiosBaseQuery, IServerCarName} from "shared";
import * as NS from '../namespace'
import {IServerBrend} from "../namespace";

export const carApi = createApi({
    reducerPath: 'car',
    baseQuery: axiosBaseQuery({baseUrl: 'car/'}),
    tagTypes: ['car', 'model', 'generation', 'brend'],
    endpoints: (build) => ({
        getCarCharacteristics: build.query<NS.ISererCarCharacteristics, NS.ISererCarCharacteristicsParams>({
            query: (params) => ({
                url: 'info/',
                method: 'GET',
                privacy: 'all',
                params
            })

        }),
        getCarFullName: build.query<IServerCarName, number>({
            query: id => `name/${id}/`
        }),
        getCarBrend: build.query<NS.IServerBrend, number>({
            query: id => `brend/${id}/`
        }),
        getCarModel: build.query<NS.IServerModel, number>({
            query: id => `model/${id}/`
        }),
        getCarGeneration: build.query<NS.IServerGeneration, number>({
            query: id => `generation/${id}/`
        }),
        getPopularBrends: build.query<IServerBrend[], number | undefined>({
            query: (args) => ({
                method: 'GET',
                url: 'brend/populars/',
                params: {
                    count: 6
                }
            }),
        }),
        getCarAvailableColors: build.query({
            query: id => `generation/${id}/`
        }),
        getCarModels: build.query<NS.IModelOption[], number>({
            query: id => `brend/${id}/models/`
        }),
        getCarGenerations: build.query<NS.IGenerationOption[], number>({
            query: id => `model/${id}/generations/`
        }),
        getCarEquipments: build.query({
            query: id => `generation/${id}/equipments/`
        }),
        getCarEquipmentsAndGenerationVariants: build.query<NS.IServerGenerationsVariantsAndEquipments, number>({
            query: id => `generation/${id}/equipments-generations_variants/`
        }),
        getSearchCarGenerationInfo: build.query({
            query: id => `generation/${id}/search-info/`
        }),
        getSearchCarEquipmentInfo: build.query({
            query: id => `equipment/${id}/search-info/`
        }),
        getCarSearchProp: build.query<NS.ISearchCarInfo, number>({
            query: id => `${id}/search-info/`
        }),
        getCarPriceRange: build.query<NS.IPriceRange, NS.IGetCarPrice>({
            query: (params) => ({
                url: 'price/',
                method: 'GET',
                privacy: 'all',
                params
            })
        }),
        getCarId: build.query<number, { generation_variant: number, equipment: number }>({
            query: (params) => ({
                url: 'id/',
                method: 'GET',
                privacy: 'all',
                params
            })
        }),
    })
})

export const {
    useGetCarBrendQuery, useGetPopularBrendsQuery, useGetCarPriceRangeQuery ,useGetCarSearchPropQuery, useGetCarEquipmentsAndGenerationVariantsQuery, useGetCarGenerationsQuery, useGetCarModelsQuery, useGetCarEquipmentsQuery, useGetCarIdQuery, useGetCarFullNameQuery, useGetCarCharacteristicsQuery, useGetCarGenerationQuery, useGetCarModelQuery,
} = carApi