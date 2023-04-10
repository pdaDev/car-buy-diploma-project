import * as NS from '../namespace'

const getPropTranslatedData = (key: NS.CarProps): Omit<NS.ICarPropDescription, 'image'> => {
    const root = `car.props.${key}.`
    return {
        title: root + 'title',
        message: root + 'message'
    }
}

export const CAR_PROP_DESCRIPTION: Partial<Record<NS.CarProps, NS.ICarPropDescription>> = {
    clearance: getPropTranslatedData('clearance'),
    drive_type: getPropTranslatedData('drive_type')
}

