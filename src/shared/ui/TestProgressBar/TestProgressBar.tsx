import {FC} from 'react'

import s from './TestProgressBar.module.scss'
import styled, {css} from "styled-components";
import {Container} from "../Layout";
import {Label} from "../Label/Label";
import {getPercents} from "../../lib";

type Step = {
    weight: number
    code: string

}

interface IProps {
    steps: Step[]
    currentStep: string
    maxFilledSStep: string
    onStepChange: Function
    isStepFilled: boolean
}

type WidthProps = { w: number }

const StyledProgressBar = styled.div<WidthProps>`
  background: var(--clr-primary-light);
  width: ${props => props.w}%;
  transition: .4s;
  width: ${props => props.w}%;
  display: flex;
  position: relative;
  border-bottom-right-radius: 100px;
  border-top-right-radius: 100px;
  height: 6px;
  align-items: center;

`

const StyledPart = styled.div<{ w: number, active: boolean, withBorder?: boolean }>`
  height: 100%;
  background: ${props => props.active ? 'var(--clr-primary)' : 'var(--clr-primary-light)'};
  width: ${props => props.w}%;
  flex-shrink: 1;

  ${props => props.withBorder && css`
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
  `}
  &:last-child {
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
  }
`

const StyledWrapper = styled.div<WidthProps>`
  height: auto;
  align-items: center;
  width: ${props => props.w}%;
  display: flex;
  transition: .4s;

`

export const TestProgressBar: FC<IProps> = ({
                                                steps,
                                                currentStep,
                                                maxFilledSStep,
                                                onStepChange,
                                                isStepFilled
                                            }) => {
    const totalWeight = steps.reduce((acc, step) => acc + step.weight, 0)
    const currentStepIndex = steps.reduce((acc, step, index) => step.code === currentStep ? index : acc, -1)
    const maxFilledStepIndex = steps.reduce((acc, step, index) => step.code === maxFilledSStep ? index : acc, -1)


    const newSteps = steps.map((step, i) => ({
        ...step,
        part: steps.reduce((acc, s, index) => index <= i ? acc + s.weight : acc, 0)
    }))

    const sumOfMaxFilledWeights = newSteps[maxFilledStepIndex]?.part || 0
    const sumOfCurrentWeights = newSteps[currentStepIndex]?.part || 0
    const isMaxStep = currentStepIndex >= maxFilledStepIndex

    const handleStepChange = (step: string) => {
        if (isStepFilled) {
            onStepChange(step)
        }
    }

    return (
        <div className={s.progress_bar}>
            <StyledProgressBar w={sumOfMaxFilledWeights / totalWeight * 100}>
                {newSteps.filter((_, i) => i <= maxFilledStepIndex).map((step, i, arr) => <>
                    <StyledPart
                        active={i <= currentStepIndex}
                        onClick={() => handleStepChange(step.code)}
                        withBorder={i === arr.length - 1}
                        w={step.weight / sumOfMaxFilledWeights * 100}
                    />
                    {i !== arr.length - 1 && <div className={s.separator}>
                        {
                           i > currentStepIndex && <div className={s.pointer}>
                                <Label label={getPercents(Math.round(step.part / totalWeight * 100))} level={4}
                                       type={'secondary'}/>
                                <div className={s.triangle}>
                                </div>
                            </div>
                        }
                    </div>
                    }
                </>)}
                <Container position={'middle-left'} pointerEventsNone>
                    <StyledWrapper w={sumOfCurrentWeights / sumOfMaxFilledWeights * 100}>
                        {newSteps.filter((_, i) => i <= currentStepIndex).map((step, i, arr) => <>
                            <StyledPart
                                active={true}
                                w={step.weight / sumOfCurrentWeights * 100}/>
                            {i !== arr.length - 1 && i <= currentStepIndex &&
                                <div className={s.separator} data-current={true}>
                                    <div className={s.pointer}>
                                        <Label label={getPercents(Math.round(step.part / totalWeight * 100))} level={4}
                                               type={'secondary'}/>
                                        <div className={s.triangle}>
                                        </div>
                                    </div>
                                </div>
                            }
                        </>)
                        }
                    </StyledWrapper>
                    {currentStepIndex < maxFilledStepIndex && <div className={s.value}>
                        <Label label={getPercents(Math.round(sumOfCurrentWeights * 100 / totalWeight))}
                               size={4}
                               weight={'regular'}/>
                    </div>}
                </Container>
            </StyledProgressBar>
            <Label label={getPercents(Math.round(sumOfMaxFilledWeights * 100 / totalWeight))}
                   size={4}
                   type={isMaxStep ? 'primary' : 'secondary'}
                   weight={'regular'}/>
        </div>

    )
}
