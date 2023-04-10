
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { FavouritesButton } from "./FavouritesButton";

export default {
    name: 'FavouritesButton',
    component: FavouritesButton as ComponentMeta<typeof FavouritesButton>
}

export const Base: ComponentStory<typeof FavouritesButton> = (args) => <FavouritesButton {...args} />

Base.args = {
   countOfFavourites: 1,
}
