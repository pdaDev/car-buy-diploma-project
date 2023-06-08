import {FC} from 'react'

import s from './Loader.module.scss'
import {ElementSize} from "../../types";
import {addPrefix, cn} from "../../lib";
import {Container} from "../Layout";

interface IProps {
    type: 'circle' | 'line'
    size: ElementSize
}

export const Loader: FC<IProps> = ({
                                       type,
                                       size
                                   }) => {
    return <Container contentAlign={'center'}>
        <svg className={cn(
            s.loader,
            addPrefix('size', size, s),
            addPrefix('type', type, s)
        )}>
            {type === 'line' ? <>
                    <line
                        x1={2} y1={2} x2={120} y2={2} pathLength={120}/>
                </>
                :
                <circle cx={35}
                        cy={35}
                        r={30}
                        className={s.circle}
                        strokeWidth={4}
                        strokeLinecap={"round"}
                        strokeDasharray={30}
                        strokeDashoffset={50}
                />
            }
        </svg>
    </Container>
}
