
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { ColorMark } from "./ColorMark";
import {useState} from "react";

export default {
    name: 'ColorMark',
    component: ColorMark as ComponentMeta<typeof ColorMark>
}

export const Base: ComponentStory<typeof ColorMark> = (args) => <ColorMark  {...args}/>

Base.args = {

}
