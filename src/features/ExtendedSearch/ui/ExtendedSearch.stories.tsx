import {ComponentMeta, ComponentStory} from "@storybook/react";
import {ExtendedSearch} from "./ExtendedSearch";

export default {
    name: 'ExtendedSearch',
    component: ExtendedSearch as ComponentMeta<typeof ExtendedSearch>
}

export const Base: ComponentStory<typeof ExtendedSearch> = (args) => <ExtendedSearch {...args} />

Base.args = {

}
