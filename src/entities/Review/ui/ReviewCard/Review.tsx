import {FC, MouseEventHandler, ReactNode} from 'react'

import {
    Box,
    CardImageViewer,
    Container,
    Label,
    Stack,
    Text,
    Symbol,
    UserAvatar,
    UserNickname,
    CardType, addPrefix, cn, Button, IServerReviewListItem
} from "../../../../shared";
import * as NS from '../../namespace'
import {UserBlock} from "../../../../shared/ui/User/UserBlock/UserBlock";
import s from './Review.module.scss'
import {useTranslation} from "react-i18next";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;




interface IProps {
    onClick: MouseEventHandler
    data: IServerReviewListItem | null
    loading?: boolean
    type: CardType
    extra?: {
        managementPanel?: ReactNode
    }
}

export const ReviewCard: FC<IProps> = ({
                                           onClick,
                                           data,
                                           type,
                                           loading,
                                           extra
                                       }) => {
    const dateOfReview = data ? new Date(data.date).toLocaleDateString() : ''
    const isSmallCard = type === 'small'
    const hasPhotos = data ? data?.photos.length > 0 : true
    const {t} = useTranslation()
    console.log(loading)

    return <div className={cn(s.review_wrapper, addPrefix('type', type, s))} onClick={onClick}>
        {(hasPhotos || !isSmallCard) && <div className={s.card_image_wrapper}>
            <CardImageViewer photos={data?.photos || []} loading={loading}/>
        </div>}
        <div className={cn(s.content, !hasPhotos && isSmallCard && s.with_top_padding)}>
            {isSmallCard ? <Stack size={'container'}>
                <Stack spacing={3} size={'content'} vAlign={'start'}>
                    <Label level={2}
                           label={data?.title}
                           weight={'medium'}
                           loading={loading}/>
                    <Text content={data?.message}
                          loading={loading}
                          color={'grey-1'}
                    />
                </Stack>

                {!loading && <div className={s.score_item}>
                    {data?.score}
                </div>}
                {!hasPhotos && <Container size={'content'}>
                    <Button size={'medium'} width={'full'} type={'primary'} label={t("review.read") as string}/>
                </Container>}
            </Stack> : <Stack spacing={3} size={'container'}>
                <Label level={3} weight={"medium"} label={data?.title} loading={loading}/>
                <Container size={'container'}>
                    <Text content={data?.message} color={'grey-1'}/>
                </Container>
                <Stack size={'width'} direction={"row"} vAlign={'end'}>
                    <UserBlock user={data?.owner || null} loading={loading} />
                    <Label label={dateOfReview} level={4} type={'secondary'} loading={loading} />
                </Stack>
                {
                    !loading && <div className={s.score_item} >
                        {data?.score}
                    </div>
                }
                {!loading && extra && extra.managementPanel && <div className={s.management_panel}>
                    {extra.managementPanel}
                </div>}
            </Stack>}
        </div>
    </div>
}
