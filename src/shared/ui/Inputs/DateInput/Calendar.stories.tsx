import {ComponentMeta, ComponentStory} from "@storybook/react";
import {DateInput} from "./DateInput";
import {Calendar} from "./Calendar";

export default {
    name: 'Calendar',
    component: Calendar as ComponentMeta<typeof Calendar>,
    argTypes: {
        min: {
            control: {
                type: 'date'
            }
        },
        max: {
            control: {
                type: 'date'
            }
        }
    }
}

export const Base: ComponentStory<typeof Calendar> = (args) => <Calendar {...args} />

const min = new Date()
const max = new Date()
min.setMonth(min.getMonth() - 1)
max.setDate(max.getDate() + 10)
min.setDate(min.getDate() + 5)

Base.args = {

}


