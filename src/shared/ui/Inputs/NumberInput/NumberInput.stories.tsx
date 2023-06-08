
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { NumberInput as Input } from "./NumberInput";
import {useState} from "react";
import {Card} from "../../Card/Card";
import {useForm} from "react-hook-form";
import {RUB_SYMBOL} from "../../../lib";

export default {
    name: 'Input',
    component: Input as ComponentMeta<typeof Input>
}

export const Base: ComponentStory<typeof Input> = (args) => {
    const [state, setState] = useState(0)
    const { register } = useForm<{name: number}>()
    const [value, setValue] = useState<string>()
    return <Card>
        <form>
            <Input {...args} register={register('name')} measure={RUB_SYMBOL}/>
        </form>
    </Card>
}

Base.args = {

}
