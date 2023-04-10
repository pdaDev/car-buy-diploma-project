
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { RangeInput } from "./RangeInput";

export default {
    name: 'RangeInput',
    component: RangeInput as ComponentMeta<typeof RangeInput>
}

export const Base: ComponentStory<typeof RangeInput> = (args) => <RangeInput {...args} />

Base.args = {
    type: 'multiple',
    min: 100,
    max: 1000,
}
