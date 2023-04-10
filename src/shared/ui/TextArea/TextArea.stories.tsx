
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { TextArea } from "./TextArea";

export default {
    name: 'TextArea',
    component: TextArea as ComponentMeta<typeof TextArea>
}

export const Base: ComponentStory<typeof TextArea> = (args) => <TextArea {...args} />

Base.args = {
   
}
