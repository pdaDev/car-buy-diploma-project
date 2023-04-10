import {FC} from "react";
import {Card, Label, Stack, Symbol, IServerCarName} from "../../../../shared";
import {useTranslation} from "react-i18next";

interface IProps {
    data: IServerCarName | null
    loading?: boolean
}
export const CarTitle: FC<IProps> = ({
    data,
    loading
                                                }) => {
    const loadingStatus = loading ?? !data
    const { t } = useTranslation()
    const name = data ? `${data.brend.name} ${data.model.name}` : null
    const gen = data ? `${data.generation.name} (${data.generation.start} - ${data.generation.end || 'н.в.'})` : null
    return <Card width={'100%'} paddings={4}>
        <Label level={2} weight={'medium'} label={name} type={'primary'}/>
        <Stack direction={'row'} spacing={3}>
            <Label label={t("car.generation")}  weight={'regular'} level={3} type={'secondary'}/>
            <Symbol content={gen} weight={'regular'} size={3} color={'grey-1'}/>
        </Stack>
    </Card>
}