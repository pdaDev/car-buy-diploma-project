
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { Checkbox } from "./Checkbox";
import {useForm} from "react-hook-form";

export default {
    name: 'Checkbox',
    component: Checkbox as ComponentMeta<typeof Checkbox>
}

export const Base: ComponentStory<typeof Checkbox> = (args) => {
    const { register, watch } = useForm<{ is: boolean}>()
    console.log(watch('is'))
    return <Checkbox register={register('is')} title={'data'} />
}

Base.args = {
   
}
