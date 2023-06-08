import {FC} from "react";
import {
    CarPropType,
    formatNumber,
    IHandbookItem,
    isHandbook,
    Label,
    Stack,
    useMultiLanguageHandbooks
} from "../../../../shared";
import {InfoModal} from "../../../../features/InfoModal";
import {CAR_PROP_DESCRIPTION} from "../../lib/constants";
import {useTranslation} from "react-i18next";

interface IProps {
    type: CarPropType
    value: string | number | IHandbookItem | undefined
    code?: string
    infoIconPos?: 'left' | 'right'
    textType?: 'primary' | 'secondary'
    loading?: boolean
}

export const CarPropWithInfo: FC<IProps> = (
    {
        type,
        value,
        code,
        loading,
        textType = 'primary',
        infoIconPos = 'left'
    }) => {
    const {getHandbookItemName, getHandbookItemDescription} = useMultiLanguageHandbooks()
    const isCarPropTitle = type === 'title'
    const showInfo = isCarPropTitle
        ? code && Object.keys(CAR_PROP_DESCRIPTION).includes(code)
        : isHandbook(value) && getHandbookItemDescription(value as IHandbookItem)
    const {t} = useTranslation()
    const infoTitle = isCarPropTitle ?
        // @ts-ignore
        t(CAR_PROP_DESCRIPTION[code]?.title)
        : getHandbookItemName(value as IHandbookItem)
    const infoMessage = isCarPropTitle
        ?   // @ts-ignore
        t(CAR_PROP_DESCRIPTION[code]?.message)
        : getHandbookItemDescription(value as IHandbookItem)!
    const valueLabel = isCarPropTitle
        ? value
        : isHandbook(value) ? getHandbookItemName(value as IHandbookItem) : value

    return <Stack direction={'row'} hAlign={'start'} size={'content'} spacing={3} reverse={infoIconPos === 'left'}>

        <Label level={4} weight={'regular'}
               loading={loading}
               loadingWidth={90}
               type={textType}
               label={valueLabel as string}/>
        {showInfo && !loading &&
            <InfoModal title={infoTitle}
                       message={infoMessage}
                       closeBehavior={'blur'}
                       behavior={'click'}/>
        }
    </Stack>
}