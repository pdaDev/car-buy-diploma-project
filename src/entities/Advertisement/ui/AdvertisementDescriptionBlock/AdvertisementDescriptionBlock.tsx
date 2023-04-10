import {FC} from "react";
import {FormMode, Label, Text, TextArea} from "shared";
import s from './AdvertisementDescriptionBlock.module.scss'
import {useTranslation} from "react-i18next";
import * as NS from '../../namespace'

interface IProps {
    loading: boolean
    description: string | null
    mode: FormMode
    onChange: Function
    editData: NS.IAdvertisementPatchPayload
}

export const AdvertisementDescriptionBLock: FC<IProps> = ({
                                                              loading,
                                                              mode,
                                                              onChange,
                                                              editData,
                                                              description

                                                          }) => {
    const isEditMode = mode === 'edit'
    const {t} = useTranslation()
    const onDescriptionChange = (value: string) => {
        onChange({ description: value })
    }
    const loadingStatus = loading ?? !description

    return <div className={s.desctiption_block}>
        <Label label={t("advertisement.description")} loading={loading}/>
        { isEditMode
            ? <TextArea value={editData?.description || description || ''}
                        onChange={onDescriptionChange} />
            : <Text loading={loadingStatus} content={description}/>
        }
    </div>
}