import {FC} from "react";
import {useGetProducersQuery, useGetTransmissionsQuery} from "../../api";
import * as NS from '../../namespace';

import {
    createHandbookOptions,
    Selector,
    createOptions,
    filtersCreator, Label, Stack,
    useClassState,
    useMultiLanguageHandbooks
} from "shared";
import {TransmissionCard} from "./TransmissionCard";
import {CommonSingleEntityForm} from "../CommonSingleEntityForm";
import {TransmissionForm} from "./TransmissionForm";
import {apiRoutes} from "../../lib/constants";
import {selectHandbook, useAppSelector} from "app/services";
import {useTranslation} from "react-i18next";

export const TransmissionAdministrations: FC = () => {

    const { data: producers, isLoading } = useGetProducersQuery({ type: 'options' })

    const transmissionTypes = useAppSelector(selectHandbook('transmissionType'))
    const  [data, setData] = useClassState<NS.TransmissionsFilterData>({ producer_id: null, type_code: null })
    const filter = filtersCreator(data, setData)
    const { t } = useTranslation()
    const { getHandbookItemName } = useMultiLanguageHandbooks()
    const transmissiontTypesOptions = createHandbookOptions(transmissionTypes as any[], getHandbookItemName)
    const producersOptions = producers ? createOptions(producers?.results || [], 'producer_id', 'name') : []
    return <>

        <CommonSingleEntityForm url={apiRoutes.transmission}
                                deleteIndex={'transmission_id'}
                                withCreateAccordingExisted={true}
                                extra={data}
                                sortKeys={['count_of_gears', 'count_of_clutches']}
                                renderCard={(data) => <TransmissionCard {...data}
                                />}
                                translationIndex={'admin.data_management.transmissions'}
                                renderForm={(t, d, c) => <TransmissionForm defaultData={d}
                                                                           type={t}
                                                                           close={c}
                                />
                                }
                                useGetQuery={useGetTransmissionsQuery}
        >
            <Stack direction={'row'} spacing={4} vAlign={'center'} size={'width'}>
                <Label label={t("form.filter")} level={2} weight={'medium'}/>
                <Selector options={transmissiontTypesOptions}
                          current={data.type_code}
                          withNullableValue
                          title={t('car.props.type_code.title') as string}
                          onChange={filter.equalFilter('type_code')}
                />
                <Selector options={producersOptions}
                          current={data.producer_id}
                          withNullableValue
                          title={t('car.props.producer.title') as string}
                          onChange={filter.equalFilter('producer_id')}
                />

            </Stack>
        </CommonSingleEntityForm>
    </>

}