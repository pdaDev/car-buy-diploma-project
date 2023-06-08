import React, {FC} from 'react'

import s from './PathNavigation.module.scss'
import {Container, Stack} from "../Layout";
import {Label} from "../Label/Label";
import {Symbol} from "../Symbol/Symbol";

interface IProps {
    paths: {
        label: string
        onClick: () => void
        active: boolean
    }[]
}

export const PathNavigation: FC<IProps> = ({
                                               paths
                                           }) => {
    let firstActiveIndex = paths.length
    for (let i = 0; i < paths.length; i++) {
        if (paths[i].active) {
            firstActiveIndex = i
            break
        }
    }

    return <Container size={'content'}>
        <Stack direction={'row'} spacing={2} vAlign={'center'}>
            { paths.filter((_, index) => index <= firstActiveIndex).map((pathOption, index, arr) => {
                const isLastEl = index === arr.length - 1
                return <React.Fragment key={pathOption.label} >
            <span onClick={pathOption.onClick} style={{ cursor: "pointer" }}>
                <Label label={pathOption.label}
                       level={3}
                       weight={'regular'}
                       type={'secondary'}/>
            </span>
                    { !isLastEl && <Symbol size={3} content={'/'} weight={'regular'} color={'grey-1'}/> }
                </React.Fragment>
            }) }
        </Stack>
    </Container>
}
