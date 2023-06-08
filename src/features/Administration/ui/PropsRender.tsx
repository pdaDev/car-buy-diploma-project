import {FC} from "react";
import {
    checkIsRussian,
    getTranslationIndexCreator, IHandbookItem, isHandbook,
    Label,
    Separator,
    Stack,
    useMultiLanguageHandbooks
} from "../../../shared";
import {useTranslation} from "react-i18next";

interface IProps<T> {
    entity: T
    translationIndex: string | Function
    exceptions?: (keyof T)[]
}

export function PropsRender<T extends object>({ entity, translationIndex, exceptions }: IProps<T>) {
    const { t } = useTranslation()
    const getIndex = typeof translationIndex === 'string' ? getTranslationIndexCreator(translationIndex) : translationIndex
    const { getHandbookItemName } = useMultiLanguageHandbooks()

    const getValue = (value: string | null | number | IHandbookItem) => {
        if (isHandbook(value)) {
            return getHandbookItemName(value as IHandbookItem)
        } else {
            return value ? value.toString() : 'отсутствует'
        }
    }

    return <>
        {Object.keys(entity)
            .filter(key => exceptions ? !exceptions.includes(key as keyof T) : true)
            .map(key => <Stack spacing={3} hAlign={'start'}
                               vAlign={'start'}
                               size={'container'}>
                    <Label label={t(getIndex(key))}
                           level={4}
                           type={'secondary'}
                           weight={'regular'}
                    />
                    <Label label={getValue(entity[key as keyof T] as any)}
                           level={3}
                           weight={'medium'}
                    />
            </Stack>)}
    </>
}