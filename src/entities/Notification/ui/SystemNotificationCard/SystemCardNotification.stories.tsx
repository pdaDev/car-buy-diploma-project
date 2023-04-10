import {ComponentMeta, ComponentStory} from "@storybook/react";
import { SystemNotificationCard } from "./SystemNotificationCard";

export default {
    name: 'SystemNotificationCard',
    component: SystemNotificationCard as ComponentMeta<typeof SystemNotificationCard>
}

export const Base: ComponentStory<typeof SystemNotificationCard> = (args) => <SystemNotificationCard {...args} />

Base.args = {
    type: 'success',
    message: 'текст',
    extra: {
        close: () => {}
    }
}
