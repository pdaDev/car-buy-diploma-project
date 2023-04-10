import {FC, MouseEvent, ReactNode, useRef, useState} from 'react'

import s from './Slider.module.scss'
import {Stack} from "../Layout";
import {debounce} from "../../lib";

interface IProps {
    renderEl: (data: any, loading?: boolean) => ReactNode
    data: null | undefined | any[]
    loading?: boolean
    countVisibleItems?: number
    lastElement?: ReactNode
}
export const Slider: FC<IProps> = ({
    loading= false,
    renderEl,
    data,
    countVisibleItems
}) => {
    // const ref = useRef<HTMLDivElement>(null)
    // const [page, setPage] = useState<number>(0)
    //
    // const availableEls = Math.min(max, photos.length)
    // const lessEls = Math.max(0, photos.length - availableEls)
    //
    // const onPointerMove = (e: MouseEvent) => {
    //     if (ref.current && photos.length > 1) {
    //         const pos = e.clientX - ref.current.getBoundingClientRect().x
    //         const dx = ref.current.clientWidth / (max + 1)
    //         const currentPage = Math.ceil(pos / dx) - 1
    //         if (page !== currentPage) {
    //             setPage(currentPage)
    //         }
    //     }
    // }
    //
    // const additionalPagesCounterShow = page === max
    // const debouncedOnPointerMove = debounce(onPointerMove, 5)
    // const onPointerLeave = () => setPage(0)
    return <Stack direction={'row'} spacing={3}>
        { data && data.length > 0 && !loading && data.map(el => renderEl(el)) }
        { loading && [...new Array(countVisibleItems)].map(el => renderEl(null, loading))}
    </Stack>
}
