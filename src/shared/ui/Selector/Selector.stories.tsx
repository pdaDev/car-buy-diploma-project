import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Selector as Component} from "./Selector";
import {FC, useState} from "react";
import {IOption} from "../../types";


interface IProps {
    options: IOption[]
    sType: 'single' | 'multiple'
    withSearch: boolean
    withNullableValue: boolean
    placeholder: string

}

const Selector: FC<IProps> = ({options, sType, withNullableValue, withSearch}) => {
    const [state, setState] = useState<any>(sType === "single" ? null : [])
    return <div style={{width: 200}}>
        <Component options={options}
                   current={state}
                   onChange={setState}
                   withSearch={withSearch}
                   placeholder={''}
                   countOfVisibleOptions={5}
                   withNullableValue={withNullableValue}
        />
    </div>
}

export default {
    name: 'Selector',
    component: Selector as ComponentMeta<typeof Selector>,
    argTypes: {
        sType: {
            options: ['single', 'multiple'],
            control: {
                type: 'radio'
            }
        }
    }
}


export const Base: ComponentStory<typeof Selector> = (args) => <Selector {...args} />

Base.args = {
    options: [
        {value: 'long', label: 'атомный гидротрансформатор емае'},
        {value: 'red', label: 'красный'},
        {value: 'green', label: 'зеленый'},
        {value: 'blue', label: 'голубой'}
    ],
    withSearch: true,
    withNullableValue: true,
}