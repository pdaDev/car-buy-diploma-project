import {FC} from "react";
import {FormMode, Label, Text, TextArea} from "shared";
import s from './AdvertisementDescriptionBlock.module.scss'
import {useTranslation} from "react-i18next";
import * as NS from '../../namespace'

interface IProps {
    loading: boolean
    description: string | null
}

export const AdvertisementDescriptionBLock: FC<IProps> = ({
                                                              loading,

                                                              description

                                                          }) => {
    const {t} = useTranslation()

    const loadingStatus = loading ?? !description

    return <div className={s.desctiption_block}>
        <Label label={t("advertisement.description")} loading={loading}/>
       <Text loading={loadingStatus} content={description}/>
    </div>
}