import {IServerGeoLocationItem} from "../../../features/SelectGeoLocation/namespace";
import {ReactNode} from "react";
import {
    CompareType,
    IServerCompareAdvertisementCharacteristics,
    IServerCompareItem,
    IServerCompareModelCharacteristics
} from "../../../features/CompareSmth/namespace";

interface IInfoPayload {
    red: string
}

interface IAuthPayload {
    green: string
}


export interface IComparePayload {
    data:  IServerCompareItem<IServerCompareModelCharacteristics | IServerCompareAdvertisementCharacteristics>[]
    marks: Array<number[]>
    total: number[]
    type: CompareType
}

export interface IImagePayload {
    images: string[]
    currentImageIndex?: number
    extra?: ReactNode
}

export interface IBaseModelProps  {
    onClose: Function
    currentKey: string
}

export interface IConfirmPayload {
    index: string
    onConfirm: Function
}

export interface ISetGeoPayload {
    choose: 'city' | 'region' | 'city-region'
    withMultiple: boolean
    onSave: Function
    defaultSelected: IServerGeoLocationItem[]
}

export type Modals = {
    "auth": never,
    "confirm": IConfirmPayload
    "info": IInfoPayload
    "image": IImagePayload
    "geo": ISetGeoPayload
    "compare": IComparePayload
    "pre_test": never
}

export type ModalsKeys = keyof Modals
export type CommonModal = {
    key: string
    payload?: any
}
export type Modal = { [T in ModalsKeys]: Modals[T] extends never ? { key: T } : { key: T, payload: Modals[T] } }[ModalsKeys]

export interface IReduxState {
    openModals: CommonModal[]
}



export type ModalProps = IBaseModelProps & any