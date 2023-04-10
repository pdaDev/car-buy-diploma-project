import {FC, ReactNode} from 'react'

import s from './List.module.scss'
import {SpaceLevel} from "../../types";
import {Stack} from "../Layout";

interface ISortOption {

}
interface IProps {
    loading: boolean
    renderListEl: (...args: any[]) => ReactNode
    data: any[] | null | undefined
    spacing?: SpaceLevel | string
    countOfLoadingEls?: number
}
export const List: FC<IProps> = ({
    data,
    renderListEl,
    loading,
    spacing= 4,
    countOfLoadingEls = 5
}) => {
    return <Stack spacing={spacing} vAlign={'start'}>
        { data && data.length > 0 && !loading && data.map(el => renderListEl(el)) }
        { loading && [...new Array(countOfLoadingEls)].map(el => renderListEl(null, loading))}
    </Stack>
}
