import {getRoutePath} from "../lib/helpers";

export const keyParam = '_key_' as const
export const pathParam = '__path__' as const
export const routeTree = {
    init: {
        __path__: ''
    },
    search: null,
    favourites: null,
    reviews: {
        _key_: {
            __path__: 'id'
        }
    },
    model: {
        _key_: {
            __path__: 'id',
        },
        concrete: null
    },
    garage: null,
    user: {
        _key_: {
            __path__: 'id'
        }
    },
    advertisement: {
        _key_: {
            __path__: 'id'
        }
    },
    cabinet: {
        __path__: 'personal-cabinet'
    }
} as const

export const appPathTree = getRoutePath(routeTree, '');




