import React, {FC, ReactNode, useEffect, useLayoutEffect, useRef, useState} from 'react'

import s from './ImageSlider.module.scss'
import {NavigationButton} from "./NavigationButton";
import {Container, Stack} from "../Layout";
import {cn} from "../../lib";
import {Slider} from "../Slider/Slider";
import {Image} from "../Image/Image";
import {Counter} from "../Counter/Counter";
import {NumberCounter} from "../NumberCounter/NumberCounter";
import {Label} from "../Label/Label";
import {useTranslation} from "react-i18next";
import {useAppDispatch} from "../../../../../car-buy/src/app/services";
import {openModal} from "../../../../../car-buy/src/app/services/withPopupProvider";
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;
import {Symbol} from "../Symbol/Symbol";

interface IProps {
    images: string[]
    infinite?: boolean
    loading?: boolean
    extra?: {
        button: ReactNode
    }
    onImageClick?: (index: number) => void
    counter?: {
        position: Parameters<typeof Container>[0]['contentAlign']
        render: (current: number, total: number) => ReactNode
    }
}

const defaultCounter: IProps['counter'] = {
    position: 'bottom-right',
    render: (current, total) => <NumberCounter total={total} current={current}/>
}

export const ImageSlider: FC<IProps> = ({
                                            onImageClick,
                                            infinite,
                                            counter = defaultCounter,
                                            loading,
                                            extra,
                                            images
                                        }) => {
    const [currentPage, setCurrentPage] = useState<number>(0)
    const hasImages = images.length > 0
    const {t} = useTranslation()
    const d = useAppDispatch()
    const mock_photos = [
        'https://i.trse.ru/2018/11/30b8b9a9554e6e763c7cfcbadfa7a9e6.jpg',
        'https://kuznitsaspb.ru/wp-content/uploads/6/3/e/63e69cf6a03b2922ba6473c6059ef3e1.jpeg',
        'https://carsweek.ru/upload/uf/2b9/2b90865ed370edc30d410e41c8f59e00.jpg',
        'https://1gai.ru/uploads/posts/2015-05/1432580276_16.jpg',
        'https://i.trse.ru/2018/10/c4ca4238a0b923820dcc509a6f75849b-13.jpg',
        'https://kuznitsaspb.ru/wp-content/uploads/6/b/6/6b67dcc5fcf14751abb44d54e0fb8e78.jpeg',
        'https://img3.akspic.ru/attachments/originals/7/4/6/5/35647-bmw-lichnyj_roskoshnyj_avtomobil-sportivnyj_avtomobil-sportkar-predstavitelskij_avtomobil-3000x2000.jpg',
        'https://i.trse.ru/2018/11/30b8b9a9554e6e763c7cfcbadfa7a9e6.jpg',
        'https://kuznitsaspb.ru/wp-content/uploads/6/3/e/63e69cf6a03b2922ba6473c6059ef3e1.jpeg',
        'https://carsweek.ru/upload/uf/2b9/2b90865ed370edc30d410e41c8f59e00.jpg',
        'https://1gai.ru/uploads/posts/2015-05/1432580276_16.jpg',
        'https://i.trse.ru/2018/10/c4ca4238a0b923820dcc509a6f75849b-13.jpg',
        'https://kuznitsaspb.ru/wp-content/uploads/6/b/6/6b67dcc5fcf14751abb44d54e0fb8e78.jpeg',
        'https://img3.akspic.ru/attachments/originals/7/4/6/5/35647-bmw-lichnyj_roskoshnyj_avtomobil-sportivnyj_avtomobil-sportkar-predstavitelskij_avtomobil-3000x2000.jpg',
    ]
    const onClick = () => {
        d(openModal({
            key: 'image', payload: {
                currentImageIndex: currentPage,
                images: mock_photos
            }
        }))
    }

    const handleClick = () => {
        onImageClick ? onImageClick(currentPage) : onClick()
    }
    return <div className={s.wrap}>
        <div className={s.slider_wrapper}>
            {
                !loading &&  <>
                    {images.length > 0 ? <Slider data={images}
                                                 countVisibleItems={1}
                                                 onPagination={setCurrentPage}
                                                 spacing={0}
                                                 infinite={true}
                                                 renderEl={(image: string) => <Image width={'580px'}
                                                                                     height={'400px'}
                                                                                     fit={'cover'}
                                                                                     src={image}
                                                                                     onClick={handleClick}
                                                                                     alt={''}

                                                 />}/>
                        : <Symbol content={t("advertisement.photo_empty")} color={'fnt-black'}/>
                    }
                </>
            }
        </div>
        {extra && extra.button && <div className={s.extra_button}>
            {extra.button}
        </div>}
        {<div data-loading={loading} className={cn(s.background_image, !loading && !hasImages && s.no_image)}>
            {hasImages && <img src={images[currentPage]}/>}
        </div>}
        {<div className={s.counter_wrapper}>
            {images.length > 1 && counter.render(currentPage + 1, images.length)}
        </div>}
    </div>

}



