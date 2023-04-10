
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { SortBLock } from "./SortBLock";

export default {
    name: 'SortBLock',
    component: SortBLock as ComponentMeta<typeof SortBLock>
}

export const Base: ComponentStory<typeof SortBLock> = (args) => <SortBLock {...args} />

Base.args = {
   
}
