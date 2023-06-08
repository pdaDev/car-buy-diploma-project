import {FC, useEffect, useRef, useState} from 'react'

import s from './FullScreenImageViewer.module.scss'
import {Container} from "../Layout";
import {cn, debounce} from "../../lib";
import {withPopup} from "../../../app/services/withPopupProvider/lib/hocs";
import {observe} from "web-vitals/dist/modules/lib/observe";
import {NavigationImageItem} from "./NavigationImageItem";
import {FullScreenImage} from "./FullScreenImage";
import * as NS from "../../../app/services/withPopupProvider/namespace";


type Props = NS.IBaseModelProps & NS.IImagePayload
export const Modal: FC<Props> = ({
                                     onClose,
                                     images,
                                     currentImageIndex = 0,
                                     extra
                                 }) => {
    const needShowNavigation = images.length > 1
    const [activeImage, setActiveImage] = useState<number>(0)
    const imagesWrapper = useRef<HTMLDivElement>(null)


    const goToImage = (index: number) => {
        setActiveImage(index)
        const image = imagesWrapper.current!.children[index]
        document.documentElement.scrollTo(
            // @ts-ignore
            {top: image.offsetTop - (document.body.clientHeight - image.clientHeight) / 2})
    }

    useEffect(() => {
        if (currentImageIndex !== undefined && currentImageIndex >= 0) {
            goToImage(currentImageIndex)
        }
    }, [currentImageIndex])

    const navigationList = useRef<HTMLDivElement>(null)
    const slideNavigationDown = () => {
        if (navigationList.current) {
            navigationList.current.scrollBy({top: 100, behavior: 'smooth'})
        }
    }

    const slideNavigationUp = () => {
        if (navigationList.current) {
            navigationList.current.scrollBy({top: -100, behavior: 'smooth'})
        }
    }

    useEffect(() => {
        if (navigationList.current && imagesWrapper) {
            const image = navigationList.current!.children[activeImage]
            const height = navigationList.current.clientHeight
            // @ts-ignore
            const top = image.offsetTop - (height) / 2
            navigationList.current!.scrollTo({top, behavior: 'smooth'})
            // navigationList.current!.children[activeImage].scrollIntoView({ behavior: 'smooth' })
        }
    }, [activeImage, navigationList])

    console.log(activeImage)


    return <div className={s.container} onClick={onClose as any}>
        <div className={s.images} ref={imagesWrapper}>
            {images.map((img, i) => <FullScreenImage image={img}
                                                     setActive={() => setActiveImage(i)}
            />)}
        </div>
        {needShowNavigation && <div className={s.navigation}>
            {/*<div className={s.navigation_button}*/}
            {/*     onClick={slideNavigationUp}>*/}

            {/*</div>*/}
            <div className={s.list}
                 ref={navigationList}
            >
                {images.map((src, i) => <NavigationImageItem
                    active={activeImage === i}
                    image={src}
                    setActive={() => goToImage(i)}/>)}
            </div>
            {/*<div className={s.navigation_button} onClick={slideNavigationDown}/>*/}

        </div>}
        {extra && <div className={s.extra}>
            {extra}
        </div>}
    </div>
}

export const FullScreenImageViewer = withPopup('image')(Modal)
