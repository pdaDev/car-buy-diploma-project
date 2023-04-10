import {ComponentMeta, ComponentStory} from "@storybook/react";
import {ChatNotificationCard} from "./ChatNotificationCard";

export default {
    name: 'ChatNotificationCard',
    component: ChatNotificationCard as ComponentMeta<typeof ChatNotificationCard>
}

export const Base: ComponentStory<typeof ChatNotificationCard> = (args) => <ChatNotificationCard {...args} />

Base.args = {
    message: 'ответь мне на сообщение',
    avatar: null,
    name: 'Дмитрий П.',
    extra: {
        close: () => {}
    }
}
