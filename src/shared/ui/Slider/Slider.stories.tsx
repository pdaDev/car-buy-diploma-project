import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Slider} from "./Slider";
import {Card} from "../Card/Card";

export default {
    name: 'Slider',
    component: Slider as ComponentMeta<typeof Slider>
}

export const Base: ComponentStory<typeof Slider> = (args) => <Slider {...args} />
const mock1 = [1, 2, 3, 4, 5, 6, 7, 8]
const mock2 = [1, 2, 3]

Base.args = {
    data: mock1,
    renderEl: (el) => <Card width={'100px'} contentAlign={'center'} height={'140px'} shadow={3}>{el}</Card>,
    infinite: false,
    // lastPage: <Card width={'100px'} contentAlign={'center'} height={'140px'} shadow={3}>anime</Card>,
    countVisibleItems: 4,
    spacing: 3,
    controlsHorizontalOffset: 0
}
