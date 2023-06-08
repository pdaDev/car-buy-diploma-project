import {FC} from "react";
import * as NS from '../namespace'
import {Button, getTranslationIndexCreator, Stack} from "../../../shared";
import {useTranslation} from "react-i18next";

interface IProps {
    openForm: (v: NS.FormType) => void
    deleteEntity: Function
    withCreateAccordingCurrent?: boolean
}

export const CardManagePanel: FC<IProps> = ({
                                                openForm,
                                                withCreateAccordingCurrent = false,
                                                deleteEntity,
                                            }) => {
    const { t } = useTranslation()
    const getIndex = getTranslationIndexCreator('admin.data_management')
    return <Stack direction={'row'} spacing={3} hAlign={'end'}>
        <Button type={'secondary'}
                label={t(getIndex('edit')) as string}
                onClick={() => openForm('edit')}

        />
        <Button type={'delete'}
                onClick={deleteEntity}
                label={t(getIndex('delete')) as string}
        />
        {
            withCreateAccordingCurrent &&  <Button type={'primary'}
                                                   label={t(getIndex('create_according_existed')) as string}
                                                   onClick={() => openForm('create-according-existed')}
            />
        }
    </Stack>
}