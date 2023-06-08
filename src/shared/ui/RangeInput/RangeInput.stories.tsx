
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { RangeInput } from "./RangeInput";

export default {
    name: 'RangeInput',
    component: RangeInput as ComponentMeta<typeof RangeInput>
}

export const Base: ComponentStory<typeof RangeInput> = (args) => <RangeInput {...args} />

Base.args = {
    type: 'multiple',
    min: 1,
    max: 10,
    step: 1,
    current: [1, 2],
}
