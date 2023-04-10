import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Message} from "./Message";

export default {
    name: 'Message',
    component: Message as ComponentMeta<typeof Message>
}

export const Base: ComponentStory<typeof Message> = (args) => <Message {...args} />

Base.args = {
    image: null,
    message: 'слываоывлалоолыдлоаолдалодыалоджао',
    date: new Date().toLocaleTimeString(),
    type: 'me'
}
