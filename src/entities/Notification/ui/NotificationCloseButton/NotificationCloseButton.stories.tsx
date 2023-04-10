
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { NotificationCloseButton } from "./NotificationCloseButton";

export default {
    name: 'NotificationCloseButton',
    component: NotificationCloseButton as ComponentMeta<typeof NotificationCloseButton>
}

export const Base: ComponentStory<typeof NotificationCloseButton> = (args) => <NotificationCloseButton {...args} />

Base.args = {
   
}
