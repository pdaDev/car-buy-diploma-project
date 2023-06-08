import {FC, MouseEventHandler, ReactNode} from "react";
import {cn, Image, Label, Stack} from "../../../../shared";
import s from './StepWrapper.module.scss'
import Icon from "@mdi/react";
import {mdiCheck, mdiCircle} from "@mdi/js/commonjs/mdi";

interface IProps {
    selected: boolean
    onClick: Function
    renderEl?: (content: string, image: string | null | undefined, extraName: string | undefined) => ReactNode
    withMultiple: boolean
    content: string
    extraName?: string
    image?: string | null

}

export const SelectingElement: FC<IProps> = ({
                                                 selected,
                                                 content,
                                                 onClick,
                                                 withMultiple,
                                                 extraName,
                                                 image,
                                                 renderEl
                                             }) => {
    return <div className={cn(s.selecting_element, selected && s.selected)} tabIndex={0}
                onClick={onClick as MouseEventHandler}>
        <Stack direction={'row'} size={'width'} vAlign={'center'}>
            {renderEl ? renderEl(content, image, extraName) : <Stack spacing={2} vAlign={'center'} hAlign={'center'}>
                {image && <img src={image}  height={'90px'} alt={''}/>}
                <Label label={content} weight={'regular'} level={3}/>
                {extraName && <Label label={extraName} weight={'regular'} level={4}/>}
            </Stack>}

            <div className={cn(s.selected_pointer, withMultiple && s.multiple)}>
                {selected && <Icon path={!withMultiple ? mdiCircle : mdiCheck}/>}
            </div>
        </Stack>
    </div>
}