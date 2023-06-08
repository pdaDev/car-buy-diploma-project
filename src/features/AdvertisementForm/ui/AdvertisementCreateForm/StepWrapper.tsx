import {FC, ReactNode} from "react";
import {Card, cn, Container, Label, Stack} from "../../../../shared";
import s from './AdvertisementCreateForm.module.scss'
import Icon from "@mdi/react";
import {mdiCheck} from "@mdi/js/commonjs/mdi";
interface IProps {
    children: ReactNode
    title: string
    info?: ReactNode
    finished: boolean
    withoutPaddings?: boolean
    index: number
}

export const StepWrapper: FC<IProps> = ({
                                            children,
                                            title,
                                            info,
                                            finished,
                                            index,
                                            withoutPaddings
                                        }) => {
    return <Stack spacing={3} vAlign={'start'} size={'width'}>
        <Container ml={4} mt={index === 0 ? 0 : 5}>
            <Stack direction={'row'} spacing={4} vAlign={'center'}>
                <Label label={title}
                       level={2}
                       weight={'medium'}
                />
                <div className={cn(s.finished_mark, finished && s.visible)}>
                    <Icon path={mdiCheck} size={1}/>
                </div>
            </Stack>
        </Container>
        {info}
        <Card shadow={2} contentDirection={'column'}
              zIndex={10 - index}
              width={'100%'} contentGap={5}
              paddings={!withoutPaddings ? 4 : 0}>
            {children}
        </Card>
    </Stack>
}