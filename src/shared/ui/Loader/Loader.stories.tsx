
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { Loader } from "./Loader";

export default {
    name: 'Loader',
    component: Loader as ComponentMeta<typeof Loader>
}

export const Base: ComponentStory<typeof Loader> = (args) => <Loader {...args} />

Base.args = {
    type: 'circle',
    size: 'medium'
}
