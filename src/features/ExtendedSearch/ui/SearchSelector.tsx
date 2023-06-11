import {FC} from "react";
import {useTranslation} from "react-i18next";
import {IOption, Selector} from "shared";

interface IProps {
    options: IOption[]
    current: any
    onChange: Function
    translationIndex: string
}

export const SearchSelector: FC<IProps> = ({onChange, options, current, translationIndex}) => {
    const {t} = useTranslation()
    const defaultSelectorPlaceholder = t("search.placeholder.selector") as string
    return <Selector placeholder={defaultSelectorPlaceholder}
                     options={options}
                     title={t(`car.props.${translationIndex}.title`) as string}
                     current={current}
                     onChange={onChange}/>
}