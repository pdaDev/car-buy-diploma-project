
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { DataGrid } from "./DataGrid";

export default {
    name: 'DataGrid',
    component: DataGrid as ComponentMeta<typeof DataGrid>
}

export const Base: ComponentStory<typeof DataGrid> = (args) => <DataGrid {...args} />

Base.args = {
   
}
