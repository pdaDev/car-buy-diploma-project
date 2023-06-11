import {FC} from "react";
import * as NS from '../../namespace'
import {
    Container,
    Grid,
    Label,
    Stack,
    Text,
    useMultiLanguageHandbooks
} from "shared";
import {useTranslation} from "react-i18next";
import {SelectingElement} from "./SelectingElement";

interface IProps {
    steps: NS.Step[]
    currentStep: string
    setData: Function
    data: NS.TestData
}

export const StepsWrapper: FC<IProps> = ({
                                             steps,
                                             currentStep,
                                             data,
                                             setData
                                         }) => {
    const {t} = useTranslation()


    const stepForRender = steps.find(step => step.code === currentStep)!
    const withMultipleData = Array.isArray(data[stepForRender.code])
    const onElementClick = (code: string | number | null, isSelected: boolean) => {
        setData({...data, [stepForRender.code]: withMultipleData
                ? isSelected
                    ? (data[stepForRender.code] as NS.MultipleValue).filter(c => c !== code)
                    : [...data[stepForRender.code] as NS.MultipleValue, code ]
                : isSelected
                    ? null
                    : code
        })
    }

    const { getHandbookItemName } = useMultiLanguageHandbooks()

    return <Container p={4} max_w={'900px'} pr={5}>
       <Stack size={'width'} spacing={4} vAlign={'start'}>
           <Label label={t(`test.steps.${stepForRender.code}.title`)} level={1} weight={'medium'}/>
           <Text size={3} weight={'regular'} content={t(`test.steps.${stepForRender.code}.text`)}/>
           {/*<Separator thickness={'thin'}/>*/}
           <Grid cols={2} container gap={4} >
               {stepForRender.elements.map(el => {
                   const isSelected = withMultipleData ? (data[stepForRender.code] as NS.MultipleValue).includes(el.code) : data[stepForRender.code] === el.code
                   return <SelectingElement selected={isSelected}
                                            withMultiple={withMultipleData}
                                            image={el.image}
                                            onClick={() => onElementClick(el.code, isSelected)}
                                            extraName={stepForRender.extra ? `test.steps.${currentStep}.elements.${el.code}.extra` : undefined}
                                            renderEl={stepForRender.renderEl}
                                            content={stepForRender.type === 'self'
                                                ? t(`test.steps.${currentStep}.elements.${el.code}.title`)
                                                : getHandbookItemName(el as any)
                   }/>
               })}
           </Grid>
       </Stack>
    </Container>
}