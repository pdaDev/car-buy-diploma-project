import {FC, MouseEventHandler, useEffect, useRef} from 'react'
import s from './Message.module.scss'
import {addPrefix, Clickable, cn, getTimeWithoutSeconds, Image, Label, Stack, Text} from "../../../../shared";
import {Timestamp} from 'firebase/firestore'
import {useTranslation} from "react-i18next";
import Icon from "@mdi/react";
import {mdiCheck, mdiPencil, mdiReply} from "@mdi/js/commonjs/mdi";
import {useAppDispatch} from "../../../../app/services";
import {openModal} from "../../../../app/services/withPopupProvider";


interface IProps {
    images: string[]
    message: string
    id: string
    date: any
    type: 'me' | 'opponent'
    isEdited: boolean
    onClick: Function
    onMessageEdit: Function
    isSelected: boolean
    onMessageReply: Function
    viewMessage: Function
    viewed: boolean
    replied: {
        id: string
        text: string
        authorName: string
    } | null
}

export const Message: FC<IProps> = ({
                                        images = [],
                                        date,
                                        id,
                                        isSelected,
                                        type = 'me',
                                        message,
                                        isEdited,
                                        onClick,
                                        onMessageEdit,
                                        onMessageReply,
                                        viewMessage,
                                        viewed,
                                        replied
                                    }) => {
    const {t} = useTranslation()

    const isMyMessage = type === 'me'
    const onEditButtonClick: MouseEventHandler = e => {
        e.stopPropagation()
        onMessageEdit()
    }
    const onReplyMessageButtonClick: MouseEventHandler = e => {
        e.stopPropagation()
        onMessageReply()
    }
    const hasImages = images.length > 0
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (ref.current && !isMyMessage && !viewed) {

            const observer = new IntersectionObserver(() => {
                viewMessage()
            }, {
                root: null,
                rootMargin: "0px",
                threshold: 1.0,
            })

            observer.observe(ref.current)

            return () => {
                observer.disconnect()
            }
        }
    }, [ref, isMyMessage, viewed])

    const onRepliedMessageClick: MouseEventHandler = e => {
        e.stopPropagation()
        if (replied) {
            const el = document.getElementById(replied.id)!
            el.setAttribute('tabIndex', '0')
            setTimeout(() => el.removeAttribute('tabIndex'), 2000)
            el.focus()
        }

    }

    const d = useAppDispatch()
    const onImageClick = (index: number) => () => {
        d(openModal({
            key: 'image', payload: {
                images,
                currentImageIndex: index,
            }
        }))
    }

    return <div className={cn(s.message_wrapper, addPrefix('type', type, s), isSelected && s.selected)}
                ref={ref}
                id={id}
                onClick={onClick as any}
    >
        {
            !isSelected && <Stack direction={'row'} spacing={0}>
                {isMyMessage && !isSelected && <div className={s.edit_button} onClick={onEditButtonClick}>
                    <Icon path={mdiPencil} size={0.8}/>
                </div>}
                {!isSelected && <div className={s.edit_button} onClick={onReplyMessageButtonClick}>
                    <Icon path={mdiReply} size={0.8}/>
                </div>}
            </Stack>
        }
        {isSelected && <span className={s.selected_mark}>
            <Icon path={mdiCheck} size={0.5}/>
            </span>}
        <div className={cn(s.message, hasImages && s.has_images)}>
            {
                replied && <div onClick={onRepliedMessageClick}
                                className={cn(s.replied)}
                >
                    <Stack>
                        <Label label={replied.authorName}
                               type={isMyMessage ? 'primary' : 'secondary'}
                               size={2}
                               weight={'medium'}/>
                        <p>
                            {replied.text}
                        </p>
                    </Stack>
                </div>
            }
            <Text content={message} color={isMyMessage ? 'fnt-black' : 'fnt-primary'}/>
            {hasImages && <Stack spacing={2}>
                {images.map((img, index) => <Image src={img} alt={''} onClick={onImageClick(index)}/>)}
            </Stack>}
            <span className={s.date_wrapper}>
                {isMyMessage && <div className={s.check_marks_wrapper}>
                    <div className={s.check_mark}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                             width="15" height="15"
                             className={s.active_check_mark}
                             viewBox="0 0 48 48">
                            <path d="M 42.439453 9.4394531 L 16.5 35.378906 L 5.5605469 24.439453 A 1.50015 ">
                            </path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                             width="15" height="15"
                             className={s.background_check_mark}
                             viewBox="0 0 48 48">
                            <path d="M 42.439453 9.4394531 L 16.5 35.378906 L 5.5605469 24.439453 A 1.50015 ">
                            </path>
                        </svg>
                    </div>
                    <div className={cn(s.check_mark, s.second_mark)}>
                        {
                            viewed && <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                           width="15" height="15"
                                           className={s.active_check_mark}
                                           viewBox="0 0 48 48">
                                <path d="M 42.439453 9.4394531 L 16.5 35.378906 L 11.1210938 30">
                                </path>
                            </svg>
                        }
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                             width="15" height="15"
                             className={s.background_check_mark}
                             viewBox="0 0 48 48">
                            <path d="M 42.439453 9.4394531 L 16.5 35.378906 L 11.1210938 30">
                            </path>
                        </svg>
                    </div>
                </div>}
                <span>
                    {getTimeWithoutSeconds(date.toDate())}
                </span>
                {isEdited && t("chat.edited")}
            </span>
        </div>
        {/*<img/>*/}

    </div>


}


/** */