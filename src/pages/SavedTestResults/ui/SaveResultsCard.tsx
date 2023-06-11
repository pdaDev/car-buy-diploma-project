import {FC, MouseEventHandler} from "react";
import {Button, Card, Label, Stack} from "shared";
import Icon from "@mdi/react";
import {mdiDeleteOutline} from "@mdi/js/commonjs/mdi";

interface IProps {
    label: string
    runResults: Function
    deleteResult: Function
    date: number
}
export const SaveResultsCard: FC<IProps> = ({ label, runResults, deleteResult, date}) => {
    const onResultDelete: MouseEventHandler = e => {
        e.stopPropagation()
        deleteResult()
    }
    return <Card >
       <Stack vAlign={'center'} direction={'row'} size={'width'} onClick={runResults}>
           <Label label={label} weight={'medium'} level={2} />
           <Stack direction={'row'} spacing={3}>
               <Label label={new Date(date).toLocaleString()}
                      weight={'regular'}
                      type={'secondary'}
                      level={4} />
               <Button type={'delete'}
                       onClick={onResultDelete}
               >
                <Icon path={mdiDeleteOutline}
                      size={0.8}/>
               </Button>
           </Stack>
       </Stack>
    </Card>
}