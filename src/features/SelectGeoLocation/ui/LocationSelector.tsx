import {FC, KeyboardEvent, useRef, useState} from "react";
import s from './SelectGeoLocation.module.scss'
import {IServerGeoLocationItem} from "../namespace";
import {Label} from "shared";
import {getGeoItemLabel} from "../lib/helpers";
import Icon from "@mdi/react";
import {mdiClose, mdiMagnify} from "@mdi/js/commonjs/mdi";

interface IProps {
    loading: boolean
    query: string
    onQueryChange: Function
    items: IServerGeoLocationItem[]
    onSelect: (arg: IServerGeoLocationItem) => void
    placeholder: string
}


export const LocationSelector: FC<IProps> = ({
                                                 loading,
                                                 query,
                                                 onQueryChange,
                                                 items,
                                                 onSelect,
                                                 placeholder
                                             }) => {

    const clearQuery = () => onQueryChange('')
    const [isOpen, setOpen] = useState<boolean>(false)
    const timer = useRef<any>(0)
    const onFocus = () => {
        console.log(timer.current)
        clearTimeout(timer.current)
        setOpen(true)
    }

    const isOptionsShow = isOpen && items.length > 0
    const onKeyDown = (e: KeyboardEvent) => {
        // @ts-ignore
        const container = e.currentTarget.children[1]
        const input = e.currentTarget.querySelector('input')
        // @ts-ignore
        const activeOption = [...container.children]
            .reduce<number>((acc, node, i) => node === e.target ? i : acc, -1)
        if (e.code === 'Enter') {
            if (activeOption > -1) {
                onSelect(items[activeOption])
                setOpen(false)
            }
        }
        if (e.code === 'ArrowUp') {
            if (activeOption > 0) {
                // @ts-ignore
                setTimeout(() => container.children[activeOption - 1].focus())
            } else {
                setTimeout(() => input?.focus())
                setOpen(false)
            }
            e.preventDefault()
        }
        if (e.code === 'ArrowDown') {
            if (activeOption === -1) {
                setOpen(true)
            }
            // @ts-ignore
            setTimeout(() => container.children[activeOption === container.children.length - 1 ? 0 : activeOption + 1].focus())
            e.preventDefault()
        }
    }

    const onBlur = () => {
        timer.current = setTimeout(() => {
            // if (items.length > 0) {
            //     onSelect(items[0])
            // }
            setOpen(false)
        })
    }

    return (
        <div className={s.selector} onFocus={onFocus}
             onBlur={onBlur}
             onKeyDown={onKeyDown}>
            <div className={s.input_wrapper}>
                <span className={s.search_icon}>
                    <Icon size={1} path={mdiMagnify}/>
                </span>

                <input value={query}
                       placeholder={placeholder}
                       onChange={e => onQueryChange(e.target.value)}
                />
                {query.length > 0 ? <div className={s.clear_query} onClick={clearQuery} tabIndex={0}>
                    {loading ? <svg className={s.loader}>
                        <circle cx={10}
                                cy={10}
                                className={s.circle}
                                r={9}
                                strokeWidth={2}
                                strokeLinecap={"round"}
                                strokeDasharray={100}
                                strokeDashoffset={50}
                        />
                    </svg> : <Icon path={mdiClose} size={1}/>}

                </div> : null}
            </div>

            {
                isOptionsShow && <div className={s.options}>
                    {items.map(item => <div className={s.option}
                                            onClick={() => onSelect(item)}
                                            tabIndex={0}
                    >
                        <Label label={getGeoItemLabel(item)} level={3}/>
                        {item.parents && item.parents.length > 0 && <Label type={'secondary'}
                                                                           level={4}
                                                                           label={getGeoItemLabel(item.parents[0])}/>}
                    </div>)}
                </div>
            }
        </div>
    )
}