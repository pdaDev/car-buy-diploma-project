
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { AuthForm } from "./AuthForm";

export default {
    name: 'AuthForm',
    component: AuthForm as ComponentMeta<typeof AuthForm>
}

export const Base: ComponentStory<typeof AuthForm> = (args) => <AuthForm {...args} />

Base.args = {
   
}
