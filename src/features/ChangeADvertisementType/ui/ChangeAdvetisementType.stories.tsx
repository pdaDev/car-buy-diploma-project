import {ComponentMeta, ComponentStory} from "@storybook/react";
import {ChangeAdvertisementType as Element} from "./ChangeAdvertisementType";
import {useEffect, useState} from "react";

export default {
    name: 'AdvertisementCard',
    component: Element as ComponentMeta<typeof Element>
}

export const Base: ComponentStory<typeof Element> = ({ activeType, onChange }) => {
    const [active, setActive] = useState(activeType || 'large-card')
    useEffect(() => setActive(activeType), [activeType])

    return <Element activeType={active} onChange={setActive} />
}

Base.args = {

}