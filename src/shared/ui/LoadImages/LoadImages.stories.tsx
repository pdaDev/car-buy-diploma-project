
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { LoadImages } from "./LoadImages";

export default {
    name: 'LoadImages',
    component: LoadImages as ComponentMeta<typeof LoadImages>
}

export const Base: ComponentStory<typeof LoadImages> = (args) => <LoadImages {...args} />

Base.args = {
   
}
