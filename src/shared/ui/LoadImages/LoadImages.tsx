import {FC, useEffect, useMemo, useState} from 'react'

import s from './LoadImages.module.scss'
import {LoadedImage} from "../../types";
import {cn, getTranslationIndexCreator, useFileDrop} from "../../lib";
import Icon from "@mdi/react";
import {mdiCamera, mdiClose} from "@mdi/js/commonjs/mdi";
import {Text} from "../Text/Text";
import {useTranslation} from "react-i18next";

import {Label} from "../Label/Label";

interface IProps {
    onLoadImage: (images: LoadedImage[]) => void
    maxCountOfLoadedImages?: number
    images: LoadedImage[]
}


export const LoadImages: FC<IProps> = ({
                                           onLoadImage,
                                           images,
                                           maxCountOfLoadedImages = 25
                                       }) => {


    const {t} = useTranslation()
    const getIndex = getTranslationIndexCreator('chat')
    const canDrop = images.length < maxCountOfLoadedImages

    const onImagesChange = (files: FileList) => {
        onLoadImage([...images, ...Array.from(files).slice(0, maxCountOfLoadedImages - images.length).map(file => (
            {
                id: null,
                photo: URL.createObjectURL(file),
                file
            }
        ))])
    }
    const {onDrop, dragUnderBLock, dragStatus, onDragOver, onDragLeave} = useFileDrop()
    const deleteImage = (i: number) => {
        onLoadImage(images.filter((_, index) => index !== i))
    }

    return <div className={s.load_image}>
        <label className={cn(s.load_image_form, images.length && s.with_separator)}>
            <input type={'file'}
                   multiple
                   onChange={e => e.target.files && onImagesChange(e.target.files)}
                   accept={'image/*'}
            />
            <Icon path={mdiCamera} size={1.5}/>
            <Label label={t(getIndex("load_images"))}
                   level={3}
                   type={'secondary'}
                />
        </label>
        <div className={s.images_grid}>
            {images.map((img, index) => <div className={s.image_wrapper}>
                <span className={s.delete} tabIndex={0} onClick={() => deleteImage(index)}>
                    <Icon path={mdiClose} size={1}/>
                </span>
                <img src={img.photo} alt=""/>
            </div>)}
        </div>
        {dragStatus && <div className={cn(s.drag_form, dragUnderBLock && s.can_drop)}
                            onDragOver={onDragOver}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop(onImagesChange)}
        >
            <div>
                <Icon path={mdiCamera} size={2}/>
                <Text content={t(getIndex(canDrop ? 'drop.allowed' : "drop.denied"))}
                      weight={'medium'}
                      size={3}
                      align={'center'}

                />
            </div>
        </div>}
    </div>
}
