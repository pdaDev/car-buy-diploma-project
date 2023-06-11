import {FC, useEffect, useMemo, useState} from "react";
import * as NS from "app/services/withPopupProvider/namespace";
import {
    Button,
    Card, cn,
    Container, debounce,
    getTranslationIndex,
    getTranslationIndexCreator,
    Label,
    Separator, Stack
} from "shared";
import {useTranslation} from "react-i18next";
import s from './SelectGeoLocation.module.scss'
import {IServerGeoLocationItem} from "../namespace";
import {LocationSelector} from "./LocationSelector";
import {withPopup} from "app/services/withPopupProvider/lib/hocs";
import fetchJsonp from "fetch-jsonp";
import {getGeoItemLabel} from "../lib/helpers";
import Icon from "@mdi/react";
import {mdiClose} from "@mdi/js/commonjs/mdi";
import {selectRegions, useAppSelector} from "app/services";


type Props = NS.IBaseModelProps & NS.ISetGeoPayload
export const Modal: FC<Props> = ({
                                     onClose,
                                     currentKey,
                                     onSave,
                                     choose,
                                     withMultiple,
                                     defaultSelected
                                 }) => {


    const {t} = useTranslation()
    const itemsTypesForSearch = choose.split('-')
    const [query, setQuery] = useState<string>('')
    const withRegions = itemsTypesForSearch.includes('region')
    const withCities = itemsTypesForSearch.includes('city')
    const getIndex = getTranslationIndexCreator('geo')
    const regions = useAppSelector(selectRegions)
    const [cities, setCities] = useState<IServerGeoLocationItem[]>([])
    const [selectedLocations, setSelectedLocations] = useState<IServerGeoLocationItem[]>([])
    useEffect(() => {
        setSelectedLocations(defaultSelected)
    }, [defaultSelected])
    const selectLocation = (location: IServerGeoLocationItem) => {
        setSelectedLocations(selectedLocations.indexOf(location) > -1
            ? selectedLocations.filter(loc => loc !== location)
            : withMultiple ? [...selectedLocations, location] : [location])
    }
    const [isCitiesLoading, setCitiesLoading] = useState<boolean>(false)

    const refetchCities = () => {
        setCitiesLoading(true)
        fetchJsonp(`https://kladr-api.ru/api.php?contentType=city&query=${query}&withParent=1&typeCode=1`,
            {jsonpCallbackFunction: 'JSON_CALLBACK'})
            .then(res =>
                res
                    .json()
                    .then(r => setCities(r.result.filter((reg: IServerGeoLocationItem) =>
                        reg.id !== 'Free'))))
            .finally(() => setCitiesLoading(false))
    }
    const debounсedRefetchCities = debounce(refetchCities, 200)

    useEffect(() => {
        if (query && withCities) {
            debounсedRefetchCities()
        } else {
            setCities([])
        }
    }, [query, withCities])


    const selectorItems = cities && regions
        ? [...cities, ...regions.filter(reg => !query ? false : (reg.name.toLowerCase()).indexOf(query.toLowerCase()) === 0)]
        : []

    const groupedRegionsByAlphabet = useMemo(() => {
        if (regions) {
            return regions.reduce<Record<string, IServerGeoLocationItem[]>>((acc, reg) => {
                const letter = reg.name[0]
                acc[letter] = acc[letter] || []
                acc[letter].push(reg)
                return acc
            }, {})
        }
        return {}
    }, [regions])


    const saveGeo = () => {
        onSave(selectedLocations)
        onClose()
    }

    const onSelectorChange = (loc: IServerGeoLocationItem) => {
        selectLocation(loc)
        if (withMultiple) {
            setQuery('')
        }
    }

    useEffect(() => {
        console.log(selectedLocations)
        if (!withMultiple && selectedLocations.length >= 1) {
            setQuery(getGeoItemLabel(selectedLocations[0]))
        }
    }, [selectedLocations, withMultiple])

    const label = t(getIndex(getTranslationIndex(choose, 'label')))
    const isSaveDisabled = selectedLocations.length === 0


    return <Card contentDirection={'column'} paddings={4}
                 height={withRegions ? 'auto' : '400px'} width={'800px'}>
        <Stack spacing={4} size={'container'}>
            <Stack spacing={4} vAlign={'start'}>
                <Label label={label} level={2}
                       size={6}
                       weight={'medium'}/>
                <LocationSelector loading={isCitiesLoading}
                                  items={selectorItems}
                                  query={query}
                                  onQueryChange={setQuery}
                                  placeholder={label}
                                  onSelect={onSelectorChange}
                />

                {withMultiple && <Stack direction={'row'} hAlign={'start'} spacing={3} wrap>
                    {selectedLocations.map(loc => <div className={s.selected_el}
                                                       onClick={() => selectLocation(loc)}
                    >
                        {getGeoItemLabel(loc)}<Icon path={mdiClose} size={0.7}/>
                    </div>)}
                </Stack>}
                {withRegions && <>
                    <Container pb={4}>
                        <Separator thickness={'thin'}/>
                    </Container>
                    <div className={s.regions_grid}>
                        {withRegions && Object.keys(groupedRegionsByAlphabet).map(key => {
                            return <>
                                <Label label={key}
                                       level={4}
                                       size={2}
                                       weight={'medium'}
                                />
                                {groupedRegionsByAlphabet[key as keyof typeof groupedRegionsByAlphabet].map(reg => (
                                    <span onClick={() => selectLocation(reg)}
                                          className={cn(s.region, selectedLocations.includes(reg) && s.active)}>
                                {reg.name}
                            </span>
                                ))}
                            </>
                        })}
                    </div>
                </>}
            </Stack>

            <Stack direction={'row'} spacing={4} hAlign={'end'}>
                <Button type={'secondary'}
                        size={'medium'}
                        label={t("form.decline") as string}
                        onClick={onClose}
                />
                <Button type={'primary'}
                        size={'medium'}
                        label={t("form.save") as string}
                        onClick={saveGeo}
                />
            </Stack>
        </Stack>
    </Card>

}


export const SelectGeoLocationModal = withPopup('geo')(Modal)