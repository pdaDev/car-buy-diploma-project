import {FC} from 'react'
import {Container, Label, Sorter, Stack} from "../../../shared";
import {useTranslation} from "react-i18next";
interface IProps {
    sortKeys: string[]
    currentSortKey: string | null
    onSort: (sort: string | null) => void
}

export const SortBLock: FC<IProps> = ({ sortKeys, currentSortKey, onSort }) => {
    const { t } = useTranslation()
    return <Container size={'content'} pr={3} pl={3} mt={4} mb={2}>
        <Stack direction={'row'} spacing={4} hAlign={'start'} wrap vAlign={'center'}>
            <Label label={t("sort.label") as string} level={3} weight={'semi-bold'} />
            { sortKeys.map(sortKey => <Sorter sort={sortKey}
                                              currentSort={currentSortKey}
                                              label={t(`sort.${sortKey}`)}
                                              onChange={onSort}
            />) }
        </Stack>
    </Container>
}
