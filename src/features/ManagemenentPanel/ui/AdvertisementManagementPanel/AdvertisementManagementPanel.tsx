import React, {FC} from "react";
import {
    mdiDeleteOutline,
    mdiProgressClose,
    mdiPencil,
    mdiBookAccountOutline,
    mdiRestart,
    mdiBookOffOutline
} from '@mdi/js';
import {getTranslationIndexCreator, Stack} from "../../../../shared";
import {
    NS as AdNS,
    useAdvertisementManagement
} from "../../../../entities/Advertisement";
import * as NS from '../../namespace'
import {ManagementPanel} from "../ManagementPanel/ManagementPanel";


interface IProps {
    advertisementId: number
    status: AdNS.StatusCode
}

export const AdvertisementManagementPanel: FC<IProps> = ({
                                                             advertisementId,
                                                             status
                                                         }) => {


    const getIndex = getTranslationIndexCreator("advertisement.managementPanel")
    const { toggleFreezeAdvertisement, editAdvertisement,
        deleteAdvertisement, toggleFinishAdvertisement,
        isLoading, isFinished, isBooked } = useAdvertisementManagement(advertisementId, status)

    const controls: NS.IControl[] = [
        {title: getIndex("delete"), onClick: deleteAdvertisement, icon: mdiDeleteOutline},
        {title: getIndex("edit"), onClick: editAdvertisement, icon: mdiPencil},
        {
            title: getIndex("finish"),
            onClick: toggleFinishAdvertisement,
            icon: isFinished ? mdiRestart : mdiProgressClose
        },
        {
            title: getIndex("freeze"),
            onClick: toggleFreezeAdvertisement,
            icon: isBooked ? mdiBookOffOutline : mdiBookAccountOutline
        }
    ]

    return <ManagementPanel isLoading={isLoading}
                            controls={controls}/>
}