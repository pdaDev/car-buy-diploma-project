import {FC} from "react";
import {useAppNavigate, useAppSelector} from "../../../../app/services";
import {Button} from "../../../../shared";
import {useTranslation} from "react-i18next";
import {selectors} from '../../model'

export const CompareButton: FC = () => {
    const n = useAppNavigate()
    const goToCompare = () => {
        n(p => p.compare, { type: 'ad' })
    }
    const { t } = useTranslation()
    const count = useAppSelector(selectors.selectCompareItemsCount)
    const label = t("compare.title") as string + (count > 0 ?  " · " + count : '')

    return <Button type={'secondary'}
                   onClick={goToCompare}
                   label={label}
    />
}