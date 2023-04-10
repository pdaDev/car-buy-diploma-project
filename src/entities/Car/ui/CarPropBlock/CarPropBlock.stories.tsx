
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { CarPropBlock } from "./CarPropBlock";

export default {
    name: 'CarPropBlock',
    component: CarPropBlock as ComponentMeta<typeof CarPropBlock>
}

export const Base: ComponentStory<typeof CarPropBlock> = (args) => <CarPropBlock {...args} />

Base.args = {
   
}
