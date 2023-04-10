
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { ReviewScoreBlock } from "./ReviewScoreBlock";

export default {
    name: 'ReviewScoreBlock',
    component: ReviewScoreBlock as ComponentMeta<typeof ReviewScoreBlock>
}

export const Base: ComponentStory<typeof ReviewScoreBlock> = (args) => <ReviewScoreBlock {...args} />

Base.args = {
   
}
