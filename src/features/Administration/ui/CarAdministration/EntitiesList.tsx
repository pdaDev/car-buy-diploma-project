import {FC} from "react";
import {List} from "shared";
import {EntitiesListItem} from "./EnititiesListItem";
import * as NS from '../../namespace'

interface IProps<T extends { name: string }> {
    data: undefined | T[]
    translationIndex: string
    onSelect: Function
    openEntityForm: (v: NS.FormType) => void
    deleteEntity: (data: T) => void
}

export function EntitiesList<T extends { name: string }>({
                                                             data,
                                                             openEntityForm,
                                                             deleteEntity,
                                                             translationIndex,
                                                             onSelect
                                                         }: IProps<T>) {
    return <List loading={false}
                 renderListEl={(entity, loading, index) => {
                     return entity ? <EntitiesListItem entity={entity}
                                                       onSelect={onSelect}
                                                       deleteEntity={() => deleteEntity(entity)}
                                                       openEntityForm={openEntityForm}
                                                       isLastElement={index === (data?.length || 0) - 1}
                         />
                         : null
                 }
        }
        data={data}
        emptyKey={`admin.car.${translationIndex}.empty_list`}
        />
        }