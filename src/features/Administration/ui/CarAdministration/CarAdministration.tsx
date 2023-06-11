import {FC, useState} from "react";

import {
    Container,
    IBrend, PathNavigation,
    Stack,
    useMultiLanguageHandbooks,
} from "shared";

import * as NS from "../../namespace";
import {useFormOpenStatus} from "../../lib/hooks";

import {BrendCard} from "./Brend/BrendCard";
import {ModelCard} from "./Model/ModelCard";
import {GenerationCard} from "./Generation/GenerationCard";
import {CarCard} from "./Car/CarCard";
import {GenerationVariantCard} from "./GenerationVariant/GeneratioVariantCard";
import {EquipmentCard} from "./Equipment/EquipmentCard";
import {BrendsList} from "./Brend/BrendsList";
import {BrendForm} from "./Brend/BrendForm";
import {ModelForm} from "./Model/ModelForm";
import {GenerationForm} from "./Generation/GenerationForm";
import {GenerationVariantForm} from "./GenerationVariant/GenerationVariantForm";
import {EquipmentForm} from "./Equipment/EquipementForm";
import {ConcreteCarFrom} from "./Car/ConcreteCarFrom";

export const CarAdministration: FC = () => {

    const [selectedBrend, setBrend] = useState<null | IBrend>(null)
    const [selectedModel, setModel] = useState<null | NS.IServerModel>(null)
    const [selectedGeneration, setGeneration] = useState<null | NS.IServerGeneration>(null)
    const [selectedGenerationVariant, setGenerationVariant] = useState<null | NS.IServerGenerationVariant>(null)
    const [selectedEquipment, setEquipment] = useState<null | NS.IServerEquipment>(null)
    const [selectedConcreteCar, setConcreteCar] = useState<null | NS.IServerConcreteCar>(null)

    const [brendFormOpen, brendFormType, closeBForm, openBrendForm] = useFormOpenStatus()
    const [modelFormOpen, modelFormType, closeMForm, openModelForm] = useFormOpenStatus()
    const [generationFormOpen, generationFormType,
        closeGForm, openGenerationFor,] = useFormOpenStatus()
    const [equipmentFormOpen, equipmentFormType, closeEForm,
        openEquipmentForm] = useFormOpenStatus()
    const [concreteCarFormOpen, concreteCarFormType, closeCCForm,
        openConcreteCarForm] = useFormOpenStatus()
    const [generationVariantFormOpen, generationVariantFormType, closeGVForm,
        openGenerationVariantForm
    ] = useFormOpenStatus()

    const [chosenGenerationVariant, chooseGV] = useState<null | NS.IServerGenerationVariant>(null)
    const [chosenEquipment, chooseEqp] = useState<null | NS.IServerEquipment>(null)

    const formIsNotOpen = !(brendFormOpen || modelFormOpen || generationFormOpen
        || equipmentFormOpen || concreteCarFormOpen || generationVariantFormOpen)

    const selectEquipment = (v: NS.IServerEquipment | null) => {
        setGenerationVariant(null)
        setConcreteCar(null)
        setEquipment(v)
    }
    const selectGenerationVariant = (v: NS.IServerGenerationVariant | null) => {
        setGenerationVariant(v)
        setEquipment(null)
        setConcreteCar(null)
    }

    const selectConcreteCar = (v: NS.IServerConcreteCar | null) => {
        setGenerationVariant(null)
        setEquipment(null)
        setConcreteCar(v)
    }

    const goToGeneration = () => {
        selectGenerationVariant(null)
    }

    const goToModel = () => {
        setGeneration(null)
        selectGenerationVariant(null)
    }
    const goToBrend = () => {
        setGeneration(null)
        setModel(null)
        selectGenerationVariant(null)
    }

    const goToBrendsList = () => {
        setGeneration(null)
        setModel(null)
        setBrend(null)
        selectGenerationVariant(null)
    }

    const isGenerationVariantSelected = !!selectedGenerationVariant && formIsNotOpen
    const isEquipmentSelected = !!selectedEquipment && formIsNotOpen
    const isConcreteCarSelected = !!selectedConcreteCar && formIsNotOpen
    const isGenVarEqpCarNotSelected = !(isGenerationVariantSelected || isEquipmentSelected || isConcreteCarSelected) && formIsNotOpen
    const isGenerationSelected = isGenVarEqpCarNotSelected && !!selectedGeneration && formIsNotOpen
    const isModelSelected = !!selectedModel && !isGenerationSelected && isGenVarEqpCarNotSelected && formIsNotOpen
    const isBrendSelected = !!selectedBrend && !isModelSelected && !isGenerationSelected && isGenVarEqpCarNotSelected && formIsNotOpen
    const isBrendListOpen = !selectedBrend && formIsNotOpen

    const closeBrendForm = () => {
        setBrend(null)
        closeBForm()

    }
    const closeModelForm = () => {
        closeMForm()
        setModel(null)

    }
    const closeGenerationForm = () => {
        closeGForm()
        setGeneration(null)
    }

    const closeGenerationVariantForm = () => {
        closeGVForm()
        setGenerationVariant(null)
    }

    const closeConcreteCarForm = () => {
        closeCCForm()
        chooseGV(null)
        chooseEqp(null)
        setConcreteCar(null)
    }

    const closeEquipmentForm = () => {
        closeEForm()
        setEquipment(null)
    }

    const {getHandbookItemName} = useMultiLanguageHandbooks()
    const closeAllForms = () => {
        closeEForm()
        closeBForm()
        closeMForm()
        closeGForm()
        closeGVForm()
        closeCCForm()
    }
    const navigateToBrend = () => {
        goToBrend()
        closeAllForms()
    }
    const navigateToModel = () => {
        goToModel()
        closeAllForms()
    }
    const navigateToGeneration = () => {
        goToGeneration()
        closeAllForms()
    }

    const naviagateToBrendsList = () => {
        goToBrendsList()
        closeAllForms()
    }


    return <Stack size={'container'} vAlign={'start'}>
        <Container mb={4} size={'content'}>
            <PathNavigation paths={[
                {active: isBrendListOpen, label: 'Бренды', onClick: naviagateToBrendsList},
                !!selectedBrend ? {active: isBrendSelected, label: selectedBrend.name, onClick: navigateToBrend} : null,
                !!selectedModel ? {active: isModelSelected, label: selectedModel.name, onClick: navigateToModel} : null,
                !!selectedGeneration ? {
                    active: isGenerationSelected,
                    label: selectedGeneration.name,
                    onClick: navigateToGeneration
                } : null,
                !!selectedGenerationVariant ? {
                    active: isGenerationVariantSelected,
                    label: getHandbookItemName(selectedGenerationVariant.car_body_type_code),
                    onClick: () => {
                    }
                } : null,
                !!selectedConcreteCar ? {
                    active: isConcreteCarSelected,
                    label: `${getHandbookItemName(selectedConcreteCar.car_body_type)} ${selectedConcreteCar.equipment.name}`,
                    onClick: () => {
                    }
                } : null,
                !!selectedEquipment ? {
                    active: isEquipmentSelected, label: selectedEquipment.name, onClick: () => {
                    }
                } : null,
            ].filter(p => p !== null) as any}/>
        </Container>

        {isBrendListOpen && <BrendsList selectBrend={setBrend}
                                        openBrendForm={openBrendForm}
        />}
        {isBrendSelected && <BrendCard {...selectedBrend}
                                       selectModel={setModel}
                                       openModelForm={openModelForm}
                                       openBrendForm={openBrendForm}
        />}
        {isModelSelected && <ModelCard {...selectedModel}
                                       openModelForm={openModelForm}
                                       openGenerationForm={openGenerationFor}
                                       selectGeneration={setGeneration}
        />}
        {isGenerationSelected && <GenerationCard {...selectedGeneration}
                                                 chosenEquipment={chosenEquipment}
                                                 chosenGenerationVariant={chosenGenerationVariant}
                                                 chooseEquipment={chooseEqp}
                                                 chooseGenerationVariant={chooseGV}
                                                 selectConcreteCar={selectConcreteCar}
                                                 selectEquipment={selectEquipment}
                                                 openConcreteCarForm={openConcreteCarForm}
                                                 openGenerationForm={openGenerationFor}
                                                 openeGenerationVariantForm={openGenerationVariantForm}
                                                 openEquipmentForm={openEquipmentForm}
                                                 selectGenerationVariant={selectGenerationVariant}

        />}
        {isConcreteCarSelected && <CarCard {...selectedConcreteCar}
                                           openConcreteCarForm={openConcreteCarForm}
        />}
        {isGenerationVariantSelected && <GenerationVariantCard {...selectedGenerationVariant}
                                                               openGenerationVariantForm={openGenerationVariantForm}
        />}
        {isEquipmentSelected && <EquipmentCard {...selectedEquipment}
                                               openEquipmentForm={openEquipmentForm}
        />}

        {brendFormOpen && <BrendForm defaultData={selectedBrend}
                                     type={brendFormType!}
                                     close={closeBrendForm}
        />}
        {modelFormOpen && <ModelForm defaultData={selectedModel}
                                     type={modelFormType!}
                                     brend_id={selectedBrend!.brend_id}
                                     close={closeModelForm}
        />}
        {generationFormOpen && <GenerationForm defaultData={selectedGeneration}
                                               type={generationFormType!}
                                               model_id={selectedModel!.model_id}
                                               close={closeGenerationForm}
        />}
        {generationVariantFormOpen &&
            <GenerationVariantForm defaultData={selectedGenerationVariant}
                                   generation_id={selectedGeneration!.generation_id}
                                   type={generationVariantFormType!}
                                   close={closeGenerationVariantForm}
            />}
        {equipmentFormOpen && <EquipmentForm defaultData={selectedEquipment}
                                             generation_id={selectedGeneration!.generation_id}
                                             type={equipmentFormType!}
                                             close={closeEquipmentForm}
        />}
        {concreteCarFormOpen && <ConcreteCarFrom defaultData={selectedConcreteCar}
                                                 chosenGenerationVariant={chosenGenerationVariant}
                                                 chosenEquipment={chosenEquipment}
                                                 type={concreteCarFormType!}
                                                 close={closeConcreteCarForm}
        />}

    </Stack>

}