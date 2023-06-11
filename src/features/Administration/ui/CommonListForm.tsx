import {FC, ReactNode} from "react";
import {
    Box,
    Button,
    Card, Clickable, ColoredIcon,
    Container,
    getTranslationIndexCreator,
    Input,
    Label,
    List,
    Paginator,
    Stack, Symbol,
    usePaginationAndSorting
} from "shared";
import {useTranslation} from "react-i18next";
import {SortBLock} from "../../SortBlock";
import {useSearchQuery} from "../lib/hooks";
import Icon from "@mdi/react";
import {mdiMagnify, mdiPlusCircle} from "@mdi/js/commonjs/mdi";


interface IProps {
    translationKey: string
    sortKeys?: string[]
    useGetQuery: Function
    renderListItem: (data: any | null, loading: boolean, index: number, isLastElement: boolean) => ReactNode
    extra?: object
    searchOptions?: ReactNode
    withListCardWrapper?: boolean
    withQuery?: boolean
    withControls?: boolean
    openCreateForm?: Function
}

export const CommonListForm: FC<IProps> = (
    {
        translationKey,
        withControls = true,
        withListCardWrapper = true,
        withQuery = true,
        searchOptions,
        sortKeys,
        useGetQuery,
        renderListItem,
        openCreateForm,
        extra
    }) => {
    const extraParams = extra || {}
    const {limit, page, setPage, sort, onSort} = usePaginationAndSorting({limit: 10})
    const {query, searchQuery, setQuery, resetQuery} = useSearchQuery()
    const {data, isLoading} = useGetQuery({limit, offset: page, sort, query: searchQuery, ...extraParams})
    const getIndex = getTranslationIndexCreator(translationKey)
    const {t} = useTranslation()
    const pageCount = Math.ceil((data?.count || 0) / limit)

    return <Container max_w={'1000px'}>
        <Stack spacing={4} size={'container'} vAlign={'start'}>
            <Stack direction={'row'}  hAlign={'start'} spacing={4}>
                <Label label={`Всего:`} level={3} weight={'medium'}/>
                <Box background={'secondary'} figure={'circle'} w={'30px'} h={'30px'}>
                   <Container contentAlign={'center'}>
                       <Symbol content={data?.count} color={'primary'} weight={'medium'} size={4} />
                   </Container>
                </Box>
            </Stack>
            {withControls && <Card paddings={3} shadow={3}>
                <Stack spacing={4} size={'container'}>
                    {searchOptions}
                    {withQuery && <Stack direction={'row'} spacing={3} size={'width'} vAlign={'center'}>
                        <ColoredIcon color={'grey-1'}>
                            <Icon path={mdiMagnify} size={1.5}/>
                        </ColoredIcon>
                        <Input value={query || ''}
                               placeholder={t(getIndex('search_placeholder')) as string}
                               onChange={setQuery as any}
                        />
                        <Button type={'primary'}
                                onClick={resetQuery}
                                label={t('form.decline') as string}
                        />
                    </Stack>}
                </Stack>
            </Card>}


            {
                sortKeys && <SortBLock sortKeys={sortKeys}
                                       currentSortKey={sort}
                                       onSort={onSort}
                />
            }
            {
                withListCardWrapper ? <Card paddings={4} shadow={3}>
                    <List fetching={isLoading}
                          loading={false}
                          countOfLoadingEls={limit}
                          renderListEl={renderListItem}
                          data={data?.results}
                          emptyKey={getIndex('empty')}/>
                </Card> : <List loading={false}
                                fetching={isLoading}
                                countOfLoadingEls={limit}
                                renderListEl={renderListItem}
                                data={data?.results}
                                emptyKey={getIndex('empty')}/>
            }
            {openCreateForm && <Container contentAlign={'center'}>
                <Clickable onClick={openCreateForm} color={'primary'}>
                    <Icon path={mdiPlusCircle} size={2}/>
                </Clickable>
            </Container>}
            {
                pageCount > 1 && <Paginator
                    count={pageCount}
                    page={page}
                    setPage={setPage}/>
            }
        </Stack>
    </Container>
}
