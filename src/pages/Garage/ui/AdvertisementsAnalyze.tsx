import {FC} from "react";
import {IAdvertisementListItemWithStatus} from "../../../entities/Advertisement/namespace";
import {Card, CircleDiagram, Container, IOption, Label, Stack} from "../../../shared";


interface IProps {
    advertisements: IAdvertisementListItemWithStatus[]
    statuses: IOption[]
    loading: boolean
}

export const AdvertisementsAnalyze: FC<IProps> = ({advertisements, statuses, loading }) => {
    const analyzeData = statuses.map(s => advertisements.reduce<number>((acc, ad) => ad.status_code.code === s.value ? acc + 1 : acc , 0))
    return <Stack direction={'row'} spacing={4} vAlign={'center'}>
        {
            analyzeData.map((el, index) => <Card border={2} shadow={0} paddings={3} width={'100%'}>
                <Label label={statuses[index].label}
                       weight={'regular'}
                       align={'center'}
                       loading={loading}
                       size={'3'}/>
               <Container max_w={'40px'} mr={3}>
                   <Container position={'center'} contentAlign={'center'} pl={'10px'}>
                       <Label label={el} loading={loading}/>
                   </Container>
                   <CircleDiagram parts={advertisements.length}
                                  strokeWidth={4}
                                  zeroStart={'top'}
                                  part={el}
                   />
               </Container>
            </Card>)
        }
    </Stack>
}