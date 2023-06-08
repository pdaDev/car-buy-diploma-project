import {FC} from "react";
import * as NS from '../../namespace'
import {
    Checkbox,
    ColorPicker,
    Container,
    CountSetter,
    Input,
    NumberInput,
    Register,
    Stack,
    TextArea
} from "../../../../shared";
import {Selector} from "../../../../shared/ui/Selector/Selector";
import {DateInput} from "../../../../shared/ui/Inputs/DateInput/DateInput";

interface IProps {
    register: Register
    value?: number | null | string
    name: string
    error: string | undefined
}

export const InputField: FC<NS.InputField<any> & IProps> = ({
                                                           register,
                                                           name,
                                                           value,
                                                           error,
                                                           type,
                                                           max,
                                                           min,
                                                           limit,
                                                           options
                                                       }) => {
    switch (type) {
        case 'text':
            return <TextArea register={register}
                             title={name}
                             error={error}
                             value={value?.toString() || ''}
                             maxLength={max}
            />
        case 'date':
            return <DateInput value={value as string}
                              title={name}
                              error={error}
                              size={'large'}
                              register={register}
            />
        case "counter":
            return <Stack hAlign={'start'} size={'width'}>
                <CountSetter value={value ? +value : 0}
                             title={name}
                             min={min || 0}
                             register={register}/>
            </Stack>
        case "boolean":
            return <Checkbox title={name}
                             error={error}
                             register={register}
            />
        case 'string':
            return <Input title={name}
                          error={error}
                          width={'full'}
                          register={register}
            />
        case 'color':
            return <ColorPicker
                title={name}
                error={error}
                register={register}
                value={value as any}
            />
        case 'selector':
            return <Selector options={options!}
                             title={name}
                             error={error}
                             current={value}
                             register={register}/>
        case "number":
            return <NumberInput register={register}
                                error={error}
                                width={'full'}
                                title={name}
            />
        default:
            return <Input title={name}
                          register={register}
            />

    }
}