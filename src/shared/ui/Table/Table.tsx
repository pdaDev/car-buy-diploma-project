import {FC} from 'react'
import s from './Table.module.scss'
import {cn} from "../../lib";

export type Column<T extends object> = {
    id?: string;
    accessor: keyof T | Function;
    header: string
    onClickAction?: Function;
}

interface IProps<T extends object> {
    data: T[]
    columns: Array<Column<T>>
    withVerticalSeparator?: boolean
    withHorizontalSeparator?: boolean
}

export function Table<T extends object>({
                                            data,
                                            columns,
                                            withHorizontalSeparator,
                                            withVerticalSeparator
                                        }: IProps<T>) {

    const getKey = (col: Column<T>) => col?.id
        || (typeof col.accessor === 'function' ? col.header : col.accessor.toString())

    const getValue = (row: T, col: Column<T>) => typeof col.accessor === 'function'
        ? col.accessor(row)
        : row[col.accessor]

    return (
        <table className={cn(
            s.table,
            withVerticalSeparator && s.vertical_separator,
            withHorizontalSeparator && s.horizontal_separator
        )}>
            <thead>
            <tr>
                {
                    columns.map(col => <th key={getKey(col)}>{col.header}</th>)
                }
            </tr>
            </thead>
            <tbody>
            {
                data.length > 0 ? data.map((row, i) => <tr key={i}>{
                    columns.map(col => <td key={getKey(col)}
                                           onClick={() => col.onClickAction && col.onClickAction(row)}>{getValue(row, col)}</td>)
                }</tr>) : 'Таблица пустая'
            }
            </tbody>
        </table>
    )

}