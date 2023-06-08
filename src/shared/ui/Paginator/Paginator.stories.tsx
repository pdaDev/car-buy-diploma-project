import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Paginator} from "./Paginator";

export default {
    name: 'Paginator',
    component: Paginator as ComponentMeta<typeof Paginator>
}

export const Base: ComponentStory<typeof Paginator> = (args) => <Paginator {...args} />

Base.args = {
    count: 20,
    page: 1,
    setPage: () => {}
}
