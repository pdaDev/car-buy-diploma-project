
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { TestProgressBar } from "./TestProgressBar";

export default {
    name: 'TestProgressBar',
    component: TestProgressBar as ComponentMeta<typeof TestProgressBar>
}

export const Base: ComponentStory<typeof TestProgressBar> = (args) => <TestProgressBar {...args} />

Base.args = {
   steps: [{
       weight: 1,
       code: '1'
   },
       {
           weight: 1,
           code: '2'
       },
       {
           weight: 1,
           code: '3'
       },
       {
           weight: 1,
           code: '4'
       }
   ],
    currentStep: '2',
    maxFilledSStep: '2'
}
