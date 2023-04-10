
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { DoubleInputRange } from "./DoubleInputRange";

export default {
    name: 'DoubleInputRange',
    component: DoubleInputRange as ComponentMeta<typeof DoubleInputRange>
}

export const Base: ComponentStory<typeof DoubleInputRange> = (args) => <DoubleInputRange {...args} />

Base.args = {
   min: {
       placeholder: 'до',
       currentValue: 1
   },
    max: {
       placeholder: 'после',
       currentValue: 2,
    }
}
