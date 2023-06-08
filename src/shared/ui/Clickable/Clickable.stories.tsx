
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { Clickable } from "./Clickable";

export default {
    name: 'Clickable',
    component: Clickable as ComponentMeta<typeof Clickable>
}

export const Base: ComponentStory<typeof Clickable> = (args) => <Clickable {...args} />

Base.args = {
   
}
