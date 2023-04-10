import {ChangeEvent, FC, FocusEvent, KeyboardEvent, useEffect, useRef, useState} from 'react'

import s from './SeparatedInput.module.scss'
import {cn, useForceUpdate} from "../../lib";

interface IProps {
    onSuccessAction: Function
    dataToCompare: string
    type: 'text' | 'number'
}

export const SeparatedInput: FC<IProps> = ({
                                               onSuccessAction,
                                               dataToCompare,
                                               type
                                           }) => {
    const [text, setText] = useState<string[]>(new Array(dataToCompare.length))
    const [index, setIndex] = useState(0)
    const isSuccess = text.join('') === dataToCompare
    const container = useRef<HTMLDivElement>(null)
    const goToNext = () => setIndex(Math.min(dataToCompare.length - 1, index + 1))
    const goToPrev = () => setIndex(Math.max(0, index - 1))
    useEffect(() => {
        if (isSuccess) {
            onSuccessAction()
        }
    }, [isSuccess, onSuccessAction])

    useEffect(() => {
        if (container.current) {
            // @ts-ignore
            container.current.children[index].focus()
        }
    }, [index])

    useEffect(() => {
        const onClipboardPaste = () => {
            navigator.clipboard.readText().then(data => {
                const copy = [...text]
                for (let i = index; i < Math.min(text.length, index + data.length); i++) {
                    copy[i] = data[i - index]
                }
                setText(copy)
                setIndex(Math.min(text.length - 1, index + data.length))
            })
        }
        document.addEventListener('paste', onClipboardPaste)
        return () => document.removeEventListener('paste', onClipboardPaste)
    }, [index, text])
    const onKeyDown = (e: KeyboardEvent) => {
        if (['Backspace', 'ArrowLeft'].includes(e.code)) {
            goToPrev()
        }
        if (['Backspace', 'Delete'].includes(e.code)) {
            changeChar('')
        }
        if (e.code === 'ArrowRight') {
            goToNext()
        }
    }


    const changeChar = (char: string) => {
        const copy = [...text]
        copy[index] = char
        setText(copy)
    }
    const onInputClick = (n: number) => () => {
        setIndex(n)
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const indexFoCapture = e.target.selectionStart === 1
            ? 0
            : e.target.value.length - 1
        if (e.target.value[indexFoCapture]) {
            changeChar(e.target.value[indexFoCapture])
            goToNext()
        }
    }

    return <div className={s.inputs_container} ref={container}>
        {
            [...new Array(dataToCompare.length)].map((x, i) => (
                <input type={type}
                       key={i}
                       value={text[i]?.toUpperCase() || ''}
                       onKeyDown={onKeyDown}
                       onClick={onInputClick(i)}
                       onChange={onInputChange}
                       className={cn(isSuccess && s.success, s.input_el, text[i] && s.has_symbol)}
                />
            ))
        }
    </div>
}
