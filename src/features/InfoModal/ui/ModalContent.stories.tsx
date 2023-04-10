import {ComponentMeta, ComponentStory} from "@storybook/react";
import {InfoModal} from "./InfoModal";

export default {
    name: 'InfoModal',
    component: InfoModal as ComponentMeta<typeof InfoModal>
}

export const Base: ComponentStory<typeof InfoModal> = (args) => <InfoModal {...args} />

Base.args = {
    behavior: 'hover',
    title: 'Клиренс',
    message: 'Клиренс - это расстояние между землей и нижней частью автомобиля, не считая колеса. Еще называют дорожный просвет',
    closeBehavior: 'blur',
}
