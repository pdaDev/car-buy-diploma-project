import {ComponentMeta, ComponentStory} from "@storybook/react";
import { Switcher, IProps as SwitcherProps } from "./Switcher";
import {FC, useState} from "react";
import {IOption} from "../../types";

type Props = {
    type: 'single' | 'multiple'
} & Pick<SwitcherProps, 'options'>

const SwitcherWrapper: FC<Props> = ({ options, type }) => {
    const isSingle = type === 'single'
    const [current, setCurrent] = useState<any>(isSingle ?  options[0].value : [])

    return <Switcher options={options} activeOptions={current} onChange={setCurrent} />
}
export default {
    name: 'Switcher',
    component: SwitcherWrapper as ComponentMeta<typeof SwitcherWrapper>,
    argTypes: {
        type: {
            options: ['single', 'multiple'],
            type: 'radio'
        }
    }
}

export const Base: ComponentStory<typeof SwitcherWrapper> = (args) => <SwitcherWrapper {...args} />

Base.args = {
       options: [
           { value: 'new', label: 'новый' },
           { value: 'old', label: 'старый' },
           { value: 'some', label: 'некоторый' },
           { value: 'bug', label: 'ошибка' },
           { value: 'kek', label: 'юмор' }
       ],
    type: 'single'
}
