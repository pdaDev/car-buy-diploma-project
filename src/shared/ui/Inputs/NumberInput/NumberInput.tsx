import {ChangeEvent, FC, useEffect, useLayoutEffect, useRef, useState} from 'react'

import {IBaseInputProps, InputLayout} from "../InputLayout/InputLayout";
import {formatNumber, formatPhoneNumber, formatPrice, Register} from "../../../lib";
import {Label} from "../../Label/Label";
import s from './NumberInput.module.scss'
import {Input} from "../Input/Input";
type Value = number

interface IProps extends IBaseInputProps {
    value?: Value;
    onChange?: (value: string | number) => void
    register?: Register
    textAlign?: 'start' | 'end' | 'center'
    measure?: string

}

export const NumberInput: FC<IProps> = ({
                                            value,
                                            onChange,
                                            register,
                                            placeholder,
                                            measure,
                                            ...props
                                        }) => {



    const [meassureOffset, setMeasureOffset] = useState<number>(0)


    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value
        value = value.replace(/[^\d\\.]/g,'')
        e.target.value = formatNumber(value)
        if (onChange) {
            onChange(+value)
        } else if (register) {

            register.onChange({
                target: {
                    name: register.name,
                    value: value
                }
            })
        }
    }

    const measureRef = useRef<HTMLDivElement>(null)
    useLayoutEffect(() => {
        if (measure && measureRef.current) {
            setMeasureOffset(measureRef.current.clientWidth)
        }
    }, [measureRef])

    return <InputLayout {...props}>
        <input value={value ? formatNumber(value) : undefined}
               type={'text'}
               placeholder={placeholder}
               ref={register?.ref}
               name={register?.name}
               onBlur={register?.onBlur as any}
               style={{paddingRight: meassureOffset + 8}}
               onChange={onInputChange as any}
        />
        { measure && <div className={s.measure}>
            <Label label={measure} level={5} size={4} weight={'medium'}/>
        </div> }
    </InputLayout>
}