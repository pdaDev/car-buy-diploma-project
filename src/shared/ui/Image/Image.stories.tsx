
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { Image } from "./Image";

export default {
    name: 'Image',
    component: Image as ComponentMeta<typeof Image>
}

export const Base: ComponentStory<typeof Image> = (args) => <Image {...args} />

Base.args = {
   
}
