import {FC} from "react";
import {IHandbookItem, Stack} from "../../../../shared";
import {CarPropWithInfo} from "../CarPropWithInfo/CarPropWithInfo";

interface IProps {
    title: string
    value: string | number | IHandbookItem | undefined
    code: string
    loading?: boolean
}

export const CarPropLine: FC<IProps> = ({ title, value, code, loading }) => {
    return <Stack spacing={4} direction={'row'} size={'width'}>
        <CarPropWithInfo type={'title'}
                         value={title}
                         code={code}
                         loading={loading}
                         textType={'secondary'}
                         infoIconPos={'right'}
        />
        <CarPropWithInfo type={'value'}
                         loading={loading}
                         value={value}
        />
    </Stack>
}
