import {FC} from "react"
import s from './ChangeAdvertisementType.module.scss'
import {CardType, cn} from "../../../shared";


interface IProps {
    onChange: (arg: CardType) => void
    activeType: CardType
}
export const ChangeAdvertisementType: FC<IProps> = ({ onChange, activeType }) => {
    const setLargeCardType = () => onChange('large')
    const setSmallCardType = () => onChange('small')
    const isLargeCardType = activeType === 'large'
    const isSmallCardType = activeType === 'small'


    return <div className={s.wrapper}>
        <div className={cn(s.large_card, isLargeCardType && s.active)} onClick={setLargeCardType} >
            <div className={s.card_item}>
                <div className={s.image}/>
            </div>
        </div>
        <div className={cn(s.small_card, isSmallCardType && s.active)} onClick={setSmallCardType}>
            <div className={s.card_item} />
            <div className={s.card_item} />
            <div className={s.card_item} />
            <div className={s.card_item} />
        </div>

    </div>
}