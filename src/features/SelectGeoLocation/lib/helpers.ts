import {IServerGeoLocationItem} from "../namespace";


export const getGeoItemLabel = (item: Pick<IServerGeoLocationItem, 'type' | 'typeShort' | 'name' | 'contentType'>, fullType: boolean = false) => {
    const typeKey: keyof IServerGeoLocationItem = fullType ? 'type' : 'typeShort'
    const dot = (fullType || item[typeKey].indexOf('.') !== -1) ? '' : '.'
    switch (item.contentType) {
        case 'city':
            return`${item[typeKey]}${dot} ${item.name}`
        case 'region':
            return `${item.name} ${item[typeKey]}${dot}`
        default:
            return item.name
    }
}