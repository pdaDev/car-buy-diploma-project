import {FC} from "react";
import {useTranslation} from "react-i18next";
import {
    ColorMark,
    Container,
    ExtendedSearchData,
    filtersCreator,
    getTranslationIndexCreator,
    Grid,
    Label,
    RangeInput,
    SearchType,
    Stack,
    useMultiLanguageHandbooks,
    useQuerySearchCar
} from "shared";
import {selectHandbooks} from 'app/services/withCommonData'
import {useAppSelector} from "app/services";
import {CarSearchBlock} from "./CarSeachBlock";
import {MaterialCard} from "../../Administration/ui/CarAdministration/Equipment/MaterialCard";
import {DoubleRangeInputSearch} from "./DoubleRangeInput";
import {SearchSelector} from "./SearchSelector";

interface IProps {
    type: SearchType
    onSearchChange: (data: Partial<ExtendedSearchData>) => void
    data: ExtendedSearchData
}


export const ExtendedSearch: FC<IProps> = ({
                                               type,
                                               onSearchChange,
                                               data,
                                           }) => {

    const {getHandbookItemName, getHandbookOptions} = useMultiLanguageHandbooks()

    const {
        carBodyTypes,
        transmissionType,
        carDrive,
        color,
        materials,
        engineTypes,
        engineLayout,
        suspensionType,
        breakType,
        cyllinderArrangements,
        fuelTypes,
        boostTypes,
        carClass,
    } = useAppSelector(selectHandbooks)
    const carBodyTypeOptions = getHandbookOptions(carBodyTypes)
    const transmissionTypeOptions = getHandbookOptions(transmissionType)
    const carDriveOptions = getHandbookOptions(carDrive)

    const engineTypeOptions = getHandbookOptions(engineTypes)
    const engineLayoutOptions = getHandbookOptions(engineLayout)
    const fuelTypeOptions = getHandbookOptions(fuelTypes)
    const boostTypeOptions = getHandbookOptions(boostTypes)
    const cyllinderArrangementsOptions = getHandbookOptions(cyllinderArrangements)
    const ecologicalClassOptions = getHandbookOptions(engineLayout)
    const breakTypeOptions = getHandbookOptions(breakType)
    const suspensionTypeOptions = getHandbookOptions(suspensionType)
    const carClassOptions = getHandbookOptions(carClass)

    const {containsFilter, rangeFilter, equalFilter} = filtersCreator(data, onSearchChange)
    const {t} = useTranslation()
    const {cars, onCarChange} = useQuerySearchCar()
    const currentYear = new Date().getFullYear()
    const getDiv = getTranslationIndexCreator('search.divs')
    const getCarProps = (index: string) => `car.props.${index}.title`


    return <div>
        <CarSearchBlock data={cars} onSearchChange={onCarChange}/>
        <Container mt={4}>
            <Stack spacing={4} size={'container'}>

                <Label label={t(getDiv('common'))} level={3} weight={'medium'}/>
                <Grid container cols={3} gap={4}>
                    <SearchSelector
                        translationIndex={'car_body_type'}
                        options={carBodyTypeOptions}
                        current={data.car_body_type}
                        onChange={containsFilter('car_body_type')}/>
                    <SearchSelector
                        translationIndex={'transmission_type'}
                        current={data.transmission_type}
                        options={transmissionTypeOptions}
                        onChange={containsFilter('transmission_type')}/>
                    <SearchSelector
                        translationIndex={'drive_type'}
                        options={carDriveOptions}
                        current={data.car_drive_type}
                        onChange={containsFilter('car_drive_type')}/>

                    <SearchSelector options={carClassOptions}
                                    current={data.carClass}
                                    onChange={containsFilter('carClass')}
                                    translationIndex={'car_class'}
                    />
                    <SearchSelector
                        translationIndex={'ecological_class'}
                        options={ecologicalClassOptions}
                        current={data.ecological_class}
                        onChange={containsFilter('ecological_class')}/>
                    <DoubleRangeInputSearch onChange={rangeFilter('mileage')}
                                            translationIndex={'mileage'}
                                            data={data.mileage}/>
                </Grid>
                <Stack direction={'row'} spacing={4} size={'width'}>
                    <SearchSelector translationIndex={'front_breaks'}
                                    options={breakTypeOptions}
                                    current={data.breakType}
                                    onChange={containsFilter('breakType')}/>
                    <SearchSelector translationIndex={'front_suspension'}
                                    options={suspensionTypeOptions}
                                    current={data.suspensionType}
                                    onChange={containsFilter('suspensionType')}/>
                </Stack>
               <Stack direction={'row'} vAlign={'start'} spacing={4} size={'width'}>
                   <Label label={t("search.advertisement.price") as string}
                          level={4}/>
                   <RangeInput min={0}
                               max={100000000}
                               type='multiple'
                               onChange={rangeFilter('price')}/>
               </Stack>
                <Stack direction={'row'} vAlign={'start'} spacing={4} size={'width'}>
                    <Label label={t("search.advertisement.dateOfProduction") as string}
                           level={4}/>
                    <RangeInput min={1900}
                                max={currentYear}
                                withoutNumberFormatting
                                type={'multiple'}
                                onChange={rangeFilter('date_of_production')}
                    />
                </Stack>
                <Label label={t(getDiv('engine'))} level={3} weight={'medium'}/>
                <Container pl={4}>
                    <Stack direction={'row'}  size={'width'} spacing={4}>
                        <Stack hAlign={'center'} spacing={3}>
                            <Label label={t(getCarProps('horse_power')) as string}
                                   level={4}/>
                            <RangeInput min={0}
                                        max={2000}
                                        type='multiple'
                                        onChange={rangeFilter('engine.horse_powers')}/>
                        </Stack>
                        <Stack hAlign={'center'} spacing={3}>
                            <Label label={t(getCarProps('volume')) as string}
                                   level={4}/>
                            <RangeInput min={0}
                                        max={10}
                                        withoutNumberFormatting
                                        type={'multiple'}
                                        step={0.1}
                                        onChange={rangeFilter('engine.volume')}
                            />
                        </Stack>
                    </Stack>
                </Container>
                <Grid cols={3} gap={4} container>
                    <SearchSelector translationIndex={'boost_type_code'}
                              options={boostTypeOptions}
                              current={data.engine?.boost_type}
                              onChange={containsFilter('engine.boost_type')}/>
                    <SearchSelector translationIndex={'fuel_type_code'}
                              options={fuelTypeOptions}
                              current={data.engine?.fuel_type}
                              onChange={containsFilter('engine.fuel_type')}/>
                    <SearchSelector translationIndex={'engine_layout_code'}
                              options={engineLayoutOptions}
                              current={data.engine?.layout}
                              onChange={containsFilter('engine.layout')}/>
                    <SearchSelector translationIndex={'cyllinder_arrangement_type_code'}
                              options={cyllinderArrangementsOptions}
                              current={data.engine?.cyllinder_arrangement_type}
                              onChange={containsFilter('engine.cyllinder_arrangement_type')}/>
                    <SearchSelector translationIndex={'type_code'}
                              options={engineTypeOptions}
                              current={data.engine?.type}
                              onChange={containsFilter('engine.type')}/>
                </Grid>


                <Label label={t(getDiv('sizes'))} level={3} weight={'medium'}/>
                <Grid cols={3} gap={4} container>
                    <DoubleRangeInputSearch onChange={rangeFilter('width')}
                                            translationIndex={'width'}
                                            data={data.width}
                    />
                    <DoubleRangeInputSearch onChange={rangeFilter('height')}
                                            translationIndex={'height'}
                                            data={data.height}
                    />
                    <DoubleRangeInputSearch onChange={rangeFilter('clearance')}
                                            translationIndex={'clearance'}
                                            data={data.clearance}
                    />
                    <DoubleRangeInputSearch onChange={rangeFilter('transmission_type')}
                                            translationIndex={'transmission_type'}
                                            data={data.tank}/>
                    <DoubleRangeInputSearch onChange={rangeFilter('countOfSitPlaces')}
                                            translationIndex={'places_count'}
                                            data={data.countOfSitPlaces}/>
                    <DoubleRangeInputSearch onChange={rangeFilter('fuel_tank')}
                                            translationIndex={'fuel_tank_volume'}
                                            data={data.fuel_tank}/>
                </Grid>
                <Label label={t(getDiv('using'))} level={3} weight={'medium'}/>
                <Grid cols={2} gap={4} container>
                    <DoubleRangeInputSearch onChange={rangeFilter('to_100_acceleration')}
                                            data={data.to_100_acceleration}
                                            translationIndex={'to_100_acceleration'}
                    />
                    <DoubleRangeInputSearch onChange={rangeFilter('fuel_consumption')}
                                            data={data.countOfSitPlaces}
                                            translationIndex={'fuel_consumption'}
                    />
                </Grid>

                <Label label={t(getDiv('colors'))} level={3} weight={'medium'}/>
                <Stack wrap direction={'row'} hAlign={'start'} spacing={3}>
                    {color.map(c => <ColorMark
                            selected={data.color.includes(c.code)}
                            name={getHandbookItemName(c)}
                            color={c.color}
                            onClick={() => containsFilter('color')(c.code)}
                        />
                    )}
                </Stack>
                <Label label={t(getDiv('materials'))} level={3} weight={'medium'}/>
                <Stack direction={'row'} wrap spacing={3} hAlign={'start'}>
                    {materials.map(m => <MaterialCard name={getHandbookItemName(m)}
                                                      selected={data.materials.includes(m.code)}
                                                      onSelect={() => containsFilter('materials')(m.code)}
                    />)}
                </Stack>
            </Stack>
        </Container>
    </div>
}