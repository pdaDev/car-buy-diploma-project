import {
    ChangeEvent,
    FC,
    FocusEvent,
    KeyboardEvent,
    useMemo,
    MouseEventHandler,
    useEffect,
    useRef,
    useState
} from "react";

import s from './Selector.module.scss'
import {cn} from "../../lib";
import {use} from "i18next";
import {IOption} from "../../types";

type Value = string | number
type OptionPayload = Value[] | Value | null

interface IProps {
    options: IOption[];
    current: OptionPayload;
    onChange: Function
    withSearch?: boolean;
    placeholder?: string
    withNullableValue?: boolean
    countOfVisibleOptions?: number
}

export const Selector: FC<IProps> = ({
                                         options,
                                         current,
                                         onChange,
                                         withSearch = false,
                                         placeholder,
                                         withNullableValue = false,
                                         countOfVisibleOptions = 5
                                     }) => {
    const [isOpen, setOpenStatus] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>('')
    const [isInputValueAdding, setInputValueAddingStatus] = useState<boolean>(false)

    const timer = useRef<any>()
    const filterOptions = (option: IOption) => option?.label.indexOf(searchValue) > -1
    const findOption = (options.find(o => searchValue.length > 0 && o.label.indexOf(searchValue) === 0)) || null
    const findOptionLabel = findOption?.label || ''
    const isSingleMode = !Array.isArray(current)
    const findSlice = findOptionLabel.substring(searchValue.length, findOptionLabel.length)
    const currentOptionLabel = isSingleMode ? current !== null ? (options.find(o => o.value === current)?.label || '') : '' : ''

    useEffect(() => {
        setSearchValue(currentOptionLabel)
    }, [currentOptionLabel])


    const selectOption = (option: Value, isActive?: boolean) => () => {
        // @ts-ignore
        onChange(isSingleMode
            ? option
            : option !== null
                ? isActive
                    ? current.filter(opt => opt !== option)
                    : [...current, option]
                : []
        )
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
                onChange(isSingleMode
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
    }

    const onBlur = () => {
        timer.current = setTimeout(() => {
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


    const SearchInputComponent = <div className={cn(s.input_container, !withSearch && s.hide_pointer)}>
        <input type="text"
               value={searchValue}
               placeholder={placeholder || ''}
               onChange={onSearchChange}
        />
        <div className={s.mask}>
            <div className={s.hidden_part}>
                {searchValue.replace(' ', '.')}
            </div>
            <input className={s.visible_part} value={findSlice}/>
        </div>
    </div>

    const onCurrentWrapperClick: MouseEventHandler = (e) => {
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

    return <div className={s.selector_wrapper}
                tabIndex={0}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
    >
        <div className={cn(s.current_value_wrapper, !isSingleMode && s.multiple)} onClick={onCurrentWrapperClick}>
            {isSingleMode ? SearchInputComponent : <div className={s.multiple_options_wrapper}>
                {
                    !isSingleMode && currentOptions.length > 0 && currentOptions.map(option => <div key={option.value}
                                                                className={s.multiple_option}>
                        {option.label}
                        <div className={s.close} onClick={selectOption(option.value as Value, true)}>×</div>
                    </div>)
                }
                {
                    !isSingleMode && currentOptions.length === 0 && placeholder && <span className={s.placeholder_wrapper}>{placeholder}</span>
                }
            </div>}
        </div>

        <div className={cn(s.options_wrapper, isOpen && s.active)} style={{maxHeight: countOfVisibleOptions * 40}}>
            {showSearchInOptionsBlock && SearchInputComponent}
            <div className={s.options_container}>
                {optionsForRender.length > 0 ? optionsForRender.map(option => {
                    const isActive = isSingleMode
                        ? option.value === current
                        : current?.includes(option.value as Value)
                    return <div
                        className={cn(
                            s.option,
                            isActive && s.active)}
                        key={option.value}
                        tabIndex={0}
                        onClick={selectOption(option.value as Value, isActive)}
                    >
                        {option.label}
                    </div>
                }) : 'пусто'}
            </div>
        </div>
    </div>
}