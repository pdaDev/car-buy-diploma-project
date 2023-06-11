import {FC} from "react";
import * as NS from '../../../namespace'
import {useMultiLanguageHandbooks} from "shared";
import {FormBuilder} from "../../FormBuilder/FormBuilder";
import {apiRoutes, EMPTY_CONCRETE_CAR} from "../../../lib/constants";
import {getCarPropsIndex} from "../../../lib/helpers";
import {concreteCarValidators} from "../../../lib/validators";


interface IProps {
    chosenEquipment: NS.IServerEquipment | null
    chosenGenerationVariant: NS.IServerGenerationVariant | null
}

export const ConcreteCarFrom: FC<NS.CommonFormData<NS.IServerConcreteCar> & IProps> = ({
                                                                                           defaultData,
                                                                                           close,
                                                                                           chosenGenerationVariant,
                                                                                           chosenEquipment,
                                                                                           type
                                                                                       }) => {

    const config: NS.FormBuilderConfig<NS.IServerConcreteCar> = Object
        .keys(EMPTY_CONCRETE_CAR)
        .reduce<any>((acc, key) => {
            acc[key] = {type: 'number'}
            return acc
        }, {})

    const { getHandbookItemName } = useMultiLanguageHandbooks()


    const isCreate = type === 'create'
    const equipmentId = isCreate ? chosenEquipment?.equipment_id : defaultData?.equipment.id
    const generationVariantId = isCreate ? chosenGenerationVariant?.generation_variant_id : defaultData?.generation_variant

    return <FormBuilder defaultData={defaultData}
                        config={config}
                        extra={{ generation_variant: generationVariantId, equipment: equipmentId }}
                        emptyData={EMPTY_CONCRETE_CAR}
                        keyIndex={'car_id'}
                        validators={concreteCarValidators}
                        url={apiRoutes.concreteCar}
                        closeForm={close}
                        type={type}
                        title={`${defaultData?.equipment.name} ${getHandbookItemName(defaultData?.car_body_type)}`}
                        translationIndex={getCarPropsIndex}
    />
}