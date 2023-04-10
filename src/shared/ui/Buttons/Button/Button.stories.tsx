
import { Button } from "./Button";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    name: 'Button',
    component: Button as ComponentMeta<typeof Button>
}

export const Base: ComponentStory<typeof Button> = (args) => <Button {...args} />

Base.args = {
    type: 'primary',
    label: 'button large',
    withRippleEffect: true
}