
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { SeparatedInput } from "./SeparatedInput";

export default {
    name: 'SeparatedInput',
    component: SeparatedInput as ComponentMeta<typeof SeparatedInput>
}

export const Base: ComponentStory<typeof SeparatedInput> = (args) => <SeparatedInput {...args} />

Base.args = {
    dataToCompare: '3123',
    onSuccessAction: () => console.log('success')
}
