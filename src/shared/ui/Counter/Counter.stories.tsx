import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Counter as Component} from "./Counter";
import {FC, useState} from "react";
import {current} from "@reduxjs/toolkit";

interface IProps {
    total: number;
    size: Parameters<typeof Component>[0]['size']
}

const Counter: FC<IProps> = ({total, size}) => {
    const [current, setCurrent] = useState<number>(0)
    return <div style={{width: 200, height: 200}}>
        <Component total={total} current={current} size={size} onChange={setCurrent}/>
    </div>
}
export default {
    name: 'Counter',
    component: Counter as ComponentMeta<typeof Counter>
}

export const Base: ComponentStory<typeof Counter> = (args) => <Counter {...args} />

Base.args = {
    size: 'small',
    total: 5,
}
