import {ComponentMeta, ComponentStory} from "@storybook/react";
import { CircleDiagram as Label } from "./CircelDiagram";

export default {
    name: 'Label',
    component: Label as ComponentMeta<typeof Label>
}

export const Base: ComponentStory<typeof Label> = (args) => <Label {...args} />

Base.args = {
    part: 1,
    parts: 3
}