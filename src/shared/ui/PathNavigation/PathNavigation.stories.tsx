
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { PathNavigation } from "./PathNavigation";

export default {
    name: 'PathNavigation',
    component: PathNavigation as ComponentMeta<typeof PathNavigation>
}

export const Base: ComponentStory<typeof PathNavigation> = (args) => <PathNavigation {...args} />

Base.args = {
   
}
