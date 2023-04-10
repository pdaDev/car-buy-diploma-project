import {ComponentMeta, ComponentStory} from "@storybook/react";
import {ArrowButton} from "./ArrowButton";

export default {
    name: 'ArrowButton',
    component: ArrowButton as ComponentMeta<typeof ArrowButton>
}

export const Base: ComponentStory<typeof ArrowButton> = (args) => <ArrowButton {...args} />

Base.args = {
    size: 'small',
    direction: 'left'
}
