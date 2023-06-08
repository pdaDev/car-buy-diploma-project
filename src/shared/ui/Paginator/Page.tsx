import {FC} from "react";
import './Paginator.scss'
import {cn} from "../../lib";
interface IProps {
    page: number
    setPage: Function,
    active: boolean
}
export const Page: FC<IProps> = ({ page, setPage, active }) => {
    const onPageClick = () => setPage(page)
    return  <div onClick={onPageClick}
                 tabIndex={0}
                 className={cn('paginator__page', active && 'active')}
    >
        { page + 1 }
    </div>
}