import {IBrend, ICarBodyTypeHandbook, IColor, IGeneration, IHandbookItem, IModel} from "shared";

export interface IReduxState {
    handbooks: HandbookPayload<Handbook, ExtraHandbookType>
    brends: IBrend[]
    models: IModel[]
    generations: IGeneration[]
}

export type SetHandbookPayload = { key: keyof IReduxState['handbooks'], handbook: IReduxState['handbooks'][keyof IReduxState['handbooks']] }
export const handbooks = [
    {name: 'engineTypes', key: 'DICTIONARY_ENGINE_TYPE'},
    {name: 'carBodyTypes', key: 'DICTIONARY_CAR_BODY_TYPE', initLoad: true},
    {name: 'carClass', key: 'DICTIONARY_CAR_CLASS', initLoad: true},
    {name: 'engineLayout', key: "DICTIONARY_ENGINE_LAYOUT", initLoad: true},
    {name: 'adStatus', key: 'DICTIONARY_ADVERTISEMENT_STATUS'},
    {name: 'color', key: 'DICTIONARY_COLOR'},
    {name: 'fuelTypes', key: 'DICTIONARY_FUEL_TYPE'},
    {name: 'ecologicalClass', key: 'DICTIONARY_ECOLOGICAL_CLASS'},
    {name: 'carDrive', key: 'DICTIONARY_CAR_DRIVE', initLoad: true},
    {name: 'transmissionType', key: 'DICTIONARY_TRANSMISSION_TYPE', initLoad: true},
    {name: 'suspensionType', key: 'DICTIONARY_SUSPENSION_TYPE'},
    {name: 'breakType', key: 'DICTIONARY_BREAK_TYPE'},
    {name: 'carTag', key: 'DICTIONARY_CAR_TAG', initLoad: true}
] as const;

export type Handbook = typeof handbooks[number]['name']
type HandbookPayload<T extends string, D extends object> = { [P in T]: P extends keyof D ? D[P][] : IHandbookItem[] }

type CheckHandbookRight<T extends { [P in keyof T]: P extends Handbook ? any : never }> = T


export type ExtraHandbookType = CheckHandbookRight<
    {
        "carBodyTypes": ICarBodyTypeHandbook;
        "color": IColor;
    }
>

export type HandbookOption = {
    name: string;
    key: string;
    initLoad?: boolean;
}