
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { Slider } from "./Slider";

export default {
    name: 'Slider',
    component: Slider as ComponentMeta<typeof Slider>
}

export const Base: ComponentStory<typeof Slider> = (args) => <Slider {...args} />

Base.args = {
   
}
