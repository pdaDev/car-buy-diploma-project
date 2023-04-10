import {ComponentMeta, ComponentStory} from "@storybook/react";
import { Sorter as Component, IProps as SorterProps } from "./Sorter";
import {FC, useState} from "react";

interface IProps {
    label: string
}

const Sorter: FC<IProps> = ({ label }) => {
    const [sort, setSort] = useState('')
    return <Component sort={'date'} currentSort={sort} label={label} onChange={setSort} />
}
export default {
    name: 'Sorter',
    component: Sorter as ComponentMeta<typeof Sorter>
}

export const Base: ComponentStory<typeof Sorter> = (args) => <Sorter {...args} />

Base.args = {
    label: 'дата'
}
