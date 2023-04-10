import {ComponentMeta, ComponentStory} from "@storybook/react";
import {ContactWithOwnerBlock} from "./ContactWithOwnerBlock";

export default {
    name: 'AdvertisementCard',
    component: ContactWithOwnerBlock as ComponentMeta<typeof ContactWithOwnerBlock>
}

export const Base: ComponentStory<typeof ContactWithOwnerBlock> = (args) => <ContactWithOwnerBlock {...args} />

Base.args = {
}