import {FC} from "react";
import * as NS from "../../namespace";
import {useTranslation} from "react-i18next";
import {Grid, IHandbookItem, Label, Stack, useMultiLanguageHandbooks} from "../../../../shared";
import {CAR_PROP_DESCRIPTION} from "../../lib/constants";
import {InfoModal} from "../../../../features/InfoModal";

interface IProps {
    title: string
    value: string | number | IHandbookItem | undefined
    code: string
}

export const CarPropLine: FC<IProps> = ({ title, value, code }) => {
    const { getHandbookItemName, getHandbookItemDescription } = useMultiLanguageHandbooks()

    const isHandbook = (value: object | number | string | undefined | null) => {
        return typeof value === 'object'
            && value !== null
            && ['ru_name', 'eng_name', 'ru_description', 'eng_description'].every(key => Object.keys(value).includes(key))
    }

    const {t} = useTranslation()
    return <Stack spacing={4} direction={'row'} size={'container'}>
        <Stack direction={'row'} spacing={3}>
            <Label label={title}  weight={'regular'} level={4} type={'secondary'}/>
            {Object.keys(CAR_PROP_DESCRIPTION).includes(code) &&
                // @ts-ignore
                <InfoModal title={t(CAR_PROP_DESCRIPTION[code].title)}
                    // @ts-ignore
                           message={t(CAR_PROP_DESCRIPTION[code].message)}
                           closeBehavior={'blur'}
                           behavior={'click'}/>}
        </Stack>
        <Stack direction={'row'} spacing={3}>
            {isHandbook(value) && getHandbookItemDescription(value as IHandbookItem) &&
                <InfoModal title={getHandbookItemName(value as IHandbookItem)}
                           message={getHandbookItemDescription(value as IHandbookItem)!}
                           closeBehavior={'blur'}
                           behavior={'click'}/>
            }
            <Label level={4} weight={'regular'} label={isHandbook(value) ? getHandbookItemName(value as IHandbookItem) : value as string}/>
        </Stack>
    </Stack>
}
