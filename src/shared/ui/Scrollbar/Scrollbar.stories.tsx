
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { Scrollbar } from "./Scrollbar";

export default {
    name: 'Scrollbar',
    component: Scrollbar as ComponentMeta<typeof Scrollbar>
}

export const Base: ComponentStory<typeof Scrollbar> = (args) => <Scrollbar {...args} />

Base.args = {
   
}
