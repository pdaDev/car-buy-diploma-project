import {FC, ReactNode} from "react";
import {Card, Label, Stack} from "shared";
import {useTranslation} from "react-i18next";

interface IProps {
    children: ReactNode
    title: string
    zi?: number
}

export const RenderFormLine: FC<IProps> = ({ title, children, zi  }) => {
    const {t} = useTranslation()

    return <Stack spacing={3} size={'width'}>
        <Label label={t(`review.${title}`)} level={2}/>
        <Card paddings={[3, 4]} shadow={3}
              zIndex={zi}
              contentDirection={'column'}
              contentGap={4}
              border={2} width={'100%'}>
            { children }
        </Card>
    </Stack>
}