import {FC} from "react";
import * as NS from '../../namespace'
import {FormBuilder} from "../FormBuilder/FormBuilder";
import {selectHandbook, useAppSelector} from "app/services";
import {useGetProducersQuery} from "../../api";
import {createHandbookOptions, createOptions, useMultiLanguageHandbooks} from "shared";
import {useTranslation} from "react-i18next";
import {apiRoutes, EMPTY_TRANSMISSION} from "../../lib/constants";
import {getCarPropsIndex} from "../../lib/helpers";
import {transmissionValidators} from "../../lib/validators";


export const TransmissionForm: FC<NS.CommonFormData<NS.IServerTransmission>> = ({ defaultData, close, type}) => {
    const { data: producers, isLoading } = useGetProducersQuery({ type: 'options' })
    const transmissionTypes = useAppSelector(selectHandbook('transmissionType'))
    const { t } = useTranslation()
    const { getHandbookItemName } = useMultiLanguageHandbooks()
    const transmissiontTypesOptions = createHandbookOptions(transmissionTypes as any[], getHandbookItemName)
    const producersOptions = producers ? createOptions(producers?.results || [], 'producer_id', 'name') : []


    const config: NS.FormBuilderConfig<NS.IServerTransmission> = {
        type_code: {
            type: "selector",
            options: transmissiontTypesOptions,
            accessor: 'handbook'
        },
        producer: {
            type: 'selector',
            options: producersOptions,
            accessor: d => d.producer.id
        },
        has_dry_clutch: {
            type: 'boolean'
        },
        count_of_gears: {
            type: 'counter',
            min: 0
        },
        count_of_clutches: {
            type: 'counter',
            min: 0
        }
    }

    return <FormBuilder defaultData={defaultData}
                        config={config}
                        emptyData={EMPTY_TRANSMISSION}
                        keyIndex={'transmission_id'}
                        url={apiRoutes.transmission}
                        validators={transmissionValidators}
                        closeForm={close}
                        type={type}
                        title={defaultData?.name}
                        translationIndex={getCarPropsIndex}
    />
}