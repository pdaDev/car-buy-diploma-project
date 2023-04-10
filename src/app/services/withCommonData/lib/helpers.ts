import * as NS from "../namespace";
import {HandbookOption} from "../namespace";

export const getInitHandbooks = (handbooks: HandbookOption[]) => {
    return handbooks.reduce<NS.IReduxState['handbooks']>((acc, handbook ) => {
        // @ts-ignore
        acc[handbook.name] = []
        return acc
    }, {} as any)
}
