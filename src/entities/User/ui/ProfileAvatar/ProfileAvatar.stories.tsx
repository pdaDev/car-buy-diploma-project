
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { ProfileAvatar } from "./ProfileAvatar";

export default {
    name: 'ProfileAvatar',
    component: ProfileAvatar as ComponentMeta<typeof ProfileAvatar>
}

export const Base: ComponentStory<typeof ProfileAvatar> = (args) => <ProfileAvatar {...args} />

Base.args = {
   
}
