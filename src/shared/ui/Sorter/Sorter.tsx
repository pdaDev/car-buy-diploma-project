import {FC} from 'react'

import s from './Sorter.module.scss'

export interface IProps {
    sort: string
    currentSort: string | null
    label: string
    onChange: Function
    descendingProps?: {
        key: string
        pos: 'start' | 'end'
    }
}

export const Sorter: FC<IProps> = ({
                                       label,
                                       currentSort,
                                       sort,
                                       onChange,
                                       descendingProps

                                   }) => {
    const descendingKey = descendingProps?.key || '-'
    const descendingKeyPos = descendingProps?.pos || 'start'
    const descRegex = new RegExp(descendingKey)
    const isDescending = descRegex.test(currentSort || '')
    const invertSortDirection = (sort: string) => {
        return descRegex.test(sort)
            ? sort.replace(descRegex, '')
            : descendingKeyPos === 'start'
                ? `${descendingKey}${sort}`
                : `${sort}${descendingKey}`
    }

    const isActive = (currentSort || '').indexOf(sort) !== -1

    const onSort = () => {
        onChange(isActive
            ? !isDescending
                ? invertSortDirection(currentSort || '')
                : null
            : sort
        )
    }


    return <div className={s.wrapper} data-active={isActive} onClick={onSort}>
        <div className={s.label} data-active={isActive}>
            {label}
        </div>
        {isActive && (
            <div className={s.direction_pointer}>
                <div className={s.lines_wrapper} data-descending={isDescending}>
                    <div className={s.first_line}/>
                    <div className={s.second_line}/>
                    <div className={s.third_line}/>
                </div>
            </div>
        )}
    </div>
}
