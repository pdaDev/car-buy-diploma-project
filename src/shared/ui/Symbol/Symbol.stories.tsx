
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { Symbol } from "./Symbol";

export default {
    name: 'Symbol',
    component: Symbol as ComponentMeta<typeof Symbol>
}

export const Base: ComponentStory<typeof Symbol> = (args) => <Symbol {...args} />

Base.args = {
   
}
