
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { PasswordInput } from "./PasswordInput";

export default {
    name: 'PasswordInput',
    component: PasswordInput as ComponentMeta<typeof PasswordInput>
}

export const Base: ComponentStory<typeof PasswordInput> = (args) => <PasswordInput {...args} />

Base.args = {
   
}
