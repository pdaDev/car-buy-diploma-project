import {ComponentMeta, ComponentStory} from "@storybook/react";
import {AdvertisementCard} from "./AdvertisementCard";
import {
    FavouritesButton
} from "../../../../features/OperateWithAdvertisementFavourites/ui/FavouritesButton/FavouritesButton";
// import {AdvertisementManagementPanel} from "../../../../features/OperateWithAdvertisement";

export default {
    name: 'AdvertisementCard',
    component: AdvertisementCard as ComponentMeta<typeof AdvertisementCard>
}

export const Base: ComponentStory<typeof AdvertisementCard> = (args) => <AdvertisementCard {...args} />

Base.args = {
    data: {
        photos: [],
        carBodyType: 'седан',
        equipment: 'lux',
        name: 'BMW 3 (g30)',
        drive: 'полный',
        engine: '2л/198 л.c./бензин',
        price: 2000000,
        yearOfProduction: 2021,
        startDate: '20.02.2021',
        transmission: 'робот',
        mileage: "784000",
        owner: {
            first_name: '',
            last_name: '',
            avatar: null,
            id: 1
        },
        advertisement_id: 1
    },
    type: 'large',
    extra: {
        favoriteButton: <></>
    }
}