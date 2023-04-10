
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { Details } from "./Details";

export default {
    name: 'Details',
    component: Details as ComponentMeta<typeof Details>
}

export const Base: ComponentStory<typeof Details> = (args) => <Details {...args} />

Base.args = {
   
}
