import React, {FC, useState} from "react";
import {AdvertisementCard} from "entities/Advertisement";
import {SortBLock} from "../../SortBlock";
import { useAppNavigate} from "app/services";

import {
    CardType, DataGrid,
   IServerReviewListItem, List,
    Stack,
} from "shared";

import {ChangeAdvertisementType} from "../../ChangeADvertisementType";
import {ReviewCard} from "entities/Review";
import { ReviewManagementPanel} from "../../ManagemenentPanel";
import {useAuthorize} from "entities/User/lib/hooks";


interface IProps {
    data: IServerReviewListItem[] | undefined
    withDifferentReviewCardType?: boolean
    loading: boolean
    fetching?: boolean
    cardType?: Parameters<typeof AdvertisementCard>[0]['type']
    sort?: Omit<Parameters<typeof SortBLock>[0], 'sortKeys'> & { sortKeys?: string[] }
    withReviewManagement?: boolean
}

export const ReviewsList: FC<IProps> = ({
                                            data,
                                            sort,
                                            cardType: defaultCardType,
                                            loading,
                                            fetching,
                                            withDifferentReviewCardType = false,
                                            withReviewManagement = false,
                                        }) => {
    const n = useAppNavigate()
    const list = (data || [])
    const { userId, authStatus: isAuth } = useAuthorize()

    const defaultSortKeys = ['date', 'score']
    const keysForSorting = sort?.sortKeys ?? defaultSortKeys
    const [cardType, setCardType] = useState<CardType>(defaultCardType || 'large')
    const isSmallCard = cardType === 'small'

    const goToReviewPage = (data: IServerReviewListItem) => () => data && n(p => p.reviews._key_(data.review_id))

    return <Stack spacing={4} vAlign={'start'} hAlign={'start'} size={'container'}>
        {(withDifferentReviewCardType || sort) && <Stack direction={'row'} vAlign={'center'} size={'width'}>
            {sort && keysForSorting.length > 0 &&
                <SortBLock currentSortKey={sort!.currentSortKey} sortKeys={keysForSorting} onSort={sort!.onSort}/>}
            {withDifferentReviewCardType && <ChangeAdvertisementType onChange={setCardType} activeType={cardType}/>}
        </Stack>}
        {isSmallCard ?
            <DataGrid loading={loading}
                      renderEl={data => <ReviewCard data={data}
                                            type={'small'}
                                            onClick={goToReviewPage(data)}
                                            loading={loading}/>
                      }
                      data={list}
                      fetching={fetching}
                      cols={3}
                      emptyKey={'review.empty'}
            />
            : <List data={list}
                    fetching={fetching}
                    emptyKey={'review.empty'}
                    loading={loading}
                    renderListEl={(data, loadingStatus: boolean) => <ReviewCard
                        type={'large'}
                        data={data}
                        loading={loadingStatus || false}
                        onClick={goToReviewPage(data)}
                        extra={{
                            managementPanel: data && isAuth && data.owner.id === userId && withReviewManagement
                                ?
                                <ReviewManagementPanel
                                    review_id={data.review_id}
                                />
                                : null
                        }}
                    />

                    }
            />
        }
    </Stack>
}
