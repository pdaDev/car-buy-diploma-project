import {ComponentMeta, ComponentStory} from "@storybook/react";
import {HeaderUserMenu, IProps} from "./HeaderUserMenu";
import {FC} from "react";

export default {
    name: 'HeaderUserMenu',
    component: HeaderUserMenu as ComponentMeta<typeof HeaderUserMenu>
}


const Container: FC<IProps> = props => {
    return <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        <HeaderUserMenu {...props} />
    </div>
}
export const Base: ComponentStory<typeof HeaderUserMenu> = (args) => <Container {...args} />

Base.args = {
    name: 'Димка',
    isAuthed: true,
    login: () => {},
    logout: () => {},
    goToPersonalCabinet: () => {}
}
