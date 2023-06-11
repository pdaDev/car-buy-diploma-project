import {FC, useState} from "react";
import {
    Button,
    Card, Clickable, Container,
    getTranslationIndexCreator, IBrend,
    Input, Paginator,
    sorter,
    Stack,
    usePaginationAndSorting
} from "shared";
import * as NS from '../../../namespace'
import {useDeleteEntity} from "../../../lib/hooks";
import {apiRoutes} from "../../../lib/constants";
import {useGetBrendsQuery} from "../../../api";
import {EntitiesListItem} from "../EnititiesListItem";
import {CommonListForm} from "../../CommonListForm";

interface IProps {
    selectBrend: Function
    openBrendForm: (v: NS.FormType) => void
}

// export const BrendsList: FC<IProps> = ({
//                                            selectBrend,
//                                            openBrendForm
//                                        }) => {
//     const brends = useAppSelector(selectBrends) || []
//     const {sort, onSort, page, limit, setPage} = usePaginationAndSorting()
//     const [query, setQuery] = useState<null | string>(null)
//     const {t} = useTranslation()
//     const sortedBrends = sorter(brends, sort, '-')
//     const filteredBrends = sortedBrends.filter(b => new RegExp(query || '').test(b.name))
//     const countOfPages = Math.ceil(filteredBrends.length / limit)
//     const paginatedBrends = filteredBrends.filter((_, i) => i >= page * limit && i < (page + 1) * limit)
//     const getIndex = getTranslationIndexCreator('admin.data_management.cars.brends_list')
//     const deleteBrend = useDeleteEntity(apiRoutes.brend)
//
//     return <>
//         <Card paddings={3} shadow={3}>
//             <Stack direction={'row'} spacing={3} size={'width'} vAlign={'center'}>
//                 <Icon path={mdiMagnify} size={1.5}/>
//                 <Input value={query || ''}
//                        placeholder={t(getIndex('search_placeholder')) as string}
//                        onChange={setQuery as any}
//                 />
//                 <Button type={'primary'}
//                         onClick={() => setQuery(null)}
//                         label={t('form.decline') as string}
//                 />
//             </Stack>
//         </Card>
//         <SortBLock sortKeys={['name']} currentSortKey={sort} onSort={onSort}/>
//         <Card paddings={4} shadow={3}>
//             <Stack size={'width'} spacing={4} vAlign={'start'}>
//                 <EntitiesList data={paginatedBrends}
//                               deleteEntity={(d) => deleteBrend(d.brend_id)}
//                               openEntityForm={openBrendForm}
//                               translationIndex={'brend'}
//                               onSelect={selectBrend}
//                 />
//             </Stack>
//         </Card>
//         <Container contentAlign={'center'}>
//             <Clickable onClick={() => openBrendForm('create')} color={'primary'}>
//                 <Icon path={mdiPlusCircle} size={2}/>
//             </Clickable>
//         </Container>
//         {
//             countOfPages > 1 &&  <Paginator page={page}
//                                             setPage={setPage}
//                                             count={countOfPages}
//             />
//         }
//     </>
// }

export const BrendsList: FC<IProps> = ({ openBrendForm, selectBrend }) => {
    const deleteBrend = useDeleteEntity(apiRoutes.brend)
    return <CommonListForm translationKey={'admin.data_management.cars.brend'}
                           openCreateForm={() => openBrendForm('create')}
                           useGetQuery={useGetBrendsQuery}
                           renderListItem={(data: IBrend, loading, i, isLastElement) => data &&
                               <EntitiesListItem
                                   openEntityForm={openBrendForm}
                                   deleteEntity={() => deleteBrend(data.brend_id)}
                                   onSelect={selectBrend}
                                   entity={data}
                                   isLastElement={isLastElement}/>
                           }
    />
}