
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { PhoneNumberInput as Input } from "./PhoneNumberInput";
import {useState} from "react";
import {Card} from "../../Card/Card";
import {useForm} from "react-hook-form";

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
            <Input {...args} register={register('name')} />
        </form>
    </Card>
}

Base.args = {

}
