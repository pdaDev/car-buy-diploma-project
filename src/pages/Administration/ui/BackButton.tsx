import {FC} from "react";
import {useTranslation} from "react-i18next";
import {Button, Clickable, Stack} from "../../../shared";
import Icon from "@mdi/react";
import {mdiArrowLeftThin} from "@mdi/js/commonjs/mdi";
import {useAppNavigate} from "../../../app/services";

interface IProps {
    onClick?: Function
}

export const BackButton: FC<IProps> = ({ onClick }) => {
    const { t } = useTranslation()
    const n = useAppNavigate()
    const goBack = () => onClick ? onClick() : n(p => p.administration)
    return <Stack spacing={0} size={'content'} vAlign={'center'} hAlign={'start'} direction={'row'}>
        <Clickable onClick={goBack} color={'fnt-primary'}>
            <Icon path={mdiArrowLeftThin} size={1} />
        </Clickable>
        <Button type={'underline'}
                onClick={goBack}
                label={t('admin.go_back') as string}
        />
    </Stack>
}