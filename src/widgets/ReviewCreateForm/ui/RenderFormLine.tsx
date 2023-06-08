import {FC, ReactNode} from "react";
import {Card, getTranslationIndexCreator, Input, Label, Stack} from "../../../shared";
import {useTranslation} from "react-i18next";

interface IProps {
    children: ReactNode
    title: string
}

export const RenderFormLine: FC<IProps> = ({ title, children  }) => {
    const {t} = useTranslation()

    return <Stack spacing={3} size={'container'}>
        <Label label={t(`review.${title}`)} level={2}/>
        <Card paddings={[3, 4]} shadow={3}
              contentDirection={'column'}
              contentGap={4}
              border={2} width={'100%'}>
            { children }
        </Card>
    </Stack>
}