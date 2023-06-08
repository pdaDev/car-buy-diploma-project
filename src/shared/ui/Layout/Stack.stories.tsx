import {ComponentMeta, ComponentStory} from "@storybook/react";
import { Stack } from "./Stack";
import s from './Layout.module.scss'

export default {
    name: 'Stack',
    component: Stack as ComponentMeta<typeof Stack>
}

export const Base: ComponentStory<typeof Stack> = (args) => <Stack {...args} >
    <div className={s.box}>1</div>
    <div className={s.box}>2</div>
    <div className={s.box}>3</div>
    <div className={s.box}>4</div>
</Stack>

Base.args = {

}