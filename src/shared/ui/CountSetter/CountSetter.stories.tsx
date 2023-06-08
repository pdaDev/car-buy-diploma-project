
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { CountSetter } from "./CountSetter";

export default {
    name: 'CountSetter',
    component: CountSetter as ComponentMeta<typeof CountSetter>
}

export const Base: ComponentStory<typeof CountSetter> = (args) => <CountSetter {...args} />

Base.args = {

}
