import {ComponentMeta, ComponentStory} from "@storybook/react";
import {BaseSearch} from "./BaseSearch";

export default {
    name: 'BaseSearch',
    component: BaseSearch as ComponentMeta<typeof BaseSearch>
}

export const Base: ComponentStory<typeof BaseSearch> = (args) => <BaseSearch {...args} />

Base.args = {

}
