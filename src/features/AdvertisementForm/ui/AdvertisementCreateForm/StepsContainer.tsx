import React, {FC, ReactNode, useEffect, useRef} from "react";


export type Step = {
    isTouched?: boolean
    isShow: boolean
    title: string
    isFinished: boolean
    render: ReactNode | ((data: Step, index: number) => ReactNode)
}
interface IProps {
    steps: Step[]
    stepWrapper: (step: Step, children: ReactNode, index: number) => ReactNode
    showPrevious?: boolean
    scrollToNew?: boolean
}
export const StepsContainer: FC<IProps> = ({
    steps,
    stepWrapper,
    showPrevious,
    scrollToNew
                                         }) => {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {

    }, [steps])
    const renderSteps = []
    for (let i = 0; i < steps.length; i++) {
        const step = steps[i]
        if (!step.isShow) {
            break
        }
        renderSteps[i] = typeof step.render === 'function'
            ? step.render(step, i)
            : stepWrapper(step, step.render, i)
    }

    return <div ref={ref} style={{ width: "100%"}}>
        { renderSteps }
    </div>
}