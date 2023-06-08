
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { SideNavigationMenu } from "./SideNavigationMenu";
import {FC, useState} from "react";
import {Card} from "../Card/Card";

export default {
    name: 'SideNavigationMenu',
    component: SideNavigationMenu as ComponentMeta<typeof SideNavigationMenu>
}

const Container: FC<Parameters<typeof  SideNavigationMenu>[0]> = (p) => {
    const [selected, select] = useState('red')
    return <Card>
        <SideNavigationMenu options={p.options} current={selected} onChange={select as any}/>
    </Card>
}

export const Base: ComponentStory<typeof  Container> = (args) => <Container {...args}/>

Base.args = {
   options: [
       {
           label: 'желтый',
           value: 'yellow'
       },
       {
       label: 'красный',
       value: 'red'
   },
       {
           label: 'синий',
           value: 'blue',
           nested: [
               { value: 'green',
                   label: 'зеленый'
               },
               { value: 'brown',
                   label: 'коричневый'
               }, { value: 'white',
                   label: 'белый'
               }
           ]
       }

   ]
}
