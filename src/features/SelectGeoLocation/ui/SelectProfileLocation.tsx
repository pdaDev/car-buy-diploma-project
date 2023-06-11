import {FC, useState} from "react";
import {useAppDispatch} from "app/services";
import {IServerGeoLocationItem} from "../namespace";
import {getPersonalGeoLocation, setPersonalGeoLocation} from "../api";
import {useTranslation} from "react-i18next";
import {openModal} from "app/services/withPopupProvider";
import {Button, Clickable, Label, Stack} from "shared";
import Icon from "@mdi/react";
import {mdiMapMarker, mdiPencil} from "@mdi/js/commonjs/mdi";
import {getGeoItemLabel} from "../lib/helpers";

interface IProps {
    handleSave?: (location: IServerGeoLocationItem) => void
}

export const SelectPersonalGeoLocation: FC<IProps> = ({handleSave}) => {
    const d = useAppDispatch()

    const [selectedGeolocation, setGeoLocation] = useState(getPersonalGeoLocation())
    const saveProfileGeoLocation = (locations: IServerGeoLocationItem[]) => {
        setPersonalGeoLocation(locations[0])
        setGeoLocation(locations[0])
        handleSave && handleSave(locations[0])
    }

    const {t} = useTranslation()

    const open = () => [
        d(openModal({
            key: 'geo', payload: {
                onSave: saveProfileGeoLocation,
                withMultiple: false,
                choose: 'city',
                defaultSelected: selectedGeolocation ? [selectedGeolocation] : []
            }
        }))
    ]
    if (selectedGeolocation) {
        return <Stack spacing={3} direction={'row'}>
            <Label label={getGeoItemLabel(selectedGeolocation)} level={3}/>

            <Clickable onClick={open}>
                <Icon path={mdiPencil} size={1}/>
            </Clickable>
        </Stack>
    }

    return <Button type={'secondary'}
                   onClick={open}
    >
        <Stack direction={'row'} size={'container'} vAlign={'center'}>
            <Label label={t("geo.choose_location") as string}
                   weight={'regular'}
                   level={3}/>
            <Icon path={mdiMapMarker}
                  size={1}/>
        </Stack>
    </Button>
}