import {ChangeEventHandler, FC, MouseEventHandler, UIEventHandler, useEffect, useRef, useState} from "react";
import s from './ReviewPhotoViewer.module.scss'
import {NavigationButton} from "../../../shared/ui/Slider/NavigationButton";
import styled from "styled-components";
import {Box, Image} from "../../../shared";
import {useAppDispatch} from "../../../app/services";
import {openModal} from "../../../app/services/withPopupProvider";


interface IProps {
    photos: string[]
}

const StyledThumb = styled.div<{ w: number, pos: number }>`
  height: 100%;
  display: inline-block;
  width: ${props => props.w}%;
  background: var(--clr-primary);
  border-radius: var(--brd-radius-2);
  position: absolute;
  top: 0;
  left: ${props => props.pos}px;
`

export const ReviewPhotoViewer: FC<IProps> = ({photos}) => {
    const ref = useRef<HTMLDivElement>(null)
    const onLeftNavigationButtonClick = () => {
        if (ref.current && nav.current) {
            ref.current.scrollBy({left: -document.body.clientWidth / 3, behavior: 'smooth'})
        }
    }

    const onRightNavigationButtonClick = () => {
        if (ref.current && nav.current) {
            ref.current.scrollBy({left: document.body.clientWidth / 3, behavior: 'smooth'})
        }
    }

    const [isThumbSelected, selectThumb] = useState(false)
    const [thumbPos, setThumbPos] = useState(0)
    const nav = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onPointerMove = (e: MouseEvent) => {
            if (nav.current && ref.current) {
                const container = nav.current.getBoundingClientRect()
                const thumb = nav.current.firstElementChild!.getBoundingClientRect()
                const thumbPos = Math.min(Math.max(e.clientX - container.left, 0), container.width - thumb.width)
                ref.current.scrollTo({left: thumbPos / container.width * ref.current.scrollWidth, behavior: 'auto'})

            }
        }
        const onPointerUp = () => {
            selectThumb(false)
        }

        if (isThumbSelected) {
            document.addEventListener('pointermove', onPointerMove as any)
            document.addEventListener('pointerup', onPointerUp)
            return () => {
                document.removeEventListener('pointermove', onPointerMove as any)
                document.removeEventListener('pointerup', onPointerUp)
            }
        }
    }, [isThumbSelected, nav, ref])

    const onPointerDown = () => {
        selectThumb(true)
    }

    const onTrackClick: MouseEventHandler = (e) => {
        if (ref.current) {
            const container = e.currentTarget.getBoundingClientRect()
            const thumb = e.currentTarget.firstElementChild!.getBoundingClientRect()
            const thumbPos = Math.min(Math.max(e.clientX - container.left - thumb.width / 2, 0), container.width - thumb.width)
            ref.current.scrollTo({left: thumbPos / container.width * ref.current.scrollWidth, behavior: 'smooth'})
        }

    }

    const onScrolling: UIEventHandler = (e) => {
        if (nav.current)
            setThumbPos((e.currentTarget.scrollLeft / e.currentTarget.scrollWidth) * nav.current.clientWidth)
    }

    const thumbWidth = ref.current ? ref.current.clientWidth / ref.current.scrollWidth * 100 : 0
    const showRightButton = ref.current ? ref.current.scrollLeft + 1 < ref.current!.scrollWidth - ref.current.clientWidth : false
    const showLeftButton = ref.current ? ref.current.scrollLeft !== 0 : false
    const d = useAppDispatch()
    const onImageClick = (index: number) => {
        d(openModal({
            key: 'image', payload: {
                currentImageIndex: index,
                images: photos
            }
        }))
    }
    return <div className={s.wrapper}>
        <div className={s.slides} ref={ref} onScroll={onScrolling}>
            {photos.map((p, index) => <Image src={p}
                                             onClick={() => onImageClick(index)}
                                             alt={''}/>)}
        </div>
        <div className={s.navigation}>
            <div className={s.track}
                 onClick={onTrackClick}
                 ref={nav}>
                <StyledThumb w={thumbWidth}
                             pos={thumbPos}
                             onPointerDown={onPointerDown}/>
            </div>

        </div>
        <div className={s.left}>
            <NavigationButton direction={'left'}
                              horizontalOffset={-42}
                              show={showLeftButton}
                              onClick={onLeftNavigationButtonClick}/>
        </div>
        <div className={s.right}>
            <NavigationButton direction={'right'}
                              show={showRightButton}
                              horizontalOffset={-42}
                              onClick={onRightNavigationButtonClick}/>
        </div>
        {}
    </div>
}