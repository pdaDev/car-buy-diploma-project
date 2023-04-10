
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { ThreeDotsButton } from "./ThreeDotsButton";

export default {
    name: 'ThreeDotsButton',
    component: ThreeDotsButton as ComponentMeta<typeof ThreeDotsButton>
}

export const Base: ComponentStory<typeof ThreeDotsButton> = (args) => <ThreeDotsButton {...args} />

Base.args = {
   onClick: () => {}
}
