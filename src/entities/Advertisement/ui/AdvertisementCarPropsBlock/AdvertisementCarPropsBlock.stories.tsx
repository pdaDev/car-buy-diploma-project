
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { AdvertisementCarPropsBlock } from "./AdvertisementCarPropsBlock";

export default {
    name: 'AdvertisementCarPropsBlock',
    component: AdvertisementCarPropsBlock as ComponentMeta<typeof AdvertisementCarPropsBlock>
}

export const Base: ComponentStory<typeof AdvertisementCarPropsBlock> = (args) => <AdvertisementCarPropsBlock {...args} />

Base.args = {
   
}
