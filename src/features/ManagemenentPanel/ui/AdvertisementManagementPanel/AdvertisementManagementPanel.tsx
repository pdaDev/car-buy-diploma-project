import React, {FC} from "react";
import { mdiDeleteOutline, mdiProgressClose, mdiPencil, mdiSnowflake } from '@mdi/js';
import {getTranslationIndexCreator, Stack} from "../../../../shared";
import {useDeleteAdMutation} from "../../../../entities/Advertisement";
import {useAppNavigate} from "../../../../app/services";
import * as NS from '../../namespace'
import {ManagementPanel} from "../ManagementPanel/ManagementPanel";

interface IProps {
    advertisementId: number
}

export const AdvertisementManagementPanel: FC<IProps> = ({
                                                             advertisementId
                                                         }) => {


    const getIndex = getTranslationIndexCreator("advertisement.managementPanel")
    const n = useAppNavigate()
    const editAdvertisement = (e: React.MouseEvent) => {
        e.stopPropagation()
        n(p => p.advertisement._key_(advertisementId), { mode: 'edit' })
    }

    const [deleteAd] = useDeleteAdMutation()
    const deleteAdvertisement = async (e: React.MouseEvent) => {
        e.stopPropagation()
        await deleteAd(advertisementId).unwrap()
    }
    const finishAdvertisement = async (e: React.MouseEvent) => {
        e.stopPropagation()
    }
    const freezeAdvertisement = async (e: React.MouseEvent) => {
        e.stopPropagation()
    }
    const controls: NS.IControl[] = [
        { title: getIndex("delete"), onClick: deleteAdvertisement, icon: mdiDeleteOutline },
        { title: getIndex("edit"), onClick: editAdvertisement, icon: mdiPencil },
        { title: getIndex("finish"), onClick: finishAdvertisement, icon: mdiProgressClose },
        { title: getIndex("freeze"), onClick: freezeAdvertisement, icon: mdiSnowflake }
    ]

    return <ManagementPanel controls={controls} />
}