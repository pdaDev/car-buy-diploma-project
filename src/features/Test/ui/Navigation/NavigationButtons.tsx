import {FC} from "react";
import * as NS from "../../namespace";
import s from './NavigationButtons.module.scss'
import {useTranslation} from "react-i18next";
import {Button, Container, getTranslationIndexCreator, Stack} from "shared";
interface IProps {
    steps: NS.Step[]
    currentStep: string
    onStepChange: Function
    finishTest: Function
    canGoToNext: boolean
}

export const NavigationButtons: FC<IProps> = ({ steps, onStepChange, currentStep, finishTest, canGoToNext }) => {
    const currentStepIndex = steps.reduce((acc, step, i) => step.code === currentStep ? i : acc, 0)
    const isFirstStep = currentStepIndex === 0
    const isLastStep = currentStepIndex === steps.length - 1

    const setPreviousStep = () => {
        onStepChange(steps[currentStepIndex - 1].code)
    }
    const setNextStep = () => {
        if (isLastStep) {
            finishTest()
        } else {
            onStepChange(steps[currentStepIndex + 1].code)
        }
    }
    const { t } = useTranslation()



    const getIndex = getTranslationIndexCreator('test.navigation')
    return <div className={s.navigation_buttons}>
        <Container max_w={'400px'}>
            <Stack spacing={4} size={'width'} direction={'row'}>
                { !isFirstStep && <Button type={'secondary'}
                                          width={'full'}
                                          label={t(getIndex('prev')) as string}
                                          onClick={setPreviousStep}
                /> }
                <Button type={'primary'}
                        width={'full'}
                        disabled={!canGoToNext}
                        label={t(getIndex(isLastStep ? 'finish' : 'next')) as string}
                        onClick={setNextStep}
                />

            </Stack>
        </Container>
    </div>
}