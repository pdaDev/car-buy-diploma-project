import {ComponentMeta, ComponentStory} from "@storybook/react";
import { Stack } from "./Stack";
import s from './Layout.module.scss'

export default {
    name: 'Stack',
    component: Stack as ComponentMeta<typeof Stack>
}

export const Base: ComponentStory<typeof Stack> = (args) => <Stack {...args} >
    <div className={s.box}/>
    <div className={s.box}/>
    <div className={s.box}/>
    <div className={s.box}/>
</Stack>

Base.args = {

}