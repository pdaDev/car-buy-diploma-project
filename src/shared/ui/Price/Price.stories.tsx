
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { Price } from "./Price";

export default {
    name: 'Price',
    component: Price as ComponentMeta<typeof Price>
}

export const Base: ComponentStory<typeof Price> = (args) => <Price {...args} />

Base.args = {
   
}
