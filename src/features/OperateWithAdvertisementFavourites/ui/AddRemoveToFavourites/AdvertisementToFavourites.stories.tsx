import {ComponentMeta, ComponentStory} from "@storybook/react";
import { AddRemoveToFavourites as Component } from "./AddRemoveToFavourites";
import {FC} from "react";

interface IProps {
    active: boolean
}
const AddRemoveToFavourites: FC<IProps> = ({ active }) => {
    return <Component advertisementId={0} />

}

export default {
    name: 'SeparatedInput',
    component: AddRemoveToFavourites as ComponentMeta<typeof AddRemoveToFavourites>
}

export const Base: ComponentStory<typeof AddRemoveToFavourites> = (args) => <AddRemoveToFavourites {...args} />

Base.args = {
}
