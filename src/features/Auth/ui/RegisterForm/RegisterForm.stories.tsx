
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { RegisterForm } from "./RegisterForm";

export default {
    name: 'RegisterForm',
    component: RegisterForm as ComponentMeta<typeof RegisterForm>
}

export const Base: ComponentStory<typeof RegisterForm> = (args) => <RegisterForm {...args} />

Base.args = {
   
}
