
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { ResetPasswordForm } from "./ResetPasswordForm";

export default {
    name: 'ResetPasswordForm',
    component: ResetPasswordForm as ComponentMeta<typeof ResetPasswordForm>
}

export const Base: ComponentStory<typeof ResetPasswordForm> = (args) => <ResetPasswordForm {...args} />

Base.args = {
   
}
