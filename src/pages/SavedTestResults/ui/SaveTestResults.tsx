import {FC, useEffect, useState} from "react";
import {useAuthorize} from "entities/User/lib/hooks";
import {
    Button,
    Container,
    getTranslationIndexCreator,
    Label,
    sorter,
    Stack,
    usePaginationAndSorting, useQueryObject, useTabTile
} from "shared";
import {useTranslation} from "react-i18next";
import * as NS from 'features/Test/namespace'
import {SaveResultsCard} from "./SaveResultsCard";
import {useAppNavigate, useAppSelector} from "app/services";
import {SortBLock} from "features/SortBlock";
import {useTestResults} from "features/Test/lib/hooks";
import {selectSavedResultsId} from "features/Test/model/selectors";
import {INIT_TEST_DATA} from "../../Test/lib/constants";
import {AuthMotivation} from "features/Auth";

export const SaveTestResults: FC = () => {
    const {sort, onSort} = usePaginationAndSorting()
    const {t} = useTranslation()
    const getIndex = getTranslationIndexCreator('test.saved_results')
    const [savedResults, setSavedResults] = useState<NS.ISavedTestResult[]>([])
    const {getTestResults, deleteTestResult, clearResults} = useTestResults()
    const { authStatus } = useAuthorize()
    useEffect(() => {
        getTestResults().then(d => setSavedResults(d))
    }, [authStatus])
    const n = useAppNavigate()
    const {getParsedQuery} = useQueryObject(INIT_TEST_DATA, 'test_data')
    const runTestResults = (data: NS.TestPayload) => {
        n(p => p.test, `step=finished&test_data=${getParsedQuery(data)}`)
    }
    const deleteResultItem = async (id: number) => {
        await deleteTestResult(id)
        const ress = await getTestResults()
        setSavedResults(ress)
    }
    const runTest = () => n(p => p.test)

    const sorted = sorter(savedResults, sort, '-')
    const reduxTestResultId = useAppSelector(selectSavedResultsId)
    const resultsList = sorted.filter(res => reduxTestResultId.includes(res.id))
    const getResTitle = (id: number) => `${t(getIndex('res_label'))} №${id}`

    useTabTile(t("pages.saved_results"))

    return <Container max_w={'800px'}>
        <Stack spacing={4} size={'width'} vAlign={'start'}>
            <Stack size={'width'} direction={'row'}>
                <Label label={t(getIndex('label'))}
                       level={1}
                       weight={'medium'}/>
                <Button type={'primary'}
                        onClick={runTest}
                        label={t(getIndex('run_test')) as string}/>
            </Stack>
             <AuthMotivation translationKey={'saved_results'}
                                            fullWidth
                                            withTopMargin={false}/>
            { resultsList.length > 0 && <Stack direction={'row'} vAlign={'center'}>
                <SortBLock sortKeys={['date']}
                           currentSortKey={sort}
                           onSort={onSort}
                />
                <Button type={'secondary'}
                        label={t(getIndex('reset')) as string}
                        onClick={clearResults}
                />
            </Stack> }
            {resultsList.map(res => <SaveResultsCard label={getResTitle(res.id)}
                                                runResults={() => runTestResults(res.results)}
                                                deleteResult={() => deleteResultItem(res.id)}
                                                date={res.date}/>)}
            { resultsList.length === 0 && <Stack size={'width'} hAlign={'center'}>
                <Label label={t(getIndex('empty_list'))} type={'secondary'} weight={'medium'} />
            </Stack>  }
        </Stack>
    </Container>
}