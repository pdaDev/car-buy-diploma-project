
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { InputLayout } from "./InputLayout";

export default {
    name: 'InputLayout',
    component: InputLayout as ComponentMeta<typeof InputLayout>
}

export const Base: ComponentStory<typeof InputLayout> = (args) => <InputLayout {...args} />

Base.args = {
   
}
