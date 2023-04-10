import {ComponentMeta, ComponentStory} from "@storybook/react";
import { Label } from "./Label";

export default {
    name: 'Label',
    component: Label as ComponentMeta<typeof Label>
}

export const Base: ComponentStory<typeof Label> = (args) => <Label {...args} />

Base.args = {
    label: 'text',
    loadingWidth: 40
}