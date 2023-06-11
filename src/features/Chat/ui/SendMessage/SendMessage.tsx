import {FC, useState} from "react";
import {Card, ChatLoadedImage, Clickable, Image, Input, LoadedImage, Stack} from "shared";
import Icon from "@mdi/react";
import {mdiClose, mdiImage, mdiSend} from "@mdi/js/commonjs/mdi";
import s from './SendMessage.module.scss'
import {MessageTemplates} from "../MessageTemplates/MessageTemplates";
// @ts-ignore
import {v4 as uuid} from 'uuid'
import {useTranslation} from "react-i18next";




interface IProps {
    showTemplates?: boolean
    message: string
    onMessageChange: Function
    images: ChatLoadedImage[]
    onImageChange: Function
    sendMessage: Function
    deleteImage: Function
    isSending: boolean
}

export const SendMessage: FC<IProps> = ({
                                            showTemplates = false,
                                            onMessageChange,
                                            onImageChange,
                                            images,
                                            message,
                                            sendMessage,
                                            deleteImage,
                                            isSending
                                        }) => {

    const messageTemplates: string[] = [
        'how_technical', 'has_sale', 'change', 'has_dtp', 'to'
    ]
    const onKeyDown = (e: KeyboardEvent) => {
        if (e.code === 'Enter') {
            sendMessage()
        }
    }
    const {t} = useTranslation()
    return <Card paddings={3} border={2} shadow={0} contentDirection={'column'}>
        {images.length > 0 && <div className={s.images_for_load}>
            {images.map((img, i) => <div className={s.load_image_item}>
                <img src={img.url}/>
                <span className={s.close}
                      onClick={deleteImage(i)}>
                        <Icon path={mdiClose} size={0.5}/>
                    </span>
            </div>)}
        </div>}
        <div className={s.content}>
            <Input value={message}
                   onKeyDown={onKeyDown}
                   placeholder={t("chat.write_message") as string}
                   onChange={onMessageChange as any}
            />
            <label className={s.load_image}>
                <input type={"file"}
                       accept={'image/*'}
                       multiple
                       disabled={images.length >= 8}
                       onChange={e => e.target.files && onImageChange(e.target.files)}/>
                <Icon path={mdiImage} size={1}/>
            </label>
            {isSending ? <svg className={s.loader}>
                <circle cx={11}
                        cy={11}
                        className={s.circle}
                        r={9}
                        strokeWidth={2}
                        strokeLinecap={"round"}
                        strokeDasharray={100}
                        strokeDashoffset={50}
                />
            </svg> : <Clickable onClick={sendMessage}>
                <Icon path={mdiSend} size={1}/>
            </Clickable>}
        </div>
        <div className={s.message_templates_container}>
            {showTemplates && <MessageTemplates templates={messageTemplates}
                                                setMessage={onMessageChange as any}
            />}
        </div>
    </Card>
}