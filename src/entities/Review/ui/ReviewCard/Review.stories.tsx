
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { ReviewCard } from "./Review";

export default {
    name: 'Review',
    component: ReviewCard as ComponentMeta<typeof ReviewCard>
}

export const Base: ComponentStory<typeof ReviewCard> = (args) => <ReviewCard {...args} />

Base.args = {
   data: {
       score: 3,
       car: {
           brend: 'BMW',
           generation: 'G30',
           model: '3'
       },
       title: 'The best car',
       message: "лучшая ",
       photos: [],
       date: '2023-02-01T00:00:00Z',
       review_id: 1,
       owner: {
           id: 1,
           first_name: 'дим',
           last_name: 'димыч',
           avatar: null
       }
   }
}
