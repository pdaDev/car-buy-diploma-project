import {FC} from "react";
import {Card, Label, Stack, Symbol, IServerCarName, ICarName} from "../../../../shared";
import {useTranslation} from "react-i18next";
import {getGenerationPeriod} from "../../lib/helpers";

interface IProps {
    data: IServerCarName | null
    loading?: boolean
}
export const CarTitle: FC<IProps> = ({
    data,
    loading,
                                                }) => {
    const loadingStatus = loading ?? !data
    const { t } = useTranslation()
    const name = data ?
        `${data.brend.name} ${data.model.name}`
        : null
    const gen = data
        ? `${data.generation.name} (${getGenerationPeriod(data.generation)})`
        : null
    return <Card width={'100%'} paddings={4}>
        <Label level={2}
               weight={'medium'}
               loading={loading}
               loadingWidth={300}
               label={name} type={'primary'}/>
         <Stack direction={'row'} spacing={3} vAlign={'center'}>
            <Label label={t("car.generation.title")}
                   weight={'regular'}
                   loading={loading}
                   level={3} type={'secondary'}/>
            <Symbol content={gen}
                    weight={'medium'}
                    size={4}/>
        </Stack>
    </Card>
}