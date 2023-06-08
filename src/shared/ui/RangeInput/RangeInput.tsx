import {ChangeEvent, FC, KeyboardEvent, MouseEvent, useEffect, useLayoutEffect, useRef, useState} from 'react'

import s from './RangeInput.module.scss'
import {cn, debounce, formatNumber, getPercents} from "../../lib";
import {setSelectionRange} from "@testing-library/user-event/dist/utils";

type Value = number | null

interface IProps {
    min: number;
    max: number;
    current?: Value | Value[]
    type: 'single' | 'multiple'
    valuePostfix?: string
    onChange: (options: Value[]) => void
    parts?: number
    step?: number
    withoutNumberFormatting?: boolean
}

export const RangeInput: FC<IProps> = ({
                                           min,
                                           max,
                                           current,
                                           withoutNumberFormatting= false,
                                           onChange,
                                           type,
                                           parts,
                                           valuePostfix,
                                           step
                                       }) => {

    const rangeStep = step || (parts ? 100 / parts : null)


    const formatClickPosToStep = (pos: number) => {
        return rangeStep ? Math.round(pos / rangeStep) * rangeStep : pos;
    }
    const isMultipleType = type === 'multiple'
    const onTrackClick = (e: MouseEvent) => {
        if (ref.current) {
            let clickPos = formatClickPosToStep(Math.min((e.clientX - ref.current.getBoundingClientRect().x) / ref.current.clientWidth * 100, 100))
            clickPos = formatPosByStep(formatPosByStep(clickPos))
            if (isMultipleType) {
                if (!selectedThumb) {
                    const centerPos = minThumbPos + (maxThumbPos - minThumbPos)
                    if (clickPos < minThumbPos || clickPos <= centerPos) {
                        setMinThumbPos(clickPos)
                        selectThumb(0)
                    } else if (clickPos > maxThumbPos || clickPos >= centerPos) {
                        setMaxThumbPos(clickPos)
                        selectThumb(1)
                    }
                }
                changePoseAccordingThumbId(selectedThumb, clickPos)
            } else {
                setMaxThumbPos(clickPos)
            }
        }
    }

    const onRangeBlur = () => selectThumb(null)

    const ref = useRef<HTMLDivElement>(null)
    const [selectedThumb, selectThumb] = useState<number | null>(isMultipleType ? null : 1)
    // @ts-ignore
    const [maxThumbPos, setMaxThumbPos] = useState<number>(100)
    const [minThumbPos, setMinThumbPos] = useState<number>(0)
    const selectMinThumb = () => selectThumb(0)
    const selectMaxThumb = () => selectThumb(1)
    const formatPosByStep = (clickPos: number) => {
        if (step) {
            const posStep = (step / (max - min)) * 100
            const steps = Math.round(clickPos / posStep)
            return steps * posStep
        }
        return clickPos
    }
    const changePoseAccordingThumbId = (thumb: number | null, clickPos: number) => {
        if (thumb === 0) {
            setMinThumbPos(Math.min(maxThumbPos, Math.max(0, formatPosByStep(clickPos))))
        } else if (thumb === 1) {
            setMaxThumbPos(Math.min(100, Math.max(minThumbPos, formatPosByStep(clickPos))))
        }
    }
    const [capturedThumb, setCapturedThumb] = useState<number | null>(null)
    const onThumbPointerDown = (thumb: number) => (e: MouseEvent) => {
        setCapturedThumb(thumb)
    }

    const onMinThumbPointerDown = onThumbPointerDown(0)
    const onMaxThumbPointerDown = onThumbPointerDown(1)


    const thumb = useRef<HTMLDivElement>(null)

    const getAvailableMinPos = (pos: number) => Math.min(maxThumbPos, Math.max(0, pos))
    const getAvailableMaxPos = (pos: number) => Math.min(100, Math.max(minThumbPos, pos))


    useEffect(() => {
        if (current !== undefined) {
            const maxValue = isMultipleType ? (current as Value[])[1] : current as Value
            setMaxThumbPos(maxValue !== null ? (maxValue - min) / (max - min) * 100 : 100)
            if (isMultipleType) {
                const minValue = (current as Value[])[0]
                setMinThumbPos(minValue !== null ? (minValue - min) / (max - min) * 100 : 1)
            }
        }
    }, [current])
    useEffect(() => {
        const onPointerUp = () => {
            setCapturedThumb(null);
        }
        const onPointerMove = (e: MouseEvent<HTMLDivElement>) => {
            if (ref.current && thumb.current) {
                const thumbRadius = thumb.current.clientWidth / 2
                const d = isMultipleType
                    ? capturedThumb === 0 ? thumbRadius : -thumbRadius
                    : 0
                const pos = (e.clientX - ref.current.getBoundingClientRect().x + d) / ref.current.clientWidth * 100
                const clickPos = formatClickPosToStep(capturedThumb === 0 ? getAvailableMinPos(pos) : getAvailableMaxPos(pos))
                changePoseAccordingThumbId(capturedThumb, clickPos)
            }
        }

        if (capturedThumb !== null) {
            document.addEventListener('pointermove', onPointerMove as any)
            document.addEventListener('pointerup', onPointerUp)
            return () => {
                document.removeEventListener('pointermove', onPointerMove as any)
                document.removeEventListener('pointerup', onPointerUp)
            }
        }
    }, [ref, capturedThumb, thumb, isMultipleType])

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.code === 'ArrowLeft') {
            e.preventDefault()
            changePoseAccordingThumbId(selectedThumb, (selectedThumb === 0 ? minThumbPos : maxThumbPos) - (rangeStep || 1))
        }

        if (e.code === 'ArrowRight') {
            e.preventDefault()
            changePoseAccordingThumbId(selectedThumb, (selectedThumb === 0 ? minThumbPos : maxThumbPos) + (rangeStep || 1))
        }
    }
    const onMinValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMinThumbPos(formatClickPosToStep(Math.abs(Number(e.target.value)) / max * 100))
    }
    const onMaxValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxThumbPos(formatClickPosToStep(Math.abs(Number(e.target.value)) / max * 100))
    }
    const onMinValueInputBlur = () => {
        setMinThumbPos(getAvailableMinPos(minThumbPos))
    }
    const onMaxValueInputBlur = () => {
        setMaxThumbPos(getAvailableMaxPos(maxThumbPos))
    }

    const availableMinPos = getAvailableMinPos(minThumbPos)
    const availableMaxPos = getAvailableMaxPos(maxThumbPos)
    const roundValue = (value: number) => {
        if (step && step < 1) {
            const razrydnost = step.toString().split('.')[1].length
            return +value.toFixed(razrydnost)
        }

        return ~~value
    }


    const currentMaxValue = roundValue(max * maxThumbPos / 100)
    const currentMinValue = roundValue(((max - min) * minThumbPos / 100 + min))


    useEffect(() => onChange([
            currentMinValue,
            currentMaxValue
        ]),
        [currentMinValue, currentMaxValue])


    return <div className={s.wrapper} tabIndex={0} onBlur={onRangeBlur}>
        <div className={s.range_wrapper} tabIndex={0} onKeyDown={onKeyDown}>
            <div className={s.selected_range}
                 data-some-captured={capturedThumb !== null}
                 style={{left: getPercents(availableMinPos), width: getPercents(availableMaxPos - availableMinPos)}}
            />
            <div className={s.track}
                 onClick={onTrackClick} ref={ref}/>
            {isMultipleType && <div className={cn(s.thumb, s.min_thumb)}
                                    data-captured={capturedThumb === 0}
                                    style={{left: getPercents(availableMinPos)}}
                                    onClick={selectMinThumb}
                                    onPointerDown={onMinThumbPointerDown}
            />}
            <div className={cn(s.thumb, isMultipleType && s.max_thumb)}
                 data-captured={capturedThumb === 1}
                 ref={thumb}
                 style={{left: getPercents(availableMaxPos)}}
                 onClick={selectMaxThumb}
                 onPointerDown={onMaxThumbPointerDown}
            />
        </div>
        <div className={s.values}>
            <div className={s.value_wrapper}>
                <input type="text"
                       onBlur={onMinValueInputBlur}
                       value={withoutNumberFormatting ? currentMinValue: formatNumber(currentMinValue)}
                       onChange={onMinValueChange}/>
                {` ${valuePostfix || ''}`}
            </div>
            <div className={s.value_wrapper}>
                <input value={withoutNumberFormatting ? currentMaxValue: formatNumber(currentMaxValue)}
                       onChange={onMaxValueChange}
                       onBlur={onMaxValueInputBlur}
                />
                {` ${valuePostfix || ''}`}
            </div>
        </div>
    </div>
}
