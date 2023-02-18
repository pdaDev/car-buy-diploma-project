import {FC} from "react";

interface  IProps {
    options: Option[]
    current: string
    onChange: (key: string) => void
}

type Option = {
    label: string
    value: string | number
}
export const Selector: FC<IProps> = ({ options,  }) => {
    return <select>
        {
            options.map(option => <option value={option.value} key={option.value}>{ option.label }</option>)
        }
    </select>
}