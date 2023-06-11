import {FC} from "react";
import * as NS from '../../../namespace'
import {useGetProducersQuery} from "../../../api";
import {createOptions, IBrend, useMultiLanguageHandbooks} from "shared";
import {FormBuilder} from "../../FormBuilder/FormBuilder";
import {apiRoutes, EMPTY_BREND, EMPTY_MODEL} from "../../../lib/constants";
import {selectHandbook, selectHandbooks, useAppSelector} from "app/services";
import {modelValidators} from "../../../lib/validators";

interface IProps {
    brend_id: number
}

export const ModelForm: FC<NS.CommonFormData<NS.IServerModel> & IProps> = ({ defaultData, close, type, brend_id }) => {
    const { carClass } = useAppSelector(selectHandbooks)
    const carClassesOptions = createOptions(carClass, 'code', 'code')

    const config: NS.FormBuilderConfig<NS.IServerModel> = {
        car_class_code: {
            type: 'selector',
            options: carClassesOptions,
            accessor: 'handbook'
        }
    }

    return <FormBuilder defaultData={defaultData}
                        config={config}
                        validators={modelValidators}
                        extra={{ brend: brend_id }}
                        emptyData={EMPTY_MODEL}
                        keyIndex={'model_id'}
                        title={defaultData?.name}
                        url={apiRoutes.model}
                        closeForm={close}
                        type={type}
                        translationIndex={'admin.data_management.cars.model'}
    />
}