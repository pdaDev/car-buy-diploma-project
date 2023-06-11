import {FC} from "react";
import * as NS from '../../../namespace'
import {selectHandbooks, useAppSelector} from "app/services";
import {useMultiLanguageHandbooks} from "shared";
import {FormBuilder} from "../../FormBuilder/FormBuilder";
import {apiRoutes, EMPTY_GENERATION} from "../../../lib/constants";
import {generationValidators} from "../../../lib/validators";

interface IProps {
    model_id: number
}
export const GenerationForm: FC<NS.CommonFormData<NS.IServerGeneration> & IProps> = ({
                                                                                         defaultData,
                                                                                         close,
                                                                                         model_id,
                                                                                         type }) => {

    const { engineLayout, ecologicalClass } = useAppSelector(selectHandbooks)
    const { getHandbookOptions } = useMultiLanguageHandbooks()
    const engineLayoutOptions = getHandbookOptions(engineLayout)
    const ecologicalClassOptions = getHandbookOptions(ecologicalClass)

    const config: NS.FormBuilderConfig<NS.IServerGeneration> = {
        ecological_class_code: {
            type: 'selector',
            options: ecologicalClassOptions,
            accessor: 'handbook'
        },
        engine_layout_code: {
            type: 'selector',
            options: engineLayoutOptions,
            accessor: 'handbook'
        },
        start_date: {
            type: 'date',
        },
        end_date: {
            type: "date"
        }
    }

    return <FormBuilder defaultData={defaultData}
                        config={config}
                        extra={{ model: model_id }}
                        emptyData={EMPTY_GENERATION}
                        validators={generationValidators}
                        keyIndex={'generation_id'}
                        url={apiRoutes.generation}
                        title={defaultData?.name}
                        closeForm={close}
                        type={type}
                        translationIndex={'admin.data_management.cars.generation'}
    />
}