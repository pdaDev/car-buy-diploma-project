import {FC, ReactNode} from 'react'

import s from './ReviewScoreBlock.module.scss'
import * as NS from '../../namespace'
import {Box, Container, Label, Stack, ReviewPoints} from "../../../../shared";
import {CircleDiagram} from "../../../../shared/ui/CircleDiagram/CircelDiagram";
import {ReviewPointLine} from "./ReviewPointLine";

interface IProps extends ReviewPoints {
    extra?: {
        Button?: ReactNode
    }
}

export const ReviewScoreBlock: FC<IProps> = ({extra, ...props}) => {
    return <div className={s.wrapper}>
        <Stack direction={'row'} spacing={5}>
            <Container max_w={"160px"}>
                <CircleDiagram parts={5}
                               part={props.total}
                               strokeWidth={6}
                               zeroStart={'top'}
                />
                <Container position={'center'} pb={3} size={'content'}>
                    <Label level={3} weight={'medium'} label={`${props.total} / 5`} />
                </Container>
            </Container>
            <Stack spacing={3} size={'container'}>
                {Object
                    .keys(props)
                    .filter(key => key.indexOf('point') >= 0)
                    .map(key => <ReviewPointLine point={key as keyof typeof props} data={props}/>)
                }
            </Stack>
        </Stack>
        {
            extra?.Button && <Stack direction={'row'} hAlign={'end'}>
                {extra.Button}
            </Stack>
        }
    </div>
}
