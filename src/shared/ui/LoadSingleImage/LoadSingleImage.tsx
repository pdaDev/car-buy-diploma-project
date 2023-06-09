import {FC, MouseEventHandler} from 'react'

import s from './LoadSingleImage.module.scss'
import {useTranslation} from "react-i18next";
import {cn, getTranslationIndexCreator, useFileDrop} from "../../lib";
import Icon from "@mdi/react";
import {mdiCamera, mdiClose} from "@mdi/js/commonjs/mdi";
import {Label} from "../Label/Label";
import {Text} from "../Text/Text";

interface IProps {
    onLoadImage: Function
    image: File | string | null

}

export const LoadSingleImage: FC<IProps> = ({
                                                onLoadImage,
                                                image,
                                            }) => {


    const {t} = useTranslation()
    const getIndex = getTranslationIndexCreator('chat')

    const onImagesChange = (files: FileList) => {
        onLoadImage(files[0])
    }
    const {onDrop, dragUnderBLock, dragStatus, onDragOver, onDragLeave} = useFileDrop()
    const deleteImage: MouseEventHandler = (e) => {
        e.stopPropagation()
        onLoadImage(null)
    }

    const imageForRender = image
        ? typeof image === 'string' ? image : URL.createObjectURL(image)
        : ''

    return <div className={s.load_image}>
        <label className={cn(s.load_image_form, image && s.has_image)}>
            <input type={'file'}
                   onChange={e => e.target.files && onImagesChange(e.target.files)}
                   accept={'image/*'}
            />
            <Icon path={mdiCamera} size={1.5}/>
            <Label label={t(getIndex("load_images"))}
                   level={3}
                   align={'center'}
                   type={'secondary'}
            />

        </label>
        { !dragStatus && <span className={s.delete}
                               tabIndex={0}
                               onClick={deleteImage}>
            <Icon path={mdiClose} size={1}/>
        </span> }
        {image && <img src={imageForRender} />}
        {dragStatus && <div className={cn(s.drag_form, dragUnderBLock && s.can_drop)}
                            onDragOver={onDragOver}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop(onImagesChange)}
        >
            <div>
                <Icon path={mdiCamera} size={2}/>
                <Text content={t(getIndex('drop.allowed'))}
                      weight={'medium'}
                      size={3}
                      align={'center'}

                />
            </div>
        </div>}
    </div>
}
