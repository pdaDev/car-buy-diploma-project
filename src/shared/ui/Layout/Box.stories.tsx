
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { Box } from "./Box";
import s from './Layout.module.scss'

export default {
    name: 'B',
    component: Box as ComponentMeta<typeof Box>
}

export const Base: ComponentStory<typeof Box> = (args) => <Box {...args} >
</Box>

Base.args = {

}