
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { AutoPosedComponent } from "./AutoPosedComponent";

export default {
    name: 'AutoPosedComponent',
    component: AutoPosedComponent as ComponentMeta<typeof AutoPosedComponent>
}

export const Base: ComponentStory<typeof AutoPosedComponent> = (args) => <AutoPosedComponent {...args} />

Base.args = {
   
}
