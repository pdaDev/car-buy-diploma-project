import {capitalize, getFirstSymbolInUpperCase, UserNicknameType} from "../../../shared";

export const getUserName = (type: UserNicknameType, first_name: string | null | undefined, last_name: string | null | undefined) => {
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