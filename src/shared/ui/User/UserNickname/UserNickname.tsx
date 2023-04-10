import { FC } from 'react'

import s from './UserNickname.module.scss'
import {IUserCommonData, Nullable, NullableAndUndefined} from "../../../types";
import {Label} from "../../Label/Label";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;
import {capitalize} from "../../../lib";

interface IProps extends NullableAndUndefined<Pick<IUserCommonData, 'first_name'| 'last_name'> >{
    type?: 'full' | 'only-first-name' | 'only-last-name' | 'with-short-first-name' | 'with-short-last-name',
    loading?: boolean
}
export const UserNickname: FC<IProps> = ({
    first_name,
    last_name,
    type = 'with-short-last-name',
    loading
}) => {
    const getFirstSymbolInUpperCase = (text: string | null | undefined) => (text && text.length >= 1) ? text[0].toUpperCase() : ''
    const loadingStatus = loading ?? (!first_name || !last_name)
    const getName = () => {
        switch (type) {
            case 'full':
                return `${capitalize(last_name)} ${capitalize(first_name)}`
            case 'only-first-name':
                return capitalize(first_name)
            case 'only-last-name':
                return capitalize(last_name)
            case 'with-short-first-name':
                return `${capitalize(last_name)} ${getFirstSymbolInUpperCase(first_name)}.`
            case 'with-short-last-name':
                return `${capitalize(first_name)} ${getFirstSymbolInUpperCase(last_name)}.`

        }
    }
    return <Label label={getName()} loading={loadingStatus}/>
}
