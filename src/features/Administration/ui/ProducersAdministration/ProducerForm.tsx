import {FC} from "react";
import * as NS from '../../namespace'
import {FormBuilderConfig} from "../../namespace";
import {FormBuilder} from "../FormBuilder/FormBuilder";
import {apiRoutes, EMPTY_PRODUCER} from "../../lib/constants";
import {producerValidators} from "../../lib/validators";

interface IProps {
    defaultData: NS.IServerProducer
}
export const ProducerForm: FC<NS.CommonFormData<NS.IServerProducer & NS.ProducerFormData>> = ({
                                                                                                  defaultData,
                                                                                                  close,
                                                                                                  type
}) => {
    const config: NS.FormBuilderConfig<NS.ProducerFormData> = {
        date_of_found: {
            type: "date"
        },
        ru_description: {
            type: 'text',
            max: 500
        },
        eng_description: {
            type: 'text',
            max: 500
        }
    }

    return <FormBuilder defaultData={defaultData}
                        url={apiRoutes.producer}
                        emptyData={EMPTY_PRODUCER}
                        keyIndex={'producer_id'}
                        title={defaultData?.name}
                        config={config}
                        closeForm={close}
                        validators={producerValidators}
                        type={type}
                        translationIndex={'admin.data_management.producers'}
    />
}