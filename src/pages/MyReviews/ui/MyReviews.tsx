import React, {FC, useEffect, useState} from "react";
import {
    Button,
    Container,
    IServerReviewListItem,
    Label, sorter, sortList, Stack, useNavigationPermission,
    useTabTile
} from "../../../shared";
import {useTranslation} from "react-i18next";
import {SortBLock} from "../../../features/SortBlock";
import {selectHandbook, useAppDispatch, useAppNavigate, useAppSelector} from "../../../app/services";
import {selectors} from "../../../entities/User";
import {openModal} from "../../../app/services/withPopupProvider";
import {useGetMyAdsQuery} from "../../../entities/Advertisement";
import {MotivationBlock} from "../../../shared/ui/MotivationBlock/MotivationBlock";
import {IAdvertisementListItem} from "../../../entities/Advertisement/namespace";
import {useGetMyReviewsQuery} from "../../../entities/Review";

import {ReviewsList} from "../../../features/ReviewsList";
import {useAuthorize} from "../../../entities/User/lib/hooks";
import {AuthMotivation} from "../../../features/Auth";


export const MyReviews: FC = () => {
    const authStatus = useAppSelector(selectors.selectAuthStatus)
    const {t} = useTranslation()
    const label = t("pages.my_reviews")
    useTabTile(label as string)
    const [sort, setSort] = useState<string | null>(null)


    const {isLoading, data, refetch} = useGetMyReviewsQuery()
    useEffect(() => {
        refetch()
    }, [authStatus, refetch, sort])

    const n = useAppNavigate()
    const createReview = () => n(p => p.reviews.create)
    let reviews = data || []

    if (!isLoading && reviews.length === 0) {
        return <MotivationBlock handleAction={createReview}
                                buttonLabel={t("motivate.my_reviews.create.button") as string}
                                message={t("motivate.my_reviews.create.message") as string}
        />
    }

    reviews = sorter(reviews, sort, '-')
    return <AuthMotivation translationKey={'my_reviews'}>
        <Container max_w={'800px'}>
            <Stack spacing={3} hAlign={'start'} vAlign={'start'} size={'content'}>
                <Stack direction={'row'} size={'width'} vAlign={'center'}>
                    <Label label={label} level={1} weight={'medium'}/>
                    <Button label={t("motivate.my_reviews.create.button") as string}
                            type={'primary'}
                            onClick={createReview}
                    />

                </Stack>
                <ReviewsList data={reviews}
                             withReviewManagement
                             loading={isLoading}
                             sort={{
                                 onSort: setSort,
                                 currentSortKey: sort
                             }}
                />
            </Stack>
        </Container>
    </AuthMotivation>
}