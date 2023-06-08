import {FC, useState} from "react";
import {
    Button,
    Card, CaseRenderer,
    Container,
    createMultiLanguageOptions,
    getTranslationIndexCreator, IOption,
    Label, Paginator,
    SideNavigationMenu, Stack, useNavigationPermission, usePaginationAndSorting, useTabTile
} from "../../../shared";
import {useTranslation} from "react-i18next";
import {handbooks} from "../../../app/services/withCommonData/namespace";
import {
    CarAdministration,
    EnginesAdministration,
    HandbooksAdminForm,
    ProducersAdministrations,
    TransmissionAdministrations
} from "../../../features/Administration";
import {BackButton} from "./BackButton";


export const AdministrationDataManagement: FC = () => {
    const {t} = useTranslation()
    const [selectedPage, setSelectedPage] = useState<string | null>(null)
    const getIndex = getTranslationIndexCreator('admin.data_management')
    // useNavigationPermission(['admin'])
    const handbooksOptions = createMultiLanguageOptions(handbooks.filter(h => h.name !== 'adStatus').map(h => h.name), t, getIndex('handbooks')) as any[]
    const handbooksRenderOptions = handbooks.filter(h => h.name !== 'adStatus').map(h => ({
        code: `handbooks/${h.name}`,
        render: <Card width={'100%'} paddings={4}><HandbooksAdminForm code={h.key}/></Card>
    }))
    useTabTile(t('pages.data_management'))
    
    return <Container max_w={'1200px'}>
        <Stack spacing={4} size={'container'}>
            <BackButton/>
            <Label label={`${t(getIndex('label.data'))}`} level={1} weight={'medium'} />
            <Stack spacing={4} direction={'row'} size={'container'}>
                <Card width={'270px'} height={'100%'} shadow={3}>
                    <SideNavigationMenu options={[{
                        label: t(getIndex('handbooks.label')),
                        value: 'handbooks',
                        nested: handbooksOptions
                    },
                        {
                            label: t(getIndex('cars.label')),
                            value: 'cars'
                        },
                        {
                            label: t(getIndex('cars.engines.label')),
                            value: 'engines'
                        },
                        {
                            label: t(getIndex('cars.transmissions.label')),
                            value: 'transmissions'
                        },
                        {
                            label: t(getIndex('cars.producers.label')),
                            value: 'producers'
                        }
                    ]} current={selectedPage || ''} onChange={setSelectedPage}/>
                </Card>
                    <CaseRenderer options={[{
                        code: 'handbooks',
                        render:
                            <Card width={'100%'} paddings={4} contentAlign={'center'}>
                            <Label label={t(getIndex('handbooks.choose_handbook'))}
                                   level={2}
                                   weight={'medium'}
                                   type={'secondary'}
                            />
                            </Card>

                    },
                        ...handbooksRenderOptions,
                        {
                            code: 'cars',
                            render: <CarAdministration/>
                        },
                        {
                            code: 'producers',
                            render: <ProducersAdministrations/>
                        },
                        {
                            code: 'transmissions',
                            render: <TransmissionAdministrations/>
                        },
                        {
                            code: 'engines',
                            render: <EnginesAdministration/>
                        },
                    ]}
                                  current={selectedPage}
                                  defaultRender={<Card width={'100%'}>
                                      <Container contentAlign={'center'}>
                                          <Label label={t(getIndex('choose_data'))}
                                                 level={2}
                                                 type={'secondary'}
                                          />

                                      </Container>
                                  </Card>}
                    />
            </Stack>
        </Stack>
    </Container>
}