import { FC } from 'react'

import * as NS from '../../namespace'
import {Box} from "shared";
interface IProps {
    changes: NS.IPrice[]
}
export const PriceChangesGraph: FC<IProps> = ({
    changes
}) => {
    const prices = changes.map(d => d.price)
    const max = Math.max(...prices)
    const min = Math.min(...prices)
    return <Box brd={2} background={'secondary'}>
        <svg>

        </svg>
    </Box>
}
