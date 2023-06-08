
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { ColoredIcon } from "./ColoredIcon";

export default {
    name: 'ColoredIcon',
    component: ColoredIcon as ComponentMeta<typeof ColoredIcon>
}

export const Base: ComponentStory<typeof ColoredIcon> = (args) => <ColoredIcon {...args} />

Base.args = {
   
}
