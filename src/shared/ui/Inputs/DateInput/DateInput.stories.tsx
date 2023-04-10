import {ComponentMeta, ComponentStory} from "@storybook/react";
import { DateInput as Component, IProps } from "./DateInput";
import {FC, useState} from "react";


const DateInput: FC<Omit<IProps, 'value' | 'onChange'>> = (props) => {
    const [date, setDate] = useState(null)
    return <Component  value={date} onChange={setDate} {...props}/>
}
export default {
    name: 'DateInput',
    component: DateInput as ComponentMeta<typeof DateInput>
}



export const Base: ComponentStory<typeof DateInput> = (args) => <DateInput {...args} />

Base.args = {
    closeBehavior: 'blur'
}
