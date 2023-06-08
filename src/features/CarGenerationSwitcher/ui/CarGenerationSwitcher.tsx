import {FC} from "react";
import {Switcher} from "../../../shared";
import {useAppNavigate} from "../../../app/services";
import {useTranslation} from "react-i18next";

interface IProps {
    generation: number
    current: 'card' | 'characteristics'
}

export const CarGenerationSwitcher: FC<IProps> = ({ generation, current }) => {
    const n = useAppNavigate()
    const { t } = useTranslation()
    const onOptionChange = (v: string) => {
        if (v === 'card') {
            n(p => p.car.generation._key_(generation))
        } else {
            n(p => p.car.technical, { generation })
        }
    }
    const options = ['card', 'characteristics'].map(code => ({
        value: code,
        label: t(`car.generation.${code}`)
    }))
    return <Switcher options={options}
                     activeOptions={current}
                     onChange={onOptionChange}/>
}