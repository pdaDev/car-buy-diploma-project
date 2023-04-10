
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { List } from "./List";

export default {
    name: 'List',
    component: List as ComponentMeta<typeof List>
}

export const Base: ComponentStory<typeof List> = (args) => <List {...args} />

Base.args = {
   
}
