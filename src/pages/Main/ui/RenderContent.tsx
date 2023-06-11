import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";
import {Label, Stack} from "shared";

interface IProps {
    children: ReactNode
    title: string
}
export const RenderContent: FC<IProps> = ({title, children}) => {
    const { t } = useTranslation()
    return <Stack size={'width'} spacing={4} hAlign={'start'}>
        <Label label={t(title)}
               weight={'medium'} level={2}/>
        { children }
    </Stack>
}