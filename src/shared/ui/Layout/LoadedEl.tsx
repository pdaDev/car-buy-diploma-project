import {FC} from "react";
import s from './Layout.module.scss'

interface IProps {
    loading: boolean
}
export const LoadingEl: FC<IProps> = ({ loading }) => {
    return <div data-loading={loading} className={s.loading_el}/>
}