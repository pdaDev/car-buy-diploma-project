import {ComponentMeta, ComponentStory} from "@storybook/react";
import { CircleDiagram as Label } from "./CircelDiagram";
import {Container} from "../Layout";
import {Symbol} from "../Symbol/Symbol";

export default {
    name: 'Label',
    component: Label as ComponentMeta<typeof Label>
}

export const Base: ComponentStory<typeof Label> = (args) => <Container max_w={'200px'}>
    <Label {...args} />
    <Container position={'center'}>
        <Symbol content={Math.ceil(args.part / args.parts * 100)}/>
    </Container>
</Container>

Base.args = {
    part: 1,
    parts: 3
}