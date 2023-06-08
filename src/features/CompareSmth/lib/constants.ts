import * as NS from '../namespace'

export const characteristicsForCompare: NS.ICarCompareProp[] = [
    {
        weight: 2,
        key: 'horse_power',
        operation: 'dispersed_max',
    },
    {
        weight: 3,
        key: 'fuel_consumption',
        operation: 'dispersed_min',
    },
    {
        weight: 5,
        key: 'mileage',
        operation: 'ranges',
        compareConfig: [
            {
                min: 0,
                max: 10000,
                mark: 100
            },
            {
                min: 10000,
                max: 20000,
                mark: 90
            },
            {
                min: 20000,
                max: 40000,
                mark: 80
            },
            {
                min: 40000,
                max: 60000,
                mark: 65
            },
            {
                min: 60000,
                max: 90000,
                mark: 50
            },
            {
                min: 90000,
                max: 110000,
                mark: 40
            },
            {
                min: 110000,
                max: 150000,
                mark: 20
            },
            {
                min: 150000,
                max: 1000000,
                mark: 5
            }
        ]
    },
    {
        key: 'ecological_class',
        weight: 1,
        operation: 'points',
        accessor: (data) => data.code,
        compareConfig: [
            {
                value: 'EURO5',
                mark: 100
            },
            {
                value: 'EURO4',
                mark: 80
            }, {
                value: 'EURO3',
                mark: 60
            }, {
                value: 'EURO2',
                mark: 40
            }, {
                value: 'EURO1',
                mark: 20
            },
            {
                value: 'EURO0',
                mark: 0
            }
        ]
    },
    {
        key: 'fuel_type_code',
        weight: 1,
        operation: 'points',
        accessor: (data) => data.code,
        compareConfig: [
            {
                value: 'AI-100',
                mark: 100
            },
            {
                value: 'DIESEL',
                mark: 100
            }, {
                value: 'AI-98',
                mark: 80
            }, {
                value: 'AI-95',
                mark: 65
            }, {
                value: 'AI-92',
                mark: 40
            },
        ]
    },
    {
        key: 'front_breaks',
        weight: 3,
        operation: "points",
        accessor: (data) => data.code,
        compareConfig: [
            {
                value: 'DRUM',
                mark: 20
            },
            {
                value: 'DISCCARBON',
                mark: 100
            }, {
                value: 'DISK',
                mark: 85
            }
        ]
    },
    {
        key: 'drive_type',
        weight: 2,
        operation: "points",
        accessor: (data) => data.code,
        compareConfig: [
            {
                value: 'AWD',
                mark: 90
            },
            {
                value: 'FWD',
                mark: 90
            },
            {
                value: '4WD',
                mark: 100
            },
            {
                value: 'RWD',
                mark: 90
            },
        ]
    }, {
        weight: 1,
        key: 'acceleration',
        operation: 'dispersed_min',
    },
    {
        key: 'type',
        weight: 2,
        operation: "points",
        accessor: (data) => data.code,
        compareConfig: [
            {
                value: 'AUTO',
                mark: 85
            },
            {
                value: 'MECHANIC',
                mark: 80
            },
            {
                value: 'ROBOT',
                mark: 92
            },
            {
                value: 'VARIATOR',
                mark: 82
            },
        ]
    },
    {
        key: 'price',
        weight: 5,
        operation: (key, data, compareConfig, accessor) => {
            return data.map(v => {
                // @ts-ignore
                const dispersion =( v.price - v.average_price) / v.average_price * 100
                if (dispersion < 0) {
                    return 100
                }
                if (dispersion > 0 && dispersion < 10) {
                    return 95
                }
                if (dispersion > 10 && dispersion < 25) {
                    return 85
                }
                if (dispersion > 25 && dispersion < 50) {
                    return 70
                }
                if (dispersion > 50 && dispersion < 100) {
                    return 40
                }
                return 90

            })
        }
    },
    {
        key: "date_of_production",
        weight: 4,
        operation: (key, data) => {
            return data.map(v => {
                const currentYear = new Date().getFullYear()
                // @ts-ignore
                const dispersion = currentYear - v.date_of_production
                if (dispersion <= 1) {
                    return 100
                }
                if (dispersion > 0 && dispersion < 3) {
                    return 95
                }
                if (dispersion > 3 && dispersion < 5) {
                    return 80
                }
                if (dispersion > 6 && dispersion < 10) {
                    return 60
                }
                if (dispersion > 10 && dispersion < 15) {
                    return 40
                }
                if (dispersion > 15) {
                    return 10
                }
                return 100
            })
        }
    },
    {
        key: 'boost_type_code',
        weight: 1,
        operation: "points",
        accessor: (data) => data.code,
        compareConfig: [
            {
                value: 'TWINTURBO',
                mark: 95
            },
            {
                value: 'KOMPRESSOR',
                mark: 88
            }, {
                value: 'TURBO',
                mark: 90
            },
            {
                value: 'NONE',
                mark: 60
            }
        ]
    },
    {
        key: "in_taxi",
        weight: 3,
        operation: (key, data) => {
            return data.map(v => {
                // @ts-ignore
                if (Boolean(v['in_taxi'])) {
                    return 0
                }
                return 100
            })
        }
    },
    {
        weight: 1,
        key: 'torgue',
        operation: "dispersed_max"
    },

    {
        key: 'rate',
        weight: 3,
        operation: "ranges",
        compareConfig: [
            {
                min: 0,
                max: 1,
                mark: 10
            },
            {
                min: 1,
                max: 2,
                mark: 30
            },
            {
                min: 2,
                max: 3,
                mark: 50
            },{
                min: 3,
                max: 4,
                mark: 70
            },
            {
                min: 4,
                max: 5,
                mark: 90
            },
            {
                min: 5,
                max: 5,
                mark: 100
            }
        ]
    }
]