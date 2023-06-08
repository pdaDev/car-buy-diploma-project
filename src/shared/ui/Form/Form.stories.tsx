
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { Form } from "./Form";

export default {
    name: 'Form',
    component: Form as ComponentMeta<typeof Form>
}

export const Base: ComponentStory<typeof Form> = (args) => <Form {...args} />

Base.args = {
   
}
