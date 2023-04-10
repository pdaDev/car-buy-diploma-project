import {ComponentMeta, ComponentStory} from "@storybook/react";
import { Container } from "./Container";
import s from './Layout.module.scss'

export default {
    name: 'Container',
    component: Container as ComponentMeta<typeof Container>
}

export const Base: ComponentStory<typeof Container> = (args) => <div style={{width:300, height:300, background: 'red', position: 'relative'}}>
        <Container {...args} >
            <div className={s.box}/>
        </Container>
</div>

Base.args = {
    position: undefined,
    p: [2, 2, 2, 2]
}