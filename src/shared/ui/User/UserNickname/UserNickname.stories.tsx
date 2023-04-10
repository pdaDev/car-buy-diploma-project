
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { UserNickname } from "./UserNickname";

export default {
    name: 'UserNickname',
    component: UserNickname as ComponentMeta<typeof UserNickname>
}

export const Base: ComponentStory<typeof UserNickname> = (args) => <UserNickname {...args} />

Base.args = {
   
}
