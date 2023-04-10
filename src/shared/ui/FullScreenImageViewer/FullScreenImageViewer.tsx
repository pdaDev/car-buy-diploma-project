import {FC, useEffect, useRef, useState} from 'react'

import s from './FullScreenImageViewer.module.scss'
import {Modal} from "../../../app/services/withPopupProvider";
import {Container} from "../Layout";
import {cn, debounce} from "../../lib";

interface IProps {
    images: string[]
    currentImageIndex?: number
}

export const FullScreenImageViewer: FC<IProps> = ({
                                                      images,
                                                      currentImageIndex = 0
                                                  }) => {
    const needShowNavigation = images.length > 1
    const [activeImage, setActiveImage] = useState<number>(0)
    const imagesWrapper = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (imagesWrapper.current) {
            const onScroll = () => {
                const doc = document.documentElement
                const scrolled = doc.scrollTop + doc.clientHeight / 2
                const children = imagesWrapper.current!.children

                for (let i = 0; i < children.length; i++) {
                    if (doc.scrollTop + doc.clientHeight === doc.scrollHeight) {
                        setActiveImage(children.length - 1)
                        return
                    }
                    // @ts-ignore
                    if (children[i].offsetTop < scrolled && children[i].offsetTop + children[i].clientHeight > scrolled) {
                        setActiveImage(i)
                        break
                    }
                }
            }
            const onDebouncedScroll = debounce(onScroll, 10)
            document.addEventListener('scroll', onDebouncedScroll)
            return () => document.removeEventListener('scroll', onDebouncedScroll)
        }
    }, [imagesWrapper.current, document.documentElement.scrollHeight])

    const goToImage = (index: number) => {
        const image = imagesWrapper.current!.children[index]
        // @ts-ignore
        document.documentElement.scrollTo({ top: image.offsetTop })
    }

    return <Modal modalKey={'image'}>
        <Container>
            <div className={s.images} ref={imagesWrapper}>
                {images.map(i => <img src={i} key={i}/>)}
            </div>
            {needShowNavigation && <div className={s.navigation}>
                {images.map((src, i) => <img src={src}
                                             key={i}
                                             tabIndex={0}
                                             className={cn(s.navigation_item, activeImage === i && s.active)}
                                             onClick={() => goToImage(i)}
                />)}
            </div>}
        </Container>
    </Modal>
}
