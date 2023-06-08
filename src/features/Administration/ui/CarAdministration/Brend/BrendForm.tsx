import {FC, useState} from "react";
import * as NS from '../../../namespace'
import {
    createHandbookOptions,
    createOptions,
    IBrend,
    LoadSingleImage,
    useMultiLanguageHandbooks
} from "../../../../../shared";
import {useGetProducersQuery} from "../../../api";
import {selectHandbook, useAppSelector} from "../../../../../app/services";
import {useTranslation} from "react-i18next";
import {FormBuilder} from "../../FormBuilder/FormBuilder";
import {apiRoutes, EMPTY_BREND, EMPTY_TRANSMISSION} from "../../../lib/constants";
import {type} from "@testing-library/user-event/dist/type";
import {brendValidators} from "../../../lib/validators";

export const BrendForm: FC<NS.CommonFormData<IBrend>> = ({ defaultData, close, type }) => {
    const { data: producers, isLoading } = useGetProducersQuery({ type: 'options' })
    const producersOptions = producers ? createOptions(producers?.results || [], 'producer_id', 'name') : []

    const config: NS.FormBuilderConfig<IBrend> = {
        producer: {
            type: 'selector',
            options: producersOptions,
            accessor: d => d.producer.producer_id
        }
    }

    const [logo, setLogo] = useState<null | string | File>(defaultData?.logo || null)
    const logoWasChanges = logo !== defaultData?.logo

    return <FormBuilder defaultData={defaultData}
                        config={config}
                        dataType={'FormData'}
                        extra={logoWasChanges ? { logo } : undefined}
                        emptyData={EMPTY_BREND}
                        keyIndex={'brend_id'}
                        validators={brendValidators}
                        url={apiRoutes.brend}
                        closeForm={close}
                        type={type}
                        title={defaultData?.name}
                        translationIndex={'admin.data_management.cars.brend'}
    >
        <LoadSingleImage onLoadImage={setLogo} image={logo}/>
    </FormBuilder>

}