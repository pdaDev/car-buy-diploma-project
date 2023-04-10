
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { Input } from "./Input";

export default {
    name: 'Input',
    component: Input as ComponentMeta<typeof Input>
}

export const Base: ComponentStory<typeof Input> = (args) => <Input {...args} />

Base.args = {
   
}
