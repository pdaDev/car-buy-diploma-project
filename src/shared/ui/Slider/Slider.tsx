import React, {FC, MouseEvent, ReactNode, useEffect, useLayoutEffect, useRef, useState} from 'react'

import s from './Slider.module.scss'
import {Container, Stack} from "../Layout";
import {addPrefix, cn, debounce} from "../../lib";
import styled, {css} from "styled-components";
import {Image} from "../Image/Image";
import {SpaceLevel} from "../../types";
import {NavigationButton} from "./NavigationButton";
import LabelStories from "../Label/Label.stories";
import {TimeoutId} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";

interface ImagesProps {
    spacing?: number
    width: number | 'auto'
    paddings?: Padding[] | Padding
}


type Padding = SpaceLevel | string

type Props = {
    loading?: boolean
    countVisibleItems?: number
    controlsHorizontalOffset?: {
        left: string | number
        right: string | number
    } | string | number
    onPagination?: (p: number) => void
    controlsPos?: 'auto' | 'full_width'
    infinite?: boolean
    data: any[]
    width?: 'full' | 'auto'
    lastPage?: ReactNode
    elMargin?: number
    renderEl: (data: any, loadingStatus?: boolean, index?: number) => ReactNode


} & Omit<ImagesProps, 'width'>

const setSpace = (v: number | string | undefined) => v !== undefined ? typeof v === 'string' ? v : v > 0 ? `var(--space-${v})` : 0 : 0

const StyledImages = styled.div<ImagesProps>`
  display: flex;
  width: ${props => props.width === 'auto' ? props.width : `${props.width}px`};
  overflow: scroll;
  height: 100%;
  overflow-y: visible;
  justify-content: space-between;
    // gap: var(--space-${props => props.spacing});
  padding: ${({paddings}) => Array.isArray(paddings) ? paddings.map(v => setSpace(v)) : setSpace(paddings)};

  &::-webkit-scrollbar {
    display: none;
  }

`

const ImagesWrapper = styled.div<ImagesProps>`
  transition: .3s;
  display: inline-flex;
  justify-content: space-between;
  width: auto;
    //gap: var(--space-${props => props.spacing});
  gap: ${props => props.spacing}px;
  padding-right: var(--space-${props => props.spacing ? (props.spacing - 1) : 0});
  padding-left: var(--space-${props => props.spacing ? (props.spacing - 1) : 0});
  height: auto;
`


export const Slider: FC<Props> = ({
                                      loading = false,
                                      spacing = 3,
                                      controlsHorizontalOffset = 0,
                                      countVisibleItems = 4,
                                      infinite = false,
                                      width,
                                      controlsPos = 'full_width',
                                      data, renderEl,
                                      lastPage,
                                      elMargin,
                                      onPagination,
                                      paddings = [4, 0]
                                  }) => {

    const countOfNeighborRenderedImage = 1
    const dataForRender = lastPage ? [...data, lastPage] : data
    const lastPageIndex = data ? dataForRender.length - 1 : 0
    const [currentPageIndex, setCurrentPageIndex] = useState(0)
    const isLastImageInList = currentPageIndex === Math.max(lastPageIndex - countVisibleItems + 1, 0)
    const isFirstImageInList = currentPageIndex === 0
    let firstRenderedImageIndex = infinite ? currentPageIndex - countOfNeighborRenderedImage : Math.max(0, currentPageIndex - countOfNeighborRenderedImage)
    firstRenderedImageIndex = firstRenderedImageIndex < 0
        ? lastPageIndex + firstRenderedImageIndex + 1
        : firstRenderedImageIndex

    const countOfRenderIndexes = infinite
        ? data.length === 1 ? 1 : countOfNeighborRenderedImage * 2 + countVisibleItems
        : Math.min(countOfNeighborRenderedImage *  ((isFirstImageInList || isLastImageInList) ? 1 : 2) + countVisibleItems, (dataForRender?.length || 0))

    const indexesForRender: number[] = [...new Array(countOfRenderIndexes)]
        .map(((_, i) => {
            const index = firstRenderedImageIndex + i
            return index > lastPageIndex ? i - (lastPageIndex - firstRenderedImageIndex) - 1 : index
        }))

    console.log(indexesForRender)
    const setNextImage = () => {
        if (ref.current && typeof w === 'number') {
            ref.current.scrollTo({left: w * 2, behavior: 'smooth'})
        }

    }
    const setPrevImage = () => {
        const slider = ref.current
        if (slider) {
            // @ts-ignore
            slider.scrollTo({left: 0, behavior: 'smooth'})
        }
    }
    const [w, setW] = useState<ImagesProps['width']>(0)
    const ref = useRef<HTMLDivElement>(null)

    const align = (scrolling: 'smooth' | 'auto') => {
        if (ref.current && dataForRender.length > countVisibleItems) {
            const children = ref.current!.firstElementChild!.children
            const leftPoint = children[countOfNeighborRenderedImage].getBoundingClientRect().x
            const firstElement = children[0].getBoundingClientRect()
            const secondElement = children[1].getBoundingClientRect()
            const space = secondElement.x - (firstElement.x + firstElement.width)
            const padding = space / 2

            if (infinite) {
                ref.current.scrollTo({left: leftPoint + padding - firstElement.x - space / 2, behavior: scrolling})
            } else {
                const offset = isFirstImageInList ? 0 : isLastImageInList ? ref.current.scrollWidth : leftPoint + padding - firstElement.x - space / 2
                ref.current.scrollTo({left: offset, behavior: scrolling})
            }


        }
    }
    useLayoutEffect(() => {
        align('auto')
    }, [currentPageIndex, w])

    const [sp, setSpacing] = useState<ImagesProps['spacing']>(spacing)
    const isFullWidth = width === 'full' && dataForRender.length >= countVisibleItems

    useLayoutEffect(() => {
        if (ref.current && dataForRender.length > countVisibleItems) {
            const children = ref.current!.firstElementChild!.children
            const firstElement = children[0].getBoundingClientRect()
            const w = firstElement.width + (elMargin || 0)
            if (isFullWidth) {
                const parent = ref.current!.parentElement!.clientWidth
                setSpacing((parent - w * countVisibleItems) / (countVisibleItems - 1))
                console.log(parent)
                setW(parent)
            } else {
                setW(countVisibleItems * (w + spacing) - spacing)
            }

        } else setW('auto')
    }, [ref.current, dataForRender, spacing, isFullWidth, elMargin])

    const onScroll = () => {
        let timer1: TimeoutId
        let timer2: TimeoutId
        return (e: any) => {
            clearTimeout(timer1)
            clearTimeout(timer2)
            timer2 = setTimeout(() => {
                const scroll = Math.ceil(e.target.scrollLeft)
                if (infinite) {
                    if (scroll === 0) {
                        setCurrentPageIndex(cp => cp === 0 ? lastPageIndex : cp - 1)
                    } else if (scroll >= e.target.scrollWidth - e.target.clientWidth) {
                        setCurrentPageIndex(cp => cp === lastPageIndex ? 0 : cp + 1)
                    } else timer1 = setTimeout(() => align('smooth'), 400)
                } else {
                    if (scroll === 0 && !isFirstImageInList) {
                        setCurrentPageIndex(cp => cp === 0 ? lastPageIndex : cp - 1)
                    } else if (scroll >= e.target.scrollWidth - e.target.clientWidth && !isLastImageInList) {
                        setCurrentPageIndex(cp => cp === lastPageIndex ? 0 : cp + 1)
                    } else {
                        timer1 = setTimeout(() => align('smooth'), 100)
                    }
                }
            }, 15)
        }
    }

    useEffect(() => {
        if (onPagination) {
            onPagination(currentPageIndex)
        }
    }, [currentPageIndex])


    const debounceddScroll = onScroll()
    const leftButtonHorizontalOffset = typeof controlsHorizontalOffset === 'object'
        ? controlsHorizontalOffset.left
        : controlsHorizontalOffset

    const rightButtonHorizontalOffset = typeof controlsHorizontalOffset === 'object'
        ? controlsHorizontalOffset.right
        : controlsHorizontalOffset


    return (
        <div className={cn(s.wrapper, isFullWidth && s.full_width, addPrefix('controls_pos', controlsPos, 's'))}>
            <StyledImages paddings={paddings} spacing={sp} ref={ref} width={w} onScroll={debounceddScroll as any}>
                <ImagesWrapper paddings={paddings} spacing={sp} ref={ref} width={w}>
                    {
                        // @ts-ignore
                        !loading ? indexesForRender.map(index => (lastPage && index === lastPageIndex) ? lastPage : renderEl(dataForRender[index], false, index))
                            : [...new Array(countVisibleItems)].map((_, index) => renderEl(null, true, index))
                    }
                </ImagesWrapper>

            </StyledImages>

            <NavigationButton direction={'left'}
                              show={!((!infinite && isFirstImageInList)) && !loading && !(infinite && data.length === 1)}
                              horizontalOffset={leftButtonHorizontalOffset}
                              onClick={setPrevImage}/>

            <NavigationButton direction={'right'}
                              show={!((!infinite && isLastImageInList)) && !loading && !(infinite && data.length === 1)}
                              horizontalOffset={rightButtonHorizontalOffset}
                              onClick={setNextImage}/>
        </div>)
    // return <Stack direction={'row'} spacing={3}>

    // </Stack>
}
