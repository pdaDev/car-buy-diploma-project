
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { UserAvatar } from "./UserAvatar";

export default {
    name: 'UserAvatar',
    component: UserAvatar as ComponentMeta<typeof UserAvatar>
}

export const Base: ComponentStory<typeof UserAvatar> = (args) => <UserAvatar {...args} />

Base.args = {
   
}
