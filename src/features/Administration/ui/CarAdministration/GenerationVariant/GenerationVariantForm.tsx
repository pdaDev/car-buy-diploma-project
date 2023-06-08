import React, {FC, useState} from "react";
import * as NS from '../../../namespace'
import {FormBuilder} from "../../FormBuilder/FormBuilder";
import {apiRoutes, EMPTY_GENERATION, EMPTY_GENERATION_VARIANT} from "../../../lib/constants";
import {selectHandbooks, useAppSelector} from "../../../../../app/services";
import {LoadedImage, LoadImages, useMultiLanguageHandbooks} from "../../../../../shared";
import {getCarPropsIndex} from "../../../lib/helpers";
import {generationVariantValidators} from "../../../lib/validators";

interface IProps {
    generation_id: number
}

export const GenerationVariantForm: FC<NS.CommonFormData<NS.IServerGenerationVariant> & IProps> = ({
                                                                                              defaultData,
                                                                                              close,
                                                                                              generation_id,
                                                                                              type,
                                                                                          }) => {
    const { carBodyTypes } = useAppSelector(selectHandbooks)
    const { getHandbookOptions, getHandbookItemName } = useMultiLanguageHandbooks()
    const carBodyTypeOptions = getHandbookOptions(carBodyTypes)
    const [photos, loadPhoto] = useState<LoadedImage[]>(defaultData?.photos || [])

    const config: NS.FormBuilderConfig<NS.IServerGenerationVariant> = {
        car_body_type_code: {
            type: 'selector',
            options: carBodyTypeOptions,
            accessor: 'handbook'
        }
    }

    const isEdit = type === 'edit'
    const newPhotos = photos
        .filter(p => !p.id && p.file)
        .map(p => p.file)
    const photosId = photos.filter(p => p.id).map(p => p.id)
    const deletedPhotos = isEdit && defaultData ?
        defaultData.photos
            .filter(p => !photosId.includes(p.id))
            .map(p => p.id)
        : []


    return <FormBuilder defaultData={defaultData}
                        config={config}
                        dataType={'FormData'}
                        extra={{generation: generation_id, deleted_photos: deletedPhotos, photos: newPhotos}}
                        emptyData={EMPTY_GENERATION_VARIANT}
                        keyIndex={'generation_variant_id'}
                        url={apiRoutes.generationVariant}
                        validators={generationVariantValidators}
                        title={getHandbookItemName(defaultData?.car_body_type_code)}
                        closeForm={close}
                        type={type}
                        translationIndex={getCarPropsIndex}
    >
        <LoadImages images={photos}
                    onLoadImage={loadPhoto}/>
    </FormBuilder>
}
