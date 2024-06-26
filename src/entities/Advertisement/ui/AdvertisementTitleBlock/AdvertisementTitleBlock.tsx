import React, {FC, ReactNode} from 'react'

import s from './AdvertisementTitleBlock.module.scss'
import * as NS from '../../namespace'
import {
    formatPrice,
    FormMode,
    getCarNameFromModelWithId,
    Label,
    NumberInput
} from "shared";



interface IProps {
    startDate: string | undefined
    car: NS.IServerAdvertisement['name'] | undefined
    price: NS.IServerAdvertisement['price'] | undefined
    favouriteButton?: ReactNode | null
    loading: boolean
    mode: FormMode
    onChange: (data: any) => void
    editData: any
}

export const AdvertisementTitleBlock: FC<IProps> = ({
                                                        car,
                                                        startDate,
                                                        price,
                                                        favouriteButton,
                                                        loading,
                                                        mode,
                                                        onChange,
                                                        editData
                                                    }) => {

    const carName = car ? getCarNameFromModelWithId(car) : null

    const date = startDate ? new Date(startDate).toLocaleDateString() : null

    const loadingStatus = loading ?? (!price || !startDate || !car)
    const isEditMode = mode === 'edit'
    const onPriceChange = (value: string | number) => {
        onChange({price: value})
    }

    return <div className={s.title_block_wrapper} >
        <div className={s.name_wrapper}>
            <Label label={carName} loading={loading}
                   loadingWidth={200}
                   weight={'regular'} level={2}/>
            <Label label={date} loading={loading}
                   loadingWidth={180}
                   level={4} type={'secondary'}/>
        </div>
        {isEditMode ? <NumberInput
                             value={editData?.price ?? (price?.latest || 0) }
                             onChange={onPriceChange}/> :
            <Label label={formatPrice(price?.latest || 0)}
                   loading={loading} weight={'medium'}
                   loadingWidth={200}
                   level={2} size={6} />}
        {
            favouriteButton && !loading && <div className={s.fav_button_wrapper}>
                { favouriteButton }
            </div>
        }
    </div>
}
