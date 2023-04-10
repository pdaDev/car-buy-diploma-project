import {ChangeEvent, FC} from 'react'

import {IBaseInputProps, InputLayout} from "../InputLayout/InputLayout";
import {formatNumber, formatPrice} from "../../../lib";

type Value = number

interface IProps extends IBaseInputProps {
    value?: Value;
    onChange?: (value: string | number) => void
    register?: Object
    textAlign?: 'start' | 'end' | 'center'

}

export const NumberInput: FC<IProps> = ({
                                            value,
                                            onChange,
                                            register,
                                            placeholder,
                                            ...props
}) =>
{
    const registerObject = register || {}

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            const value = e.target.value
            onChange(+value)
        }
    }


    return <InputLayout {...props}>
        <input value={value}
               type={"number"}
               placeholder={placeholder}
               {...registerObject}
               onChange={onInputChange}/>
    </InputLayout>
}