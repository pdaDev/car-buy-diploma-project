import React, {FC, MouseEventHandler, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import s from './AdvertisementControlPanel.module.scss'
import {mdiDeleteOutline, mdiPencil, mdiProgressClose} from '@mdi/js';
import Icon from "@mdi/react";
import { usePatchAdMutation } from 'entities/Advertisement'
import {useSearchParams} from "react-router-dom";
import { useDeleteAdMutation } from "entities/Advertisement";
import {Container, IHandbookItem, Stack, useMultiLanguageHandbooks,Selector, useQueryParamsFormMode} from "shared";
import {selectHandbook, useAppDispatch, useAppSelector} from "app/services";
import {StatusCode} from "entities/Advertisement/namespace";
import {openModal} from "app/services/withPopupProvider";

interface IProps {
    advertisementId: number
    loading: boolean
    status: StatusCode | undefined
}

export const AdvertisementControlPanel: FC<IProps> = ({
                                                          advertisementId,
                                                          status,
                                                          loading,
                                                      }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const mode = searchParams.get('mode') || 'view'

    const isEditMode = mode === 'edit'


    const [deleteAd, {data}] = useDeleteAdMutation()
    const [patchAd] = usePatchAdMutation()

    const { setEditMode } = useQueryParamsFormMode()

    const d = useAppDispatch()
    const deleteAdvertisement = (e: React.MouseEvent) => {
        d(openModal({
            key: 'confirm', payload: {
                index: 'delete_advertisement',
                onConfirm: async () => {
                    await deleteAd(advertisementId).unwrap()
                }
            }
        }))
    }

    const {getHandbookOptions} = useMultiLanguageHandbooks()
    const {t} = useTranslation()
    const [currentStatus, setStatus] = useState<StatusCode>()

    useEffect(() => {
        if (status) {
            setStatus(status)
        }
    }, [status])

    const changeStatus = async (status: StatusCode) => {
        setStatus(status)
        const formData = new FormData()
        formData.append('status', status)
        await patchAd({data: formData, id: advertisementId}).unwrap()
    }

    const statuses = useAppSelector(selectHandbook('adStatus'))
    const statusOptions = getHandbookOptions(statuses as IHandbookItem[])

    return <div className={s.wrapper} data-loading={loading}>
        <Container max_w={'200px'} contentAlign={'center'}>
            <Selector options={statusOptions}
                      current={currentStatus}
                      onChange={changeStatus}
            />
        </Container>
        <Stack direction={'row'}>
            <button className={s.edit} tabIndex={0} onClick={setEditMode}>
                {t(isEditMode ? "advertisement.edit.stop" : "advertisement.edit.start")}
                <Icon path={isEditMode ? mdiProgressClose : mdiPencil} size={1}/>
            </button>
            {!isEditMode && <button className={s.delete} onClick={deleteAdvertisement}>
                {t("advertisement.delete")}
                <Icon path={mdiDeleteOutline} size={1}/>
            </button>}
        </Stack>
    </div>
}