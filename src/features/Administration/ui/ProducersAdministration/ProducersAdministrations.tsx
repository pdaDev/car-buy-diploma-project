import {FC} from "react";
import {CommonListForm} from "../CommonListForm";
import {useGetProducersQuery, useGetTransmissionsQuery} from "../../api";
import {Details} from "../../../../shared";
import * as NS from '../../namespace'
import {ProducerCard} from "./ProducerCard";
import {useFormOpenStatus} from "../../lib/hooks";
import {CommonSingleEntityForm} from "../CommonSingleEntityForm";
import {apiRoutes, EMPTY_PRODUCER, EMPTY_TRANSMISSION} from "../../lib/constants";
import {TransmissionCard} from "../TransmissionAdministration/TransmissionCard";
import {TransmissionForm} from "../TransmissionAdministration/TransmissionForm";
import {ProducerForm} from "./ProducerForm";

export const ProducersAdministrations: FC = () => {
    return <>
        <CommonSingleEntityForm url={apiRoutes.producer}
                                sortKeys={['name', 'date_of_found']}
                                deleteIndex={'producer_id'}
                                renderCard={(data) => <ProducerCard {...data} />}
                                translationIndex={'admin.data_management.producers'}
                                renderForm={(t, d, c) => <ProducerForm defaultData={d}
                                                                           type={t}
                                                                           close={c}
                                />
                                }
                                useGetQuery={useGetProducersQuery}
        />
    </>

}