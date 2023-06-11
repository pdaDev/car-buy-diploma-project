import React, {FC} from "react";
import {
    Button,
    Card,
    getCarNameFromObjectWithId,
    Label,
    Stack,
    useMultiLanguageHandbooks
} from "shared";
import {IServerCompareItem} from "../../namespace";
import {Mark} from "./Mark";
import {CarPropLine} from "entities/Car/ui/CarPropLine/CarPropLine";
import {useTranslation} from "react-i18next";
import {useAdvertisementsFavourites} from "../../../OperateWithAdvertisementFavourites";
import {useStartChat} from "entities/Chat";


interface IProps {
    data: IServerCompareItem
    total: number
}

export const CompareBestCard: FC<IProps> = ({
                                                data: {
                                                    owner,
                                                    car, compare_item_id, type, characteristics: {
                                                        engine, transmission, common, performance_indicators
                                                    }
                                                }, total
                                            }) => {
    const {getHandbookItemName} = useMultiLanguageHandbooks()
    const {t} = useTranslation()
    const carName = car ? getCarNameFromObjectWithId(car) : ''
    const engineData = `${engine.volume}${t("metrics.liter")} ${getHandbookItemName(engine?.fuel_type_code)} ${engine.horse_power} ${t("metrics.hp")}`

    const {switchFavouriteStatus, isFavourite} = useAdvertisementsFavourites(compare_item_id)
    const addFavouritButtonLabel = t(isFavourite ? 'advertisement.remove_fav' : 'advertisement.add_fav')
    const startChat = useStartChat('sell', owner, compare_item_id, car)

    return <Card width={'320px'}
                 shadow={3}
                 color={'light-card'}
                 paddings={3}>
        <Stack spacing={3}
               vAlign={'center'}
               size={'width'}
               hAlign={'center'}>
            <Mark mark={total}/>
            <Label label={carName} level={3} weight={'medium'}/>
            <CarPropLine title={t('car.date_of_production')} value={common.date_of_production} code={'date_of_production'} />
            <CarPropLine title={t('car.mileage')} value={common.mileage} code={'mileage'} />
            <CarPropLine title={t('car.car_body_type')} value={common.car_body_type} code={'car_body_type'} />
            <CarPropLine title={t('car.transmission')} value={transmission.type} code={'transmission'}/>
            <CarPropLine title={t('car.engine.label')} value={engineData} code={'engine'}/>
            <CarPropLine title={t('car.car_drive_type')} value={transmission.drive_type} code={'drive_type'}/>
            {
                type === 'ad' && <Stack spacing={3} size={'width'}>
                    <Button type={'primary'}
                            label={addFavouritButtonLabel}
                            onClick={switchFavouriteStatus}

                    />
                    <Button type={'primary'}
                            label={'написать владельцу'}
                            onClick={startChat.navigate}
                    />
                </Stack>
            }

        </Stack>
    </Card>
}