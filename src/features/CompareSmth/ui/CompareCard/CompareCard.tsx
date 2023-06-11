import {FC, MouseEventHandler} from "react";
import {
    CardImageViewer,
    Container,
    getCarNameFromObjectWithId,
    Label,
    Price,
    Stack
} from "shared";
import * as NS from '../../namespace'
import s from './CompareCard.module.scss'
import {useAppNavigate} from "app/services";
import {useContentCompare} from "../../lib/hooks";
import Icon from "@mdi/react";
import {mdiClose} from "@mdi/js";
import {CarPropsByEquipment} from "../../../ChooseCarEquipment/ui/CarPropsByEquipment";


export const CompareCard: FC<NS.IServerCompareItem> = (
    {
        car,
        photos,
        id,
        type,
        compare_item_id,
        characteristics,
        equipment,
        ...props
    }) => {
    const carName = car ? getCarNameFromObjectWithId(car) : ''

    const n = useAppNavigate()
    const isModel = type === 'model'
    const compare = useContentCompare(type, compare_item_id)
    const onClick = () => {
        isModel
            ? n(p => p.car.generation._key_(compare_item_id))
            : n(p => p.advertisement._key_(compare_item_id))
    }

    const deleteCompare: MouseEventHandler = e => {
        e.stopPropagation()
        compare.remove()
    }

    return <div className={s.card} onClick={onClick}>
        <Stack hAlign={"center"} spacing={3}>
            <Container w={'250px'} h={'230px'} min_h={'210px'}>
                <CardImageViewer photos={photos}/>
            </Container>
            <Container pr={3} pl={3} pb={3}>
                <Stack hAlign={'center'} size={'container'}>
                    <Label label={carName}/>
                    {type === 'ad'
                        ? <Price price={props.price}/>
                        : equipment && <CarPropsByEquipment equipments={equipment.equipments}
                                                            defaultEquipment={equipment.current}
                                                            optionsPos={'top'}
                                                            equipmentIndex={car.generation_variant}
                    />}
                </Stack>
            </Container>
        </Stack>
        <div className={s.delete} onClick={deleteCompare}>
            <Icon path={mdiClose}/>
        </div>
    </div>
}