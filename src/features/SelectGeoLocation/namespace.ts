
export type GeoContentType = 'region' | 'city' | 'district' | 'street' | 'building'
export interface IServerGeoLocationItem {
    "id": string
    "name": string
    "zip": number
    "type": string
    "typeShort": string
    "okato": string,
    "contentType": GeoContentType,
    "guid": string,
    "ifnsfl": string,
    "ifnsul": string,
    "oktmo": string,
    "parentGuid": string,
    "cadnum": string
    parents?: IServerGeoLocationItem[]
}



export interface IServerResponse {
    searchContext: object
    results: IServerGeoLocationItem[]
}