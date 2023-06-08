import {
    ChangeEvent,
    FC,
    FocusEvent,
    KeyboardEvent,
    useMemo,
    MouseEventHandler,
    useEffect,
    useRef,
    useState, FocusEventHandler
} from "react";

import './Selector.scss'

import {addPrefix, cn, Register} from "../../lib";
import {use} from "i18next";
import {IOption} from "../../types";
import {InputWrapper} from "../Inputs";

type Value = string | number
type OptionPayload = Value[] | Value | null

interface IProps {
    options: IOption[];
    current?: OptionPayload;
    onChange?: Function
    withSearch?: boolean;
    placeholder?: string
    withNullableValue?: boolean
    countOfVisibleOptions?: number
    error?: string
    title?: string
    register?: Register
    position?: 'top' | 'bottom'
    defaultRegisterData?: string | undefined | number
    classNamePrefix?: string
    onFocus?: FocusEventHandler
}

export const Selector: FC<IProps> = ({
                                         options,
                                         current,
                                         position = 'bottom',
                                         onFocus: outFocus,
                                         onChange,
                                         withSearch = false,
                                         placeholder,
                                         withNullableValue = false,
                                         title,
                                         countOfVisibleOptions = 5,
                                         register,
                                         error,
                                         defaultRegisterData,
                                         classNamePrefix,
                                     }) => {

    const [isOpen, setOpenStatus] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>('')
    const [isInputValueAdding, setInputValueAddingStatus] = useState<boolean>(false)
    const [selfCurrentOption, setOption] = useState<IOption['value']>('')
    useEffect(() => {
        if (register && current && isSingleMode) {
            setOption(current as any)
        }
    }, [current])

    const currentOption = register ? selfCurrentOption : current

    const setSelfSingleOption = (value: IOption['value']) => {
        setOption(value)
        register && register.onChange({target: {value, name: register.name},})
    }


    useEffect(() => {
        if (defaultRegisterData) {
            setOption(defaultRegisterData)
        }
    }, [defaultRegisterData])

    const changeOptions = register ? setSelfSingleOption : onChange!
    const timer = useRef<any>()

    const filterOptions = (option: IOption) => option?.label.indexOf(searchValue) > -1
    const findOption = (options.find(o => searchValue.length > 0 && o.label.indexOf(searchValue) === 0)) || null
    const findOptionLabel = findOption?.label || ''
    const isSingleMode = register || !Array.isArray(current)
    const findSlice = findOptionLabel.substring(searchValue.length, findOptionLabel.length)
    const currentOptionLabel = isSingleMode ? currentOption !== null ? (options.find(o => o.value === currentOption)?.label || '') : '' : ''


    useEffect(() => {
        setSearchValue(currentOptionLabel)
    }, [currentOptionLabel])


    const selectOption = (option: Value, isActive?: boolean) => (e: MouseEvent) => {
        e.stopPropagation()
        // @ts-ignore
        changeOptions(isSingleMode
            ? option
            : option !== null
                ? isActive
                    ? current.filter(opt => opt !== option)
                    : [...current, option]
                : []
        )
        if (isSingleMode) {
            setOpenStatus(false)
        }
        setInputValueAddingStatus(false)
    }


    const toggleOpenStatus = () => setOpenStatus(!isOpen)
    const showSearchInOptionsBlock = !isSingleMode && withSearch
    const filteredOptions = isInputValueAdding ? options.filter(filterOptions) : options
    const optionsForRender = withNullableValue ? [{
        value: null,
        label: isSingleMode ? 'не выбрано' : 'очистить все'
    }, ...filteredOptions] : filteredOptions
    const onKeyDown = (e: KeyboardEvent) => {
        // @ts-ignore
        const optionsWrapper = e.currentTarget.children[1]
        const container = optionsWrapper.children[showSearchInOptionsBlock ? 1 : 0]
        const input = e.currentTarget.querySelector('input')
        // @ts-ignore
        const activeOption = [...container.children]
            .reduce<number>((acc, node, i) => node === e.target ? i : acc, -1)
        if (e.code === 'Enter') {
            if (findOption || activeOption > -1) {
                const objectToInsert = activeOption !== -1 ? optionsForRender[activeOption].value : findOption?.value
                changeOptions(isSingleMode
                    ? objectToInsert
                    : objectToInsert !== null ? current.includes(objectToInsert!)
                            ? activeOption === -1
                                ? current
                                : current.filter(o => o !== objectToInsert)
                            : [...current, objectToInsert]
                        : [])
                if (isSingleMode) {
                    setOpenStatus(false)
                }
                setInputValueAddingStatus(false)
                setSearchValue(isSingleMode ? findOptionLabel : '')
            }
        }
        if (e.code === 'ArrowUp') {
            if (activeOption > 0) {
                // @ts-ignore
                setTimeout(() => container.children[activeOption - 1].focus())
            } else {
                setTimeout(() => input?.focus())
                setOpenStatus(false)
            }
            e.preventDefault()
        }
        if (e.code === 'ArrowDown') {
            if (activeOption === -1) {
                setOpenStatus(true)
            }
            // @ts-ignore
            setTimeout(() => container.children[activeOption === container.children.length - 1 ? 0 : activeOption + 1].focus())
            e.preventDefault()
        }
    }

    const onFocus = (e: FocusEvent) => {
        clearTimeout(timer.current)
        outFocus && outFocus(e)
    }


    const onBlur = () => {
        timer.current = setTimeout(() => {
            register && register.onBlur()
            setOpenStatus(false)
            if (isSingleMode && withSearch) {
                setSearchValue(currentOptionLabel)
                setInputValueAddingStatus(false)
            }
        })
    }

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (withSearch) {
            setSearchValue(e.target.value)
            setInputValueAddingStatus(true)

            if (!showSearchInOptionsBlock) {
                setOpenStatus(true)
            }
        }
    }

    const getClassName = (className: string) => {
        return classNamePrefix ? cn(`${classNamePrefix}__${className}`, className) : className
    }

    const SearchInputComponent = <div className={cn(getClassName('input_container'), !withSearch && 'hide_pointer')}>
        <input type="text"
               value={searchValue}
               placeholder={placeholder || ''}
               onChange={onSearchChange}
        />
        {withSearch && <div className={getClassName('mask')}>
            <div className={getClassName('hidden_part')}>
                {searchValue.replace(' ', '.')}
            </div>
            <input className={getClassName('visible_part')} value={findSlice}/>
        </div>}
    </div>

    const onCurrentWrapperClick: MouseEventHandler = (e) => {
        e.stopPropagation()
        if (showSearchInOptionsBlock) {
            // @ts-ignore
            const input = e!.currentTarget!.parentNode!.children[1].firstElementChild!.firstElementChild!
            // @ts-ignore
            e.currentTarget.blur()
            // @ts-ignore
            setTimeout(() => input.focus(), 100)

        }
        toggleOpenStatus()
    }

    const currentOptions = useMemo(() => {
        return !isSingleMode
            ? options.filter(o => current.includes(o.value as Value))
            : [] as IOption[]
    }, [isSingleMode, options, current])

    // useEffect(() => {
    //     console.log(r.current)
    // }, [])


    return <InputWrapper title={title} error={error}>
        <div className={getClassName('selector_wrapper')}
             tabIndex={0}
             onFocus={onFocus}
             onBlur={onBlur}
             onKeyDown={onKeyDown}
        >
            <div className={cn(getClassName('current_value_wrapper'), !isSingleMode && 'multiple')}
                 onClick={onCurrentWrapperClick}>
                {isSingleMode ? SearchInputComponent : <div className={getClassName('multiple_options_wrapper')}>
                    {
                        !isSingleMode && currentOptions.length > 0 && currentOptions.map(option => <div
                            key={option.value}
                            className={getClassName('multiple_option')}>
                            {option.label}
                            <div className={getClassName('close')}
                                 onClick={selectOption(option.value as Value, true) as any}>×
                            </div>
                        </div>)
                    }
                    {
                        !isSingleMode && currentOptions.length === 0 && placeholder &&
                        <span className={getClassName('placeholder_wrapper')}>{placeholder}</span>
                    }
                </div>}
            </div>
            <div className={cn(getClassName('options_wrapper'), isOpen && 'active', `selector__pos_${position}`)}
                 style={{maxHeight: countOfVisibleOptions * 40}}>
                {showSearchInOptionsBlock && SearchInputComponent}
                <div className={getClassName('options_container')}>
                    {optionsForRender.length > 0 ? optionsForRender.map(option => {
                        const isActive = isSingleMode
                            ? option.value === current
                            : current?.includes(option.value as Value)
                        return <div
                            className={cn(
                                getClassName('option'),
                                isActive && 'active')}
                            key={option.value}
                            tabIndex={0}
                            onClick={selectOption(option.value as Value, isActive) as any}
                        >
                            {option.label}
                        </div>
                    }) : 'пусто'}
                </div>
            </div>
        </div>
    </InputWrapper>

}