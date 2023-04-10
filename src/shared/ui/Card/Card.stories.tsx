import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Card} from "./Card";
import {Box} from "../Layout";

export default {
    name: 'Card',
    component: Card as ComponentMeta<typeof Card>
}

export const Base: ComponentStory<typeof Card> = (args) => <Card {...args} >
    <Box w={15} h={15} background={'primary'}>

    </Box>
    <Box w={15} h={15} background={'primary'}>

    </Box>
</Card>

Base.args = {
    width: 150,
    height: 150,
}
