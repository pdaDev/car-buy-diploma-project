import {FC, useState} from "react";
import {useTranslation} from "react-i18next";
import {
    BaseSearchData, Button,
    Container, createHandbookOptions,
    createOptions, ExtendedSearchData, filtersCreator, IHandbookItem,
    Label,
    RangeInput,
    SearchType,
    Stack,
    useMultiLanguageHandbooks
} from "../../../shared";
import {Selector} from "../../../shared/ui/Selector/Selector";
import {selectHandbooks, selectBrends, selectGenerations, selectModels} from 'app/services/withCommonData'
import {useAppSelector} from "../../../app/services";
import {getHandbook} from "../../../app/services/withCommonData/api/thunks";
import {CarSearchBlock} from "./CarSeachBlock";

interface IProps {
    type: SearchType
    onSearchChange: (data: Partial<ExtendedSearchData> ) => void
    data: ExtendedSearchData
}



export const ExtendedSearch: FC<IProps> = ({
                                               type,
                                               onSearchChange,
                                               data,
                                           }) => {

    const {getHandbookItemName} = useMultiLanguageHandbooks()

    const {carBodyTypes, transmissionType, carDrive} = useAppSelector(selectHandbooks)
    const carBodyTypeOptions = createHandbookOptions(carBodyTypes, getHandbookItemName)
    const transmissionTypeOptions = createHandbookOptions(transmissionType, getHandbookItemName)
    const carDriveOptions = createHandbookOptions(carDrive, getHandbookItemName)
    const { containsFilter, rangeFilter } = filtersCreator(data, onSearchChange)
    const { t } = useTranslation()

    const currentYear = new Date().getFullYear()
    return <div>
        <CarSearchBlock data={data.car} onSearchChange={onSearchChange}/>
        <Container mt={4}>
            <Stack spacing={4} size={'container'}>
                <Stack direction={'row'} spacing={3}>
                    <Selector placeholder={t("handbook.carBodyType") as string}
                              options={carBodyTypeOptions}
                              current={data.car_body_type}
                              onChange={containsFilter('car_body_type')}/>
                    <Selector placeholder={t("handbook.transmissionType") as string}
                              current={data.transmission_type}
                              options={transmissionTypeOptions}
                              onChange={containsFilter('transmission_type')}/>
                    <Selector placeholder={t("handbook.carDriveType") as string}
                              options={carDriveOptions}
                              current={data.car_drive_type}
                              onChange={containsFilter('car_drive_type')}/>
                </Stack>
                <Stack direction={'row'} spacing={3} hAlign={'start'}>
                    <Label label={t("car.engine.volume") as string} level={4}/>
                    <RangeInput min={0}
                                max={10}
                                current={data.engine?.volume || null}
                                type={'multiple'}
                                step={0.1}
                                onChange={rangeFilter('engine.volume')}/>
                </Stack>
                <Stack direction={'row'} spacing={3} hAlign={'start'}>
                    <Label label={t("search.advertisement.dateOfProduction") as string} level={4}/>
                    <RangeInput min={1900}
                                max={currentYear}
                                current={data.price}
                                type={'multiple'}
                                onChange={rangeFilter('date_of_production')}/>
                </Stack>
            </Stack>
        </Container>
    </div>
}