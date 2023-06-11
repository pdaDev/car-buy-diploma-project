import {FC} from "react";
import {IBaseModelProps} from "app/services/withPopupProvider/namespace";
import {useTranslation} from "react-i18next";
import {withPopup} from "app/services/withPopupProvider/lib/hocs";
import {Button, Card, getTranslationIndexCreator, Label, Stack, Text} from "shared";
import {useAppNavigate} from "app/services";

type Props = IBaseModelProps

const Modal: FC<Props> = ({ onClose }) => {
    const { t } = useTranslation()
    const getIndex = getTranslationIndexCreator('test.pre')
    const n = useAppNavigate()
    const goToSearch = () => {
        n(p => p.search)
        onClose()
    }
    const goToTest = () => {
        n(p => p.test)
        onClose()
    }

    return <Card paddings={4} width={'500px'}>
        <Stack spacing={5} size={'container'}>
            <Label label={t(getIndex('label'))} level={2} size={6} weight={'medium'}/>
            <Text content={t(getIndex('motivation'))} size={3} weight={'regular'} />
            <Stack direction={'row'} size={'width'} spacing={4}>
                <Button type={'secondary'}
                        width={'full'}
                        onClick={goToSearch}
                        label={t(getIndex('go_to_search')) as string}
                />
                <Button type={'primary'}
                        width={'full'}
                        onClick={goToTest}
                        label={t(getIndex('go_to_test')) as string}
                />
            </Stack>
        </Stack>

    </Card>
}

export const PreTestModal = withPopup('pre_test')(Modal)