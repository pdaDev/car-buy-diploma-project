
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { AuthFormContainer } from "./AuthFormContainer";

export default {
    name: 'AuthFormContainer',
    component: AuthFormContainer as ComponentMeta<typeof AuthFormContainer>
}

export const Base: ComponentStory<typeof AuthFormContainer> = (args) => <AuthFormContainer {...args} />

Base.args = {
   
}
