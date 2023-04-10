import React, {FC, ReactNode, useEffect, useLayoutEffect, useRef, useState} from 'react'

import s from './ImageSlider.module.scss'
import {NavigationButton} from "./NavigationButton";
import {Container, Stack} from "../Layout";
import {cn} from "../../lib";

interface IProps {
    images: string[]
    imageBehaviour?: 'contains' | 'byHeight' | 'byWidth'
    infinite?: boolean
    counter?: {
        position: Parameters<typeof Container>[0]['contentAlign']
        render: (current: number, total: number) => ReactNode
    }
}

export const ImageSlider: FC<IProps> = ({
                                            infinite,
                                            counter,
                                            images
                                        }) => {
    const [currentPageIndex, setCurrentPageIndex] = useState(0)
    const countOfNeighborRenderedImage = 1
    const lastPageIndex = images.length - 1
    const isLastImageInList = currentPageIndex === lastPageIndex
    const isFirstImageInList = currentPageIndex === 0
    let firstRenderedImageIndex = currentPageIndex - countOfNeighborRenderedImage
    firstRenderedImageIndex = firstRenderedImageIndex < 0
        ? lastPageIndex + firstRenderedImageIndex + 1
        : firstRenderedImageIndex
    const indexesForRender: number[] = [...new Array(Math.min(countOfNeighborRenderedImage * 2 + 1, images.length))]
        .map(((_, i) => {
            const index = firstRenderedImageIndex + i
            return index > lastPageIndex ? i - (lastPageIndex - firstRenderedImageIndex) - 1 : index
        }))

    const setNextImage = () => {
        const slider = ref.current
        if (slider) {
            // @ts-ignore
            slider.style.left = '-150%'
        }
        setTimeout(() => {
            setCurrentPageIndex(cp => cp === lastPageIndex ? 0 : cp + 1)
        }, 300)

    }
    const setPrevImage = () => {
        const slider = ref.current
        if (slider) {
            // @ts-ignore
            slider.style.left = '50%'
        }
        setTimeout(() => {
            setCurrentPageIndex(cp => cp === 0 ? lastPageIndex : cp - 1)

        }, 300)
    }
    const ref = useRef(null)
    useEffect(() => {
        const slider = ref.current
        if (slider) {
            // @ts-ignore
            slider.style.transition = '0ms'
            // @ts-ignore
            slider.style.left = '-25%'
            // @ts-ignore
            setTimeout(() => slider.style.transition = '.3s', 10)
        }
    }, [currentPageIndex])

    const hasImages = images.length >= 1
    return <div className={s.wrap} style={{background: hasImages ? `url(${images[currentPageIndex]})` : `var(--clr-primary-light)`}}>
        {!((!infinite && isFirstImageInList) || !hasImages) && <NavigationButton direction={'left'} onClick={setPrevImage}/>}
        <div className={s.kek}>
            <div className={s.back} style={{background: `url(${images[currentPageIndex]})`}}/>
            <div className={s.slide_wrapper}>
                <div className={cn(s.slide)} ref={ref}>
                    {images.length > 0
                        && indexesForRender.map(index => <img style={{width: 500}} src={images[index]}/>)
                    }
                </div>
            </div>
        </div>
        {counter && <Container p={3} position={'center'} contentAlign={counter.position}>
            {counter.render(currentPageIndex, images.length)}
        </Container>}
        {!((!infinite && isLastImageInList) || !hasImages) && <NavigationButton direction={'right'} onClick={setNextImage}/>}
    </div>

}



