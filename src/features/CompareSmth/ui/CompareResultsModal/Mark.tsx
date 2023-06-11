import {FC} from "react";
import {addPrefix, cn} from "shared";
import s from './CompareResultsModals.module.scss'
interface IProps {
    mark: number
}
export const Mark: FC<IProps> = ({ mark }) => {

    const getType = () => {
        if  (mark >= 80) {
            return 'good'
        }
        if (mark >= 40 && mark < 80) {
            return 'medium'
        }
        return 'bad'
    }

    return <span className={cn(s.mark, addPrefix('type', getType(), s))}>
        <h3>
            { mark }
        </h3>
    </span>
}