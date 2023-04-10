import {FC, MouseEventHandler} from "react";
import {useTranslation} from "react-i18next";
import s from './AdvertisementControlPanel.module.scss'
import {mdiDeleteOutline, mdiPencil, mdiProgressClose} from '@mdi/js';
import Icon from "@mdi/react";
import {NS, usePatchAdMutation} from 'entities/Advertisement'
import {useSearchParams} from "react-router-dom";
import {useDeleteAdMutation} from "../../../../entities/Advertisement";

interface IProps {
    advertisementId: number
    loading: boolean
    editAdvertisement: Function
}

export const AdvertisementControlPanel: FC<IProps> = ({
                                                          advertisementId,
                                                          editAdvertisement,
                                                          loading
                                                      }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const mode = searchParams.get('mode') || 'view'

    const isEditMode = mode === 'edit'


    const [deleteAd, {data}] = useDeleteAdMutation()
    const deleteAdvertisement = async () => {
        await deleteAd(advertisementId).unwrap()
    }
    const {t} = useTranslation()

    return <div className={s.wrapper} data-loading={loading}>
        <button className={s.edit} tabIndex={0} onClick={editAdvertisement as MouseEventHandler}>
            {t(isEditMode ? "advertisement.edit.stop" : "advertisement.edit.start")}
            <Icon path={isEditMode ? mdiProgressClose : mdiPencil} size={1}/>
        </button>
        {!isEditMode && <button className={s.delete} onClick={deleteAdvertisement}>
            {t("advertisement.delete")}
            <Icon path={mdiDeleteOutline} size={1}/>
        </button>}
    </div>
}