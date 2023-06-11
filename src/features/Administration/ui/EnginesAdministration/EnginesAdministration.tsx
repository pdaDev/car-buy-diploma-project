import {FC} from "react";
import {CommonListForm} from "../CommonListForm";
import * as NS from '../../namespace'
import {
    Selector, createHandbookOptions, createOptions,
    filtersCreator,
    Label,
    Stack,
    useClassState,
    useMultiLanguageHandbooks
} from "shared";
import {useGetEnginesQuery, useGetProducersQuery} from "../../api";
import {CommonSingleEntityForm} from "../CommonSingleEntityForm";
import {apiRoutes, EMPTY_TRANSMISSION} from "../../lib/constants";
import {EngineCard} from "./EngineCard";
import {EngineForm} from "./EngineForm";
import {selectHandbook, useAppSelector} from "app/services";
import {useTranslation} from "react-i18next";

export const EnginesAdministration: FC = () => {

    const { data: producers } = useGetProducersQuery({ type: 'options' })

    const transmissionTypes = useAppSelector(selectHandbook('engineTypes'))
    const  [data, setData] = useClassState<NS.TransmissionsFilterData>({ producer_id: null, type_code: null })
    const filter = filtersCreator(data, setData)
    const { t } = useTranslation()
    const { getHandbookItemName } = useMultiLanguageHandbooks()
    const transmissiontTypesOptions = createHandbookOptions(transmissionTypes as any[], getHandbookItemName)
    const producersOptions = producers ? createOptions(producers?.results || [], 'producer_id', 'name') : []

    return <>
        <CommonSingleEntityForm url={apiRoutes.engine}
                                sortKeys={['volume', 'torgue', 'horse_power']}
                                extra={data}
                                deleteIndex={'engine_id'}
                                withCreateAccordingExisted
                                renderCard={(data) => <EngineCard {...data} />}
                                translationIndex={'admin.data_management.engines'}
                                renderForm={(t, d, c) => <EngineForm defaultData={d || EMPTY_TRANSMISSION}
                                                                       type={t}
                                                                       close={c}
                                />
                                }
                                useGetQuery={useGetEnginesQuery}
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