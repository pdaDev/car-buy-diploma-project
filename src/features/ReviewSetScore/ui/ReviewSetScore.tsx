import {FC} from "react";
import {ReviewPoints, ReviewPointsWithoutTotal, Stack} from "shared";
import {SetPointLine} from "./SetPointLine";
interface IProps {
    data: ReviewPointsWithoutTotal
    onChange: Function
}
export const ReviewSetScore:FC<IProps> = ({ data, onChange }) => {
    const reviewPoint: (keyof ReviewPoints)[] = ['safety_point', 'comfort_point', 'reliable_point',
        'contrallabilty_point', 'economic_point', 'cross_country_point']
    const onPointChange = (point: keyof ReviewPoints) => (value: number[]) => {
        console.log(value)
        onChange((points: ReviewPoints) =>({...points, [point]: value[1] }))
    }
    return <Stack spacing={4} size={'container'}>
        { reviewPoint.map(point => <SetPointLine point={point}
                                                 value={+data[point as keyof typeof data]!}
                                                 onChange={onPointChange(point)}
        />) }
    </Stack>
}