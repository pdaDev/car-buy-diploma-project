
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { AdvertisementTitleBlock } from "./AdvertisementTitleBlock";

export default {
    name: 'AdvertisementTitleBlock',
    component: AdvertisementTitleBlock as ComponentMeta<typeof AdvertisementTitleBlock>
}

export const Base: ComponentStory<typeof AdvertisementTitleBlock> = (args) => <AdvertisementTitleBlock {...args} />

Base.args = {
   
}
