import {FC, useState} from "react";
import {Container, TestProgressBar, useQuery, useQueryObject} from "../../../shared";
import {TestQuestionsBlock} from "../../../widgets/TestQuestinsBlock";
import {INIT_TEST_DATA} from "../lib/constants";
import {useSearchParams} from "react-router-dom";
import {TestResult} from "../../../features/Test/ui/TestResult/TestResult";
import * as NS from "../../../features/Test/namespace";
import {getStepElementsFromArray, getStepElementsFromEntities} from "../lib/helpers";
import {DESIRES} from "../../../features/Test/namespace";
import {selectBrends, selectHandbooks, useAppSelector} from "../../../app/services";


export const Test: FC = () => {
    const [queryS, setSearchParams] = useQuery()
    const brends = useAppSelector(selectBrends)
    const {carBodyTypes, engineTypes} = useAppSelector(selectHandbooks)
    const finishTest = () => setSearchParams({step: 'finished'})
    const step = queryS.get('step')
    const isFinished = step === 'finished'
    const {setQuery, query} = useQueryObject(INIT_TEST_DATA, 'test_data')
    const steps: NS.Step[] = [
        {
            weight: 1,
            type: 'self',
            elements: [
                {
                    code: '0-250k',
                    recommendations: {
                        'price': {
                            min: 0,
                            max: 250000
                        }
                    }
                },
                {
                    code: '250k-500k',
                    recommendations: {
                        'price': {
                            min: 250000,
                            max: 500000
                        }
                    }
                },
                {
                    code: '500k-1kk',
                    recommendations: {
                        'price': {
                            min: 500000,
                            max: 1000000
                        }
                    }
                },
                {
                    code: '1kk-2kk',
                    recommendations: {
                        'price': {
                            min: 1000000,
                            max: 2000000
                        }
                    }
                },
                {
                    code: '2kk-3kk',
                    recommendations: {
                        'price': {
                            min: 2000000,
                            max: 3000000
                        }
                    }
                }, {
                    code: '3kk-5kk',
                    recommendations: {
                        'price': {
                            min: 3000000,
                            max: 5000000
                        }
                    }
                }
                , {
                    code: '5kk-10kk',
                    recommendations: {
                        'price': {
                            min: 5000000,
                            max: 10000000
                        }
                    }
                },
                {
                    code: '10kk-',
                    recommendations: {
                        'price': {
                            min: 10000000,
                            max: 1000000000000000
                        }
                    }
                }
            ],
            code: 'money'
        },
        {
            weight: 1,
            type: 'self',
            elements: [{
                code: 'yes',
                recommendations: {
                    price: {
                        min: 0,
                        max: 10000000
                    },
                    car_body_type: ['Sedan', "HATCHBACK"],
                    drive: ['FWD', "AWD"],
                    to_100: {
                        min: 7,
                        max: 20,
                    },
                    desire: ['economic_point']
                },

            },
                {
                    code: 'no',
                    recommendations: {},
                },

            ],
            code: 'isFirstAuto'
        },
        {
            code: 'areasOfUse',
            type: 'self',
            weight: 2,
            elements: [
                {
                    code: 'city',
                    recommendations: {
                        fuel_consumption: {
                            min: 7,
                            max: 14
                        },
                        engine: 'DIESEL',
                        drive: ['FWD', 'AWD'],
                        car_body_type: ['Sedan', 'SUV'],
                        desire: ['comfort_point', 'economic_point', 'safety_point'],
                    },

                },
                {
                    code: 'track',
                    recommendations: {
                        drive: ['FWD', 'RWD' ],
                        car_body_type: ['Sedan', 'HATCHBACK', "Cupe"],
                        to_100: {
                            min: 2,
                            max: 7,
                        },
                        sit_place: {
                            min: 2,
                            max: 5
                        },
                        desire: ['contrallabilty_point'],
                    },

                },
                {
                    code: 'countryside',
                    recommendations: {
                        'clearance': {
                            min: 150,
                            max: 300
                        },
                        car_body_type: ['SUV'],
                        drive: ['4WD', 'AWD'],
                        desire: ['cross_country_point'],
                    },
                },
                {
                    code: 'trassa',
                    recommendations: {
                        fuel_consumption: {
                            min: 5,
                            max: 12
                        },
                        desire: ['comfort_point', 'economic_point', 'safety_point', 'contrallabilty_point'],
                    },

                },

            ],

        },
        {
            code: 'desires',
            weight: 3,
            type: "self",
            elements: getStepElementsFromArray(DESIRES as any, "desire")
        },
        {
            code: 'brends',
            weight: 2,
            type: 'handbooks',
            elements: getStepElementsFromEntities(brends, 'brend_id', 'brend', 'logo')
        },
        {
            code: 'carBodyTypes',
            weight: 2,
            type: 'handbooks',
            elements: getStepElementsFromEntities(carBodyTypes, 'code', 'car_body_type')
        },
        {
            code: 'climat',
            weight: 1,
            type: "self",
            elements: [
                {
                    code: 'warm',
                    recommendations: {
                        car_body_type: ['RODSTER', 'CABRIOLET'],
                        desire: [ 'contrallabilty_point'],
                    },

                },
                {
                    code: 'snow',
                    recommendations: {
                        clearance: {
                            min: 120,
                            max: 300,
                        },
                        car_body_type: ['Sedan', 'SUV'],
                        drive: ['4WD', 'AWD', 'FWD'],
                        desire: ['cross_country_point'],
                    },
                }
            ],
        },

        {
            code: 'engine',
            weight: 4,
            type: 'handbooks',
            elements: getStepElementsFromEntities(engineTypes, 'code', 'engine')
        },
        {
            code: 'goals',
            weight: 2,
            type: "self",
            elements: [
                {
                    code: 'travel',
                    recommendations: {
                        car_body_type: ['Sedan', 'SUV'],
                        drive: ["4WD", "AWD"],
                        fuel_consumption: {
                            min: 6,
                            max: 14
                        },
                        trank_volume: {
                            min: 600,
                            max: 1800
                        },
                        sit_place: {
                            min: 5,
                            max: 7
                        },
                        desire: ['comfort_point', 'contrallabilty_point', 'economic_point', 'safety_point']
                    }

                },
                {
                    code: 'family',
                    recommendations: {
                        trank_volume: {
                            min: 600,
                            max: 1800
                        },
                        sit_place: {
                            min: 7,
                            max: 7
                        },
                        car_body_type: ['SUV', 'UNIVERSAL'],
                        desire: ['comfort_point', 'economic_point', 'safety_point'],

                    },
                },
                {
                    code: 'fishing',
                    recommendations: {
                        'clearance': {
                            min: 180,
                            max: 300
                        },
                        car_body_type: ['SUV'],
                        trank_volume: {
                            min: 600,
                            max: 1800
                        },
                        drive: ['4WD', 'AWD'],
                        desire: ['cross_country_point'],
                    },
                },

                {
                    code: 'shipping',
                    recommendations: {
                        'clearance': {
                            min: 100,
                            max: 300
                        },
                        car_body_type: ['SUV', 'UNIVERSAL', 'PICKUP'],
                        trank_volume: {
                            min: 600,
                            max: 200
                        },
                        engine: 'DIESEL',
                        drive: ['4WD', 'AWD'],
                        desire: ['cross_country_point', 'contrallabilty_point'],
                    },
                },
                {
                    code: 'work',
                    recommendations: {
                        car_body_type: ['SUV', 'Sedan', 'HATCHBACK', "UNIVERSAL"],
                        engine: 'DIESEL',
                        drive: ['FWD', 'AWD'],
                        desire: ['comfort_point', 'economic_point'],
                    },
                }
            ]
        }
    ]

    console.log(query)
    return <Container contentAlign={'top-left'}>
        {!isFinished
            ? <TestQuestionsBlock onFinish={finishTest}
                                  data={query}
                                  steps={steps}
                                  setData={setQuery}
            />
            : <TestResult data={query}
                          steps={steps}


            />
        }

    </Container>
}