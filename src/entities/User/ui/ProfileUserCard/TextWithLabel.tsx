import {Box, Container, getTranslationIndexCreator, Label, Stack, Symbol, Text} from "shared";
import {useTranslation} from "react-i18next";
import {FC} from "react";

interface IProps {
    value: string | number | null
    translationIndex: string
    loading?: boolean
}

export const TextWithLabel: FC<IProps> = ({value, translationIndex, loading}) => {
    const {t} = useTranslation()
    const getIndex = getTranslationIndexCreator('user')
    const textValue = value || t(getIndex('null'))
    return <Stack spacing={2}>
        <Symbol content={t(getIndex(translationIndex))}
                size={2}
                weight={'regular'}
                color={'grey-1'}/>
       <Stack direction={'row'} spacing={3} vAlign={'center'}>
           <Label label={textValue}
                  level={3}
                  loading={loading}
                  weight={"medium"}/>
           {
               translationIndex === 'phone_number' && !value && <Box background={'primary-light'} brd={3}>
                   <Container p={3}>
                       <Text size={3}
                             weight={'regular'}
                             content={t(getIndex('add_phone_number'))}/>
                   </Container>
               </Box>
           }
       </Stack>
    </Stack>

}