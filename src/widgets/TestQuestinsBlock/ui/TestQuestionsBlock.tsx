import {FC, useState} from "react";
import * as NS from 'features/Test/namespace'
import {Card, Container, Stack, TestProgressBar, useQuery} from "../../../shared";
import {NavigationButtons, StepsWrapper} from "../../../features/Test";

import {MultipleValue} from "features/Test/namespace";;

interface IProps {
    onFinish: Function
    data: NS.TestData
    setData: Function
    steps: NS.Step[]
}

export const TestQuestionsBlock: FC<IProps> = ({ data, setData, onFinish, steps}) => {
    const init_step = { step: steps[0].code }

    const [query, setQuery] = useQuery(init_step)
    const currentStep = (query.get('step') as keyof NS.TestData) || steps[0].code
    const setStep = (step: keyof NS.TestData) => setQuery({ step })
    const filledSteps = steps
        .filter(step => Array.isArray(data[step.code]) ?( data[step.code] as  NS.MultipleValue).length > 0 : data[step.code] !== null)
        .map(step => step.code)

    const maxFilledStep = filledSteps[filledSteps.length - 1]
    const isStepFilled = Array.isArray(data[currentStep])
        ? (data[currentStep] as MultipleValue).length > 0
        : data[currentStep] !== null

    return <Container max_w={'1200px'} >
       <Card border={[0, 2, 2, 0]} width={'100%'} height={'auto'} paddings={0}>
           <Stack size={'width'} spacing={4}>
              <Stack>
                  <TestProgressBar steps={steps}
                                   isStepFilled={isStepFilled}
                                   onStepChange={setStep}
                                   currentStep={currentStep}
                                   maxFilledSStep={maxFilledStep}
                  />
                  <Stack size={'width'} hAlign={'end'} vAlign={'start'}>
                      <StepsWrapper steps={steps}
                                    currentStep={currentStep}
                                    setData={setData}
                                    data={data} />
                  </Stack>
              </Stack>

               <Container pr={4} size={'content'}>
                   <NavigationButtons steps={steps}
                                      canGoToNext={isStepFilled}
                                      currentStep={currentStep}
                                      onStepChange={setStep}
                                      finishTest={onFinish}
                   />
               </Container>
           </Stack>
       </Card>

    </Container>
}