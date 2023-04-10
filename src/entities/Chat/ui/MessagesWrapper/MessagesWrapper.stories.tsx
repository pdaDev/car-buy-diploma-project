
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { MessagesWrapper } from "./MessagesWrapper";

export default {
    name: 'MessagesWrapper',
    component: MessagesWrapper as ComponentMeta<typeof MessagesWrapper>
}

export const Base: ComponentStory<typeof MessagesWrapper> = (args) => <MessagesWrapper {...args} />

Base.args = {
   
}
