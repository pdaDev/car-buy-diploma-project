

import {ComponentMeta, ComponentStory} from "@storybook/react";
import { Separator, IProps } from "./Separator";
import {FC} from "react";

const Wrapper: FC<IProps> = props => {
    return <div style={{width: 300, height: 150, display: 'flex', alignItems: 'center', background: 'white'}}>
        <Separator {...props} />
    </div>
}

export default {
    name: 'Separator',
    component: Wrapper as ComponentMeta<typeof Wrapper>
}



export const Base: ComponentStory<typeof Wrapper> = (args) => <Wrapper {...args} />

Base.args = {
   text: 'some text'
}
