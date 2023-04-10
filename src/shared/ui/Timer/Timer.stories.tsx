
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { Timer } from "./Timer";

export default {
    name: 'Timer',
    component: Timer as ComponentMeta<typeof Timer>
}

export const Base: ComponentStory<typeof Timer> = (args) => <Timer {...args} />

Base.args = {
    active: true,
    countOfSec: 140
}
