import {ComponentMeta, ComponentStory} from "@storybook/react";
import { Table } from "./Table";

export default {
    name: 'Table',
    component: Table as ComponentMeta<typeof Table>
}

export const Base: ComponentStory<typeof Table> = (args: any) => <Table {...args} />

Base.args = {}