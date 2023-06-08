
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { ColorPicker } from "./ColorPicker";

export default {
    name: 'ColorPicker',
    component: ColorPicker as ComponentMeta<typeof ColorPicker>
}

export const Base: ComponentStory<typeof ColorPicker> = (args) => <ColorPicker {...args} />

Base.args = {
   
}
