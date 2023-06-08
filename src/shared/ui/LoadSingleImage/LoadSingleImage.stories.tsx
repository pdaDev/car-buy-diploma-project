
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { LoadSingleImage } from "./LoadSingleImage";

export default {
    name: 'LoadSingleImage',
    component: LoadSingleImage as ComponentMeta<typeof LoadSingleImage>
}

export const Base: ComponentStory<typeof LoadSingleImage> = (args) => <LoadSingleImage {...args} />

Base.args = {
   
}
