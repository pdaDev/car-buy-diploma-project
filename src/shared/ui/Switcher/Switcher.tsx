import {FC, useEffect, useLayoutEffect, useRef} from 'react'

import s from './Switcher.module.scss'
import {addPrefix, cn, useAutoRef} from "../../lib";
import {ElementSize, IOption} from "../../types";

type Value = string | number
export interface IProps {
    options: IOption[]
    activeOptions: Value | Value[] | null;
    onChange: Function
    canDisableActive?: boolean
    size?: ElementSize

}

export const Switcher: FC<IProps> = ({
                                         options,
                                         onChange,
                                         activeOptions,
                                         canDisableActive = false,
    size = 'medium'
                                     }) => {
    const isSingleMode = !Array.isArray(activeOptions)
    const onOptionClick = (option: Value, isActive: boolean) => {
        onChange(isSingleMode
            ? isActive ? !canDisableActive ? option : null : option
            : isActive ? activeOptions.filter(opt => opt !== option) : [...activeOptions, option]
        )
    }
    const ref = useAutoRef<HTMLDivElement>()
    const selectedOptionIndex = isSingleMode ? options
            .map((x, i) => x.value === activeOptions ? i : null)
            .filter(x => x !== null)[0]
        : null

    const activeOption = ref.current?.firstElementChild?.children[selectedOptionIndex!]


    return <div className={cn(s.switcher, addPrefix('size', size, s))} ref={ref}>
        <div className={cn(s.options_wrapper, isSingleMode && s.single_mode)}>
            {
                options.map((option, i) => {
                    const isActive = !isSingleMode
                        ? activeOptions.includes(option.value as Value)
                        : activeOptions === option.value
                    const hasRightActiveOption = (isActive && i !== options.length - 1 && !isSingleMode)
                        ? activeOptions.includes(options[i + 1].value as Value) : false
                    const hasLeftActiveOption = (isActive && i !== 0 && !isSingleMode)
                        ?  activeOptions.includes(options[i - 1].value as Value) : false

                    return <div className={
                        cn(
                            s.option,
                            !isSingleMode && s.multiple_option,
                            hasLeftActiveOption && s.has_left_option,
                            hasRightActiveOption && s.has_right_option,
                            isActive && s.active
                        )}
                                key={option.value}
                                onClick={() => onOptionClick(option.value as Value, isActive)}
                    >
                        {option.label}
                    </div>
                })
            }
        </div>
        { isSingleMode && (<>
            <div className={s.hidden_options}>
                { options.map(option => <div key={option.value} className={s.option}>{option.label}</div>) }
            </div>
            <div className={s.selected_value}
                 style={{
                     left: (activeOption?.getBoundingClientRect().x || 0) - (ref.current?.getBoundingClientRect()?.x || 0),
                     width: activeOption?.clientWidth
                 }}/>
        </>)}
    </div>
}
