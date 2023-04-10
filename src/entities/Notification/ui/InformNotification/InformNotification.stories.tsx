
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { InformNotification } from "./InformNotification";

export default {
    name: 'InformNotification',
    component: InformNotification as ComponentMeta<typeof InformNotification>
}

export const Base: ComponentStory<typeof InformNotification> = (args) => <InformNotification {...args} />

Base.args = {
   
}
