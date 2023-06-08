import * as NS from './../namespace'
import {useAppDispatch, useAppNavigate} from "../../../app/services";
import React from "react";
import {useDeleteAdMutation, usePatchAdMutation} from "../api";
import {openModal} from "../../../app/services/withPopupProvider";

export const useAdvertisementManagement = (advertisementId: number, status: NS.StatusCode) => {
    const n = useAppNavigate()
    const editAdvertisement = (e: React.MouseEvent) => {
        n(p => p.advertisement._key_(advertisementId), {mode: 'edit'})
    }
    const [deleteAd, {isLoading: patchingLoading}] = useDeleteAdMutation()
    const [patchAd, {isLoading: deletingLoading}] = usePatchAdMutation()
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
    const isFinished = status === 'F'
    const isBooked = status === 'B'
    const toggleFinishAdvertisement = async (e: React.MouseEvent) => {
        const formData = new FormData()
        formData.append('status', isFinished ? 'O' : 'F')
        await patchAd({data: formData, id: advertisementId}).unwrap()
    }
    const toggleFreezeAdvertisement = async (e: React.MouseEvent) => {
        const formData = new FormData()
        formData.append('status', isBooked ? 'O' : 'B')
        await patchAd({data: formData, id: advertisementId}).unwrap()
    }

    const isLoading = patchingLoading || deletingLoading

    return {
        editAdvertisement, deleteAdvertisement,
        toggleFinishAdvertisement, toggleFreezeAdvertisement,
        isLoading, isBooked, isFinished
    }
}