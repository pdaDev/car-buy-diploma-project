
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { PriceChangesGraph } from "./PriceChangesGraph";

export default {
    name: 'PriceChangesGraph',
    component: PriceChangesGraph as ComponentMeta<typeof PriceChangesGraph>
}

export const Base: ComponentStory<typeof PriceChangesGraph> = (args) => <PriceChangesGraph {...args} />

Base.args = {
   
}
