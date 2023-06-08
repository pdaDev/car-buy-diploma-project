import {FC} from "react";
import {Button, Card, Container, getTranslationIndexCreator, Label, Stack, Text} from "../../../../shared";
import {useTranslation} from "react-i18next";
import {withPopup} from "../lib/hocs";
import * as NS from '../namespace'

type Props = NS.IBaseModelProps & NS.IConfirmPayload


const Modal: FC<Props> = ({
                                                  onClose,
                                                  index,
                                                  onConfirm
                                              }) => {
    const {t} = useTranslation()
    const getIndex = getTranslationIndexCreator(`confirmation.${index}`)
    const label = t(getIndex('title'))
    const message = t(getIndex('message'))
    const onConfirmButtonClick = () => {
        onConfirm()
        onClose()
    }

    return <Card width={'400px'} border={2} paddings={4} contentDirection={'column'} shadow={1}>
        <Label label={label} level={2} weight={'medium'}/>
       <Container m={4}>
           <Text size={2} weight={"regular"} content={message}/>
       </Container>
        <Stack direction={'row'} hAlign={'end'} spacing={3}>
            <Button type={'secondary'}
                    label={t("confirmation.decline") as string}
                    onClick={onClose as any}

            />
            <Button type={'primary'}
                    label={t("confirmation.confirm") as string}
                    onClick={onConfirmButtonClick}
            />
        </Stack>
    </Card>
}

export const ConfirmationModal =  withPopup('confirm')(Modal)