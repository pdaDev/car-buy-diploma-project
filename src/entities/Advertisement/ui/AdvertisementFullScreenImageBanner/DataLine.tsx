import {FC} from "react";
import {Label, Stack} from "../../../../shared";
import {useTranslation} from "react-i18next";

interface IProps {
    keyIndex: string
    value: string | number
}

export const DataLine: FC<IProps> = ({ keyIndex, value  }) => {
    const { t } = useTranslation()
    return  <Stack direction={'row'} spacing={4} hAlign={'start'} size={'width'}>
        <Label label={t(keyIndex)}
               type={'secondary'}
               size={3}
               weight={"regular"}
        />
        <Label label={value}
               weight={'regular'}
               size={3}
        />
    </Stack>
}