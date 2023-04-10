import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Tooltip} from "./Tooltip";
import {Container} from "../Layout";

export default {
    name: 'Tooltip',
    component: Tooltip as ComponentMeta<typeof Tooltip>,
}

export const Base: ComponentStory<typeof Tooltip> = (args) => <Container contentAlign={'center'}>
    <Tooltip {...args} >TEXT</Tooltip></Container>

Base.args = {
    text: 'это тестовый тул тип',
    position: {
        type: 'auto',
        defaultPos: 'right'
    },
}
