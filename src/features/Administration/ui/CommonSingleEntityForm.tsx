import {FC, ReactNode, useState} from "react";
import {useDeleteEntity, useFormOpenStatus} from "../lib/hooks";
import {Stack} from "shared";
import {CommonListForm} from "./CommonListForm";
import * as NS from "../namespace";
import {EntitiesListItem} from "./CarAdministration/EnititiesListItem";
import {useTranslation} from "react-i18next";
import {BackButton} from "pages/Administration/ui/BackButton";
import {CardManagePanel} from "./CardManagePanel";

interface IProps {
    deleteIndex: string
    url: string
    renderCard: (data: any, edit: Function, deleteE: Function) => ReactNode
    translationIndex: string
    renderForm: (type: NS.FormType, data: any, close: Function) => ReactNode
    renderListItem?: (data: any | null, loading: boolean, index: number, isLastElement: boolean) => ReactNode
    useGetQuery: Function
    withCreateAccordingExisted?: boolean
    sortKeys?: string[]
    children?: ReactNode
    extra?: object
}

export const CommonSingleEntityForm: FC<IProps> = ({
                                                       children,
                                                       url,
                                                       deleteIndex,
                                                       extra,
                                                       renderCard,
                                                       withCreateAccordingExisted,
                                                       renderListItem,
                                                       translationIndex,
                                                       renderForm,
                                                       useGetQuery,
                                                       sortKeys

                                                   }) => {
    const deleteEntity = useDeleteEntity(url)
    const [selected, select] = useState<object | null>(null)
    const [formOpen, formType, close, openForm] = useFormOpenStatus()
    const {t} = useTranslation()
    const back = () => select(null)


    if (formOpen) {
        return <>
            {renderForm(formType!, selected, () => {
                close()
                select(null)
            })}
        </>
    }

    // @ts-ignore
    const deleteSelected = () => deleteEntity(selected[deleteIndex])

    if (selected) {
        return <Stack size={'container'} spacing={4} vAlign={'start'}>
            <Stack direction={'row'}>
                <BackButton onClick={back}/>
                { /**@ts-ignore*/}
                <CardManagePanel openForm={openForm}
                                 deleteEntity={deleteSelected}
                                 withCreateAccordingCurrent={withCreateAccordingExisted}
                />
            </Stack>
            {
                // @ts-ignore
                renderCard(selected, openForm, deleteSelected)}
        </Stack>
    }


    return <Stack size={'width'} spacing={4} vAlign={'start'}>
        {children}
        <CommonListForm translationKey={translationIndex}
                        sortKeys={sortKeys}
                        extra={extra}
                        openCreateForm={() => openForm('create')}
                        useGetQuery={useGetQuery}
                        renderListItem={renderListItem || ((data: NS.IServerGeneration, loading, index, isLastElement) => data &&
                            <EntitiesListItem onSelect={select}
                                              entity={data}
                                // @ts-ignore
                                              deleteEntity={() => deleteEntity(data[deleteIndex])}
                                              openEntityForm={openForm}
                                              isLastElement={isLastElement}
                            />)}
        />
    </Stack>
}