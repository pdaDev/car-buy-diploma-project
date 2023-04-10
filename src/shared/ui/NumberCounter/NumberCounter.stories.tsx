
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { NumberCounter } from "./NumberCounter";

export default {
    name: 'NumberCounter',
    component: NumberCounter as ComponentMeta<typeof NumberCounter>
}

export const Base: ComponentStory<typeof NumberCounter> = (args) => <NumberCounter {...args} />

Base.args = {
   
}
