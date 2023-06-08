import {FC, useEffect, useState} from "react";
import {handbooks} from "../../../../app/services/withCommonData/namespace";
import * as NS from '../../namespace'
import {
    useCreateHandbookItemMutation,
    useDeleteHandbookItemMutation,
    useGetHandbookItemsQuery,
    useUpdateHandbookItemMutation
} from "../../api";
import {
    Button, Checkbox, checkContainsString, ColorMark, Container,
    Details, FormMode, getObjectKeys,
    getTranslationIndexCreator, Input,
    Label,
    Loader, Separator, sorter,
    Stack,
    Table,
    useMultiLanguageHandbooks, usePaginationAndSorting
} from "../../../../shared";
import {getHandbookEmptyItem} from "../../lib/helpers";
import {useTranslation} from "react-i18next";
import {useAppDispatch} from "../../../../app/services";
import {openModal} from "../../../../app/services/withPopupProvider";
import {HandbookForm} from "./HandbookForm";
import {SortBLock} from "../../../SortBlock";
 import {FormType} from "../../namespace";
 import {addSystemNotification} from "../../../../entities/Notification";


interface IProps {
    code: typeof handbooks[number]['key']
}

export const HandbooksAdminForm: FC<IProps> = ({code}) => {
    const {data: handbooksItems, isLoading} = useGetHandbookItemsQuery(code)
    const [deleteHandbook, { isError: isDeleteError }] = useDeleteHandbookItemMutation()
    const [updateHandbook, { isLoading: updateLoading, isError: isUpdateError }] = useUpdateHandbookItemMutation()
    const [create, { isLoading: createLoading, isError: isCreateError }] = useCreateHandbookItemMutation()
    const [selectedHandbookItem, selectHandbookItem] = useState<string | null>(null)
    const [viewMode, setViewMode] = useState<FormMode>('view')
    const [filterByNullEngName, setFilterEngName] = useState(false)
    const [filterByNullEngDescription, setFilterEngDescription] = useState(false)
    const [query, setQuery] = useState('')
    const { sort, onSort } = usePaginationAndSorting()

    const setVIEWmode = () => {
        setViewMode('view')
        selectHandbookItem(null)
    }
    const deleteHandbookItem = (handbookCode: string) => {
        d(openModal({
            key: 'confirm', payload: {
                index: 'handbook',
                onConfirm: async () => await deleteHandbook({key: code, code: handbookCode}).then(() => !isDeleteError && setVIEWmode)
            }
        }))
    }

    const createHandbookItem = async (data: NS.HandbookResponse) => {
        await create({...data, key: code }).then(() => {
            if (!isCreateError) {
                setViewMode('view')
                selectHandbookItem(data.code)
                d(addSystemNotification({type: 'success', message: t('form.success') as string}))
            }

        })
    }

    const updateHandbookItem = async (data: NS.HandbookResponse) => {
       await updateHandbook({ ...data, key: code, initCode: selectedHandbookItem! }).then(() => {
           if (!isUpdateError) {
               d(addSystemNotification({type: 'success', message: t('form.success') as string}))
               setViewMode('view')
           }
       })
    }


    const {t, i18n: {language}} = useTranslation()
    const isRussian = language === 'ru'
    const {getHandbookItemName} = useMultiLanguageHandbooks()
    let list = handbooksItems?.data || []
    list = filterByNullEngName ? list.filter(h => h.eng_name === null) : list
    list = filterByNullEngDescription ? list.filter(h => h.eng_description === null) : list

    list = query ? list.filter(h => checkContainsString(h.code, query) || checkContainsString(h.ru_name, query) ||(h.eng_name ? checkContainsString(h.eng_name, query) : false)) : list



    const EMPTY_HANDBOOK = getHandbookEmptyItem(code)
    const getIndex = getTranslationIndexCreator('admin.data_management.handbooks')
    const d = useAppDispatch()

    useEffect(() => {
        setVIEWmode()
    }, [code])

    if (isLoading) {
        return <Loader type={'circle'} size={'medium'}/>
    }

    const isCreateMode = viewMode === 'create'



    if (['create', 'edit'].includes(viewMode)) {
        return <HandbookForm initHandbook={isCreateMode ? EMPTY_HANDBOOK : list.find(h => h.code === selectedHandbookItem)!}
                             onSubmit={isCreateMode ? createHandbookItem : updateHandbookItem}
                             loading={createLoading || updateLoading}
                             type={viewMode as FormType}
                             decline={() => {
                                 setViewMode('view')
                                 selectHandbookItem(null)
                             }}
        />
    }

    list = sort  ? sorter(list, sort, '-') : list

    return <Stack spacing={4}
                  size={'container'}
                  vAlign={'start'}>
        {/*{selectedHandbookItem ? <>*/}
        {/*        <Label label={}/>*/}
        {/*        <Label label={}/>*/}
        {/*        <Label label={}/>*/}
        {/*        <Label label={}/>*/}
        {/*    </>*/}
        {/*    : <Table data={handbooksItems || []} columns={[*/}
        {/*        {id: 'code', accessor: d => d.code, header: 'code'}*/}
        {/*    ]}/>*/}
        <Button type={'primary'} label={'создать'} onClick={() => setViewMode('create')}/>
        <Checkbox title={'показать только элементы с пустыми английскими названиями'}
                  checked={filterByNullEngName}
                  onChange={setFilterEngName}/>
        <Checkbox title={'показать только элементы с пустыми английскими описаниями'}
                  checked={filterByNullEngDescription}
                  onChange={setFilterEngDescription}/>
        <Input value={query} onChange={setQuery as any} placeholder={'Введите код, русское название, английское название'}/>
        <SortBLock sortKeys={['ru_name', 'eng_name']}
                   currentSortKey={sort}
                   onSort={onSort} />

        {list.map(h => <Details labelElement={<Stack direction={'row'} size={'width'} vAlign={'center'}>
            <Label  label={getHandbookItemName(h)} weight={'medium'} size={4} />
                { // @ts-ignore
                    code === 'DICTIONARY_COLOR' && <ColorMark name={h['color']} color={h['color']}/> }
        </Stack>}>
               <Container pt={4}>
                   <Stack spacing={4} size={'container'}>
                       <Stack direction={'row'} spacing={4} hAlign={'end'}>
                           <Button type={'primary'} label={'редактировать'} onClick={() => {
                               setViewMode('edit')
                               selectHandbookItem(h.code)
                           }}/>
                           <Button type={'primary'}
                                   label={'удалить'}
                                   onClick={() => deleteHandbookItem(h.code)}

                           />
                       </Stack>
                       <Label label={getHandbookItemName(h)} weight={'medium'} level={2}/>
                       {getObjectKeys(EMPTY_HANDBOOK)
                           .filter(key => isRussian ? key !== 'ru_name' : key !== 'eng_name')
                           .map(key => <Stack spacing={3}>
                               <Label label={t(getIndex(key))} level={4} type={'secondary'} weight={'regular'}/>
                               <Stack direction={'row'} spacing={4} hAlign={'start'} vAlign={'center'}>
                                   <Label label={h[key as keyof typeof h] || 'отсутствует'} level={3} weight={'medium'}/>
                                   { /** @ts-ignore*/ }
                                   { key === 'color' && <ColorMark name={h[key]} color={h[key]}/> }
                               </Stack>
                               <Separator thickness={"thin"}/>
                           </Stack>)}
                   </Stack>
               </Container>
            </Details>
        )}
    </Stack>
}