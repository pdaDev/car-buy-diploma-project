import {getRoutePath} from "../lib/helpers";

export const keyParam = '_key_' as const
export const pathParam = '__path__' as const
export const routeTree = {
    init: {
        __path__: ''
    },
    administration: {
      dataOperation: {
          __path__: 'data-operation'
      },
        userManagement: {
          __path__: 'user-management'
        }
    },
    search: null,
    favourites: null,
    compare: null,
    reviews: {
        create: null,
        me: null,
        _key_: {
            __path__: 'id'
        }
    },
    saved_tests: null,
    test: null,
    car: {
        brend: {
            _key_: {
                __path__: 'id'
            }
        },
        model: {
            _key_: {
                __path__: 'id'
            }
        },
        generation: {
            _key_: {
                __path__: 'id'
            }
        },
        technical: null
    },
    garage: null,
    user: {
        _key_: {
            __path__: 'id'
        }
    },
    advertisement: {
        create: null,
        _key_: {
            __path__: 'id'
        }
    },
    chat: {
        _key_: {
            __path__: 'id'
        }
    },
    cabinet: {
        __path__: 'personal-cabinet'
    }
} as const

export const appPathTree = getRoutePath(routeTree, '');




