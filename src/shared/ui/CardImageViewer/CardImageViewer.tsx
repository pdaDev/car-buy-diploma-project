import {FC, MouseEvent, useRef, useState} from 'react'

import s from './CardImageViewer.module.scss'
import {Counter} from "../Counter/Counter";
import {cn, debounce} from "../../lib";
interface IProps {
    photos: string[]
    max?: number
    loading?: boolean
}

export const CardImageViewer: FC<IProps> = ({
                                                photos,
                                                max = 4,
                                                loading
                                            }) => {
    const ref = useRef<HTMLDivElement>(null)
    const hasPhotos = photos.length > 0
    const [page, setPage] = useState<number>(0)

    const availableEls = Math.min(max, photos.length)
    const lessEls = Math.max(0, photos.length - availableEls)

    const onPointerMove = (e: MouseEvent) => {
        if (ref.current && photos.length > 1) {
            const pos = e.clientX - ref.current.getBoundingClientRect().x
            const dx = ref.current.clientWidth / (max + 1)
            const currentPage = Math.ceil(pos / dx) - 1
            if (page !== currentPage) {
                setPage(currentPage)
            }
        }
    }

    const additionalPagesCounterShow = page === max
    const debouncedOnPointerMove = debounce(onPointerMove, 5)
    const onPointerLeave = () => setPage(0)

    return <div ref={ref}
                className={s.image_viewer}
                onPointerMove={debouncedOnPointerMove as any}
                onPointerLeave={onPointerLeave}
                data-loading={loading}
    >
        {!loading && (
            <>
                <div className={cn(s.image_wrapper, additionalPagesCounterShow && s.blured)}>
                    {photos.length > 0
                        ? <img src={photos[page]} alt="img"/>
                        : <div className={s.not_image}>
                            <svg width="64" height="57" viewBox="0 0 64 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.5 21.5L12.75 5.75H51.25L56.5 21.5M51.25 39C49.8576 39 48.5223 38.4469 47.5377 37.4623C46.5531 36.4777 46 35.1424 46 33.75C46 32.3576 46.5531 31.0223 47.5377 30.0377C48.5223 29.0531 49.8576 28.5 51.25 28.5C52.6424 28.5 53.9777 29.0531 54.9623 30.0377C55.9469 31.0223 56.5 32.3576 56.5 33.75C56.5 35.1424 55.9469 36.4777 54.9623 37.4623C53.9777 38.4469 52.6424 39 51.25 39ZM12.75 39C11.3576 39 10.0223 38.4469 9.03769 37.4623C8.05312 36.4777 7.5 35.1424 7.5 33.75C7.5 32.3576 8.05312 31.0223 9.03769 30.0377C10.0223 29.0531 11.3576 28.5 12.75 28.5C14.1424 28.5 15.4777 29.0531 16.4623 30.0377C17.4469 31.0223 18 32.3576 18 33.75C18 35.1424 17.4469 36.4777 16.4623 37.4623C15.4777 38.4469 14.1424 39 12.75 39ZM56.22 4C55.52 1.97 53.56 0.5 51.25 0.5H12.75C10.44 0.5 8.48 1.97 7.78 4L0.5 25V53C0.5 53.9283 0.868749 54.8185 1.52513 55.4749C2.1815 56.1313 3.07174 56.5 4 56.5H7.5C8.42826 56.5 9.3185 56.1313 9.97487 55.4749C10.6313 54.8185 11 53.9283 11 53V49.5H53V53C53 53.9283 53.3687 54.8185 54.0251 55.4749C54.6815 56.1313 55.5717 56.5 56.5 56.5H60C60.9283 56.5 61.8185 56.1313 62.4749 55.4749C63.1313 54.8185 63.5 53.9283 63.5 53V25L56.22 4Z"/>
                            </svg>
                            Фотография отстутствует
                        </div>}
                </div>
                {additionalPagesCounterShow && <div className={s.count_of_additiona_pages_wrapper}>
                    {`Еще есть ${lessEls} фотографий`}
                </div>}
                {hasPhotos &&
                    <div className={s.counter_wrapper}>
                        <Counter total={availableEls}
                                 current={page}
                                 size={'small'}
                                 onChange={setPage}
                        />
                        <div className={cn(s.additional_pages_wrapper, additionalPagesCounterShow && s.active)}>
                            {lessEls > 0 && `+${lessEls}`}
                        </div>
                    </div>}
            </>
        )}
    </div>
}
