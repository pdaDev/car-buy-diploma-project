import {FC} from "react";
import {useGetProducersQuery} from "../../api";
import {ProducerCard} from "./ProducerCard";
import {CommonSingleEntityForm} from "../CommonSingleEntityForm";
import {apiRoutes} from "../../lib/constants";
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