
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {FC} from "react";
import {createRuWordEndingByNumberGetter} from "./ruWordsHelper";


const Test: FC<{ number: number }> = (props) => {
    const getName = createRuWordEndingByNumberGetter({ root: 'минут', singleEndings: { ip: 'a', rp: 'ы' }, multiple: { type: 'ending', value: '' } })
    return <>`${props.number} ${getName(props.number)}`</>
}


export default {
    name: 'Test',
    component: Test as ComponentMeta<typeof Test>
}

export const Base: ComponentStory<typeof Test> = (args) => <Test {...args} />

Base.args = {
    number: 1,
}
