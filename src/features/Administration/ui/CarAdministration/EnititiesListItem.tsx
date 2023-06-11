import {FC, MouseEventHandler, ReactNode} from "react";
import {Clickable, Container, Label, Separator, Stack} from "shared";
import Icon from "@mdi/react";
import s from './CarAdminnistrattion.module.scss'
import {mdiCircle, mdiDelete, mdiFileEdit} from "@mdi/js/commonjs/mdi";
import * as NS from '../../namespace'

interface IProps {
    onSelect: Function
    selected?: boolean
    entity: { name: string }
    isLastElement: boolean
    deleteEntity: Function
    openEntityForm: (v: NS.FormType) => void
    children?: ReactNode
}

export const EntitiesListItem: FC<IProps> = ({
                                                 entity,
                                                 onSelect,
                                                 isLastElement,
                                                 selected,
                                                 openEntityForm,
                                                 deleteEntity,
                                                 children,
                                             }) => {
    const openEditForm: MouseEventHandler = e => {
        e.stopPropagation()
        onSelect(entity)
        openEntityForm('edit')
    }
    const onDelete: MouseEventHandler = e => {
        e.stopPropagation()
        deleteEntity()
    }
    return <Clickable onClick={() => onSelect(entity)}>
        {selected !== undefined && <div className={s.selected_wrapper}>
            {selected && <Icon path={mdiCircle} size={1}/>}
        </div>}<Stack spacing={3} size={'width'}>
        <Container pl={4}>
            <Stack direction={'row'} size={'width'}>
                { children ||  <Label label={entity.name} level={3} weight={'medium'}/> }
                <Stack direction={'row'} spacing={4}>
                    <Clickable onClick={openEditForm} color={'primary'}>
                        <Icon path={mdiFileEdit} size={1}/>
                    </Clickable>
                    <Clickable onClick={onDelete} color={'red-light'}>
                        <Icon path={mdiDelete} size={1.2}/>
                    </Clickable>

                </Stack>
            </Stack>
        </Container>
        {!isLastElement && <Separator thickness={'thin'}/>}
    </Stack>
    </Clickable>
}