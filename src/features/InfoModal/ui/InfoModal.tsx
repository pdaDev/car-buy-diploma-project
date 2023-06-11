import {FC, MouseEventHandler, useState} from 'react'

import s from './InfoModal.module.scss'
import {closeSymbol, cn, Label, Text, useBlurFocus} from "shared";


interface IProps {
    title: string
    message: string
    behavior?: 'hover' | 'click'
    closeBehavior: 'button' | 'blur'
}

export const InfoModal: FC<IProps> = ({
                                          title,
                                          message,
                                          behavior,
                                          closeBehavior
                                      }) => {

    const maxWidth = 400
    const [showModal, setShowModalStatus] = useState<boolean>(false)

    const { onFocus, onBlur } = useBlurFocus(() => (behavior === 'click' && closeBehavior === 'blur')
        && setShowModalStatus(false))
    const onSearchIconClick: MouseEventHandler = () => {
        if (behavior === 'click') {
            setShowModalStatus(!showModal)
        }
    }

    const onCloseButtonClick: MouseEventHandler = () => setShowModalStatus(false)
    return (
        <div className={cn(
            s.info_modal_wrapper,
            behavior === 'hover' && s.hover_behavior

        )}
             tabIndex={0}
             onBlur={onBlur}
             onFocus={onFocus}
        >
            <div className={cn(s.search_icon)}
                 style={{cursor: behavior === 'click' ? 'pointer' : ''}}
                 onClick={onSearchIconClick}>
                ?
            </div>
            <div className={cn(s.modal_content, showModal && s.active)} style={{maxWidth}}>
                <Label label={title} level={2} weight={'medium'}/>
                <Text size={3}>
                    {message}
                </Text>
                { closeBehavior === 'button' && (
                    <div className={s.close_button} onClick={onCloseButtonClick} >{ closeSymbol }</div>
                ) }
            </div>
        </div>)
}
