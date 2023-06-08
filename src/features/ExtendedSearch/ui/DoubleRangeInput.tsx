import {DoubleInputRange, getTranslationIndexCreator, RangeFilter} from "../../../shared";
import {MinMax} from "../../Test/namespace";
import {FC} from "react";
import {useTranslation} from "react-i18next";

interface IProps {
    onChange: Function
    data: RangeFilter
    translationIndex:  string
    min?: number
    max?: number
}

export const DoubleRangeInputSearch: FC<IProps> = ({ onChange, data, translationIndex, min, max }) => {
    const { t } = useTranslation()
    return <DoubleInputRange
        title={t(`car.props.${translationIndex}.title`) as string}
        min={{
            placeholder: t('search.placeholder.min') as string,
            limit: min,
            currentValue: data.min
        }}
        max={{
            placeholder: t('search.placeholder.max') as string,
            limit: max,
            currentValue: data.max
        }}
        onChange={onChange}
    />
}