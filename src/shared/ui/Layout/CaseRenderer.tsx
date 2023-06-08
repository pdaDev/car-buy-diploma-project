import {FC, ReactNode} from "react";

interface IOption {
    code: string | number
    render: ReactNode

}
interface IProps {
    options: IOption[]
    current: string | number | null
    defaultRender: ReactNode
}

export const CaseRenderer:  FC<IProps> = ({ options, defaultRender, current  }) => {
    return <>
        { options.find(o => o.code === current)?.render || defaultRender }
    </>
}
