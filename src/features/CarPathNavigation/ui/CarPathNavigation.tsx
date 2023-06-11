import {FC} from "react";
import {PathNavigation} from "shared";
import {useTranslation} from "react-i18next";
import {useAppNavigate} from "app/services";


interface ICar {
   name: string
   id: number
}
interface IProps {
    brend?: ICar
    model?: ICar
    loading?: boolean

    generation?: ICar
    technical?: boolean


}
export const CarPathNavigation: FC<IProps> = ({ brend, loading, model, generation, technical }) => {
    const { t } = useTranslation()
    const n = useAppNavigate()

    if (brend && model && !loading) {
        const goToBrend = () => n(p => p.car.brend._key_(brend.id))
        const goToGeneration = () => generation && n(p => p.car.generation._key_(generation.id))
        const goToModel = () => model && n(p => p.car.model._key_(model.id))

        const isCarInfoOpen = technical || false
        const isGenerationOpen = !isCarInfoOpen && !!generation
        const isModelOpen = !isGenerationOpen && !isCarInfoOpen && !!model
        const isBrendOpen = !isModelOpen && !isCarInfoOpen && !isGenerationOpen && !!brend

        return  <PathNavigation loading={loading} paths={[
            { label: brend.name, onClick: goToBrend, active: isBrendOpen },
            { label: model?.name || '', onClick: goToModel, active: isModelOpen },
            { label: generation?.name || '', onClick: goToGeneration, active: isGenerationOpen },
            { label: t("car.navigation.technical"), onClick: () => {}, active: isCarInfoOpen }
        ]}
        />
    }


    return <></>

    return <PathNavigation loading={true} paths={[
        { label: 'brend', onClick: () => {}, active: false },
        { label: 'model', onClick: () => {}, active: false },
        { label: 'generation', onClick: () => {}, active: false },
        { label: 'technical', onClick: () => {}, active: true }
    ]}
    />
}