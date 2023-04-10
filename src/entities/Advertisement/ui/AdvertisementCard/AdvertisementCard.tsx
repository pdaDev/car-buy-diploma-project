import {FC, MouseEventHandler, ReactNode} from "react";

import * as NS from '../../namespace'
import s from './AdvertisementCard.module.scss'
import {addPrefix, Card, CardImageViewer, cn, Container, formatPrice, Label, Stack} from "../../../../shared";

interface IProps {
    data: NS.IAdvertisementCardData | null
    onClick: Function;
    type: 'large' | 'small'
    loading?: boolean;
    extra?: {
        favoriteButton?: ReactNode
        managementPanel?: ReactNode
    }
}

export const AdvertisementCard: FC<IProps> = ({
                                                  data,
                                                  loading: loadingStatus,
                                                  onClick,
                                                  type,
                                                  extra
                                              }) => {

    const loading = !data || loadingStatus

    return <div className={cn(s.advertisement, addPrefix('type', type, s))}
                tabIndex={0}
                onClick={onClick as MouseEventHandler}>
        {type === 'large' ? <>
                <div className={cn(s.image_wrapper, s.type_large)}>
                    <CardImageViewer photos={data?.photos || []} loading={loading}/>
                </div>
                <div className={s.data_wrapper}>
                    <Stack spacing={1}>
                        <Label label={data?.name} level={2} weight={'medium'} loading={loading} loadingWidth={180}/>
                        {/*<Label label={data?.equipment} weight={'medium'} level={4} type={'secondary'}/>*/}
                    </Stack>
                    {!loading && <Stack spacing={2}>
                        <Label label={data?.engine} level={4}/>
                        <Label label={data?.transmission} level={4}/>
                        <Label label={data?.drive} level={4}/>
                        <Label label={data?.carBodyType} level={4}/>
                    </Stack>}
                </div>
                <div className={s.extra_data_wrapper}>
                    <Label label={data?.yearOfProduction} level={3} loading={loading} weight={'semi-bold'}/>
                    <div className={s.price_wrapper} data-loading={loading}>
                        <Label label={formatPrice(data?.price || 0)} level={3} weight={'medium'}/>
                    </div>
                    <Label label={data?.mileage} loading={loading} level={3} weight={"regular"}/>
                    <Stack direction={'row'} vAlign={'center'} size={'container'} spacing={4}>
                        <Label label={data?.startDate} weight={'regular'} level={4}/>
                    </Stack>
                </div>

                {!loading && extra && extra.managementPanel && <div className={s.management_panel}>
                    {extra.managementPanel}
                </div>}
            </>
            : <>
                <div className={cn(s.image_wrapper, s.type_small)}>
                    <CardImageViewer photos={data?.photos || []} loading={loading}/>
                </div>
                <div className={s.content_wrapper}>
                    <Label label={data?.name}
                           align={'center'}
                           level={3}
                           weight={'medium'}
                           size={4}
                           width={'100%'}
                           loading={loading}
                           loadingWidth={180}
                    />
                    <Stack direction={'row'} size={'container'}>
                        <Label level={4} label={data?.yearOfProduction} type={'secondary'}/>
                        <Label level={4} label={data?.mileage} type={'secondary'}/>
                    </Stack>
                    <div className={cn(s.price_wrapper, s.small_card)} data-loading={loading}>
                        <Label label={formatPrice(data?.price || 0)} level={3} weight={'medium'}/>
                    </div>
                </div>

            </>
        }
        {!loading && extra && extra.favoriteButton && <div className={cn(s.favourite_button, addPrefix('type', type, s))}>
            {extra.favoriteButton}
        </div>}
    </div>
}