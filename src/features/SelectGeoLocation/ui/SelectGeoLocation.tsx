import {FC, useEffect, useState} from 'react'
import {Card, Clickable, Label, Stack, useForceUpdate, useOpenStatus} from "../../../shared";
import Icon from "@mdi/react";
import {mdiMapMarker} from "@mdi/js/commonjs/mdi";
import {selectSearchGeoLocation, useAppDispatch, useAppSelector} from "../../../app/services";
import {openModal} from "../../../app/services/withPopupProvider";
import {SelectGeoLocationModal} from "./SelectGeoLocationModal";
import {IServerGeoLocationItem} from "../namespace";
import {getSearchGeoLocation, setSearchGeoLocation} from "../api";
import {useTranslation} from "react-i18next";
import {getGeoItemLabel} from "../lib/helpers";
import {setSearchGeo} from "../../../app/services/withCommonData/model/slice";

export const SelectGeoLocation: FC = () => {
    const d = useAppDispatch()
    const setSelected = (locations: IServerGeoLocationItem[]) => d(setSearchGeo(locations))
    const saveSearchGeoLocation = (locations: IServerGeoLocationItem[]) => {
        setSearchGeoLocation(locations)
        setSelected(locations)
    }

    const selectedGeolocations = useAppSelector(selectSearchGeoLocation)

    useEffect(() => {
        setSelected(getSearchGeoLocation())
    }, [])


    const {t} = useTranslation()
    const selectedGeoLocationsLabel = selectedGeolocations.length === 0
        ? t("geo.all_regions")
        : getGeoItemLabel(selectedGeolocations[0]) + (selectedGeolocations.length > 1 ? (' ' + t('geo.and_another')) : '')


    const open = () => {
        d(openModal({
            key: 'geo', payload: {
                onSave: saveSearchGeoLocation,
                withMultiple: true,
                choose: 'city-region',
                defaultSelected: selectedGeolocations
            }
        }))
    }

    return <>
        <Clickable onClick={open} color={'fnt-primary'}>
            <Stack direction={'row'}
                   spacing={3}
                   vAlign={'center'}
            >
                <Icon path={mdiMapMarker} size={1}/>
                <Label label={selectedGeoLocationsLabel}
                       weight={'regular'} level={4}/>
            </Stack>
        </Clickable>
        <SelectGeoLocationModal/>
    </>
}