import {FC, MouseEventHandler} from 'react'

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
    CardType, addPrefix, cn, Button
} from "../../../../shared";
import * as NS from '../../namespace'
import {UserBlock} from "../../../../shared/ui/User/UserBlock/UserBlock";
import s from './Review.module.scss'
import {useTranslation} from "react-i18next";


interface IProps {
    onClick: MouseEventHandler
    data: NS.IServerReviewListItem | null
    loading?: boolean
    type: CardType
}

export const ReviewCard: FC<IProps> = ({
                                           onClick,
                                           data,
                                           type,
                                           loading
                                       }) => {
    const dateOfReview = data ? new Date(data.date).toLocaleDateString() : ''
    const isSmallCard = type === 'small'
    const hasPhotos = true
    const {t} = useTranslation()
    return <div className={cn(s.review_wrapper, addPrefix('type', type, s))}>
        { (hasPhotos || !isSmallCard) && <div className={s.card_image_wrapper}>
            <CardImageViewer photos={data?.photos || []}/>
        </div>}
        <div className={s.content}>
            { isSmallCard ? <>
                <Label level={3} label={data?.title} weight={'medium'}/>
                <Text content={data?.message} />
                <div className={s.score_item} data-loading={loading}>
                    { data?.score }
                </div>
            { !hasPhotos && <Button size={'medium'} width={'full'} type={'primary'} label={t("review.read") as string}/> }
            </> : <>
                <Label level={3} weight={"medium"}  label={data?.title} loading={loading}/>
                <Container size={'container'}>
                    <Text content={data?.message} color={'secondary'}/>
                </Container>
                <Stack size={'width'} direction={"row"} vAlign={'end'}>
                    <UserBlock user={data?.owner || null} loading={loading}/>
                    <Label label={dateOfReview}  level={4} type={'secondary'} loading={loading}/>
                </Stack>
                <div className={s.score_item} data-loading={loading}>
                    { data?.score }
                </div>
            </> }
        </div>
    </div>
}
