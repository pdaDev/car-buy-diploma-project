import {FC, useState} from "react";
import {useTranslation} from 'react-i18next'
import {
    BaseSearchData,
    Box,
    Button,
    Container, createMultiLanguageOptions, ExtendedSearchData, INIT_SEARCH_DATA,
    IOption,
    SearchType,
    Stack,
    Switcher
} from "shared";

import s from './SearchBlock.module.scss'
import {BaseSearch} from "features/BaseSearch";
import {ExtendedSearch} from "../../../features/ExtendedSearch";
import {Label} from "../../../shared/ui/Label/Label";


interface IProps {
    type: SearchType;
    data: BaseSearchData | ExtendedSearchData;
    onChange: (obj: Partial<BaseSearchData>) => void;
    setType: Function;
    search: Function
}

export const SearchBlock: FC<IProps> = ({
                                            type,
                                            data,
                                            onChange,
                                            setType,
                                            search,

                                        }) => {
    const [mode, setMode] = useState<'base' | 'extended'>('base')

    const {t , i18n} = useTranslation()
    const searchTypeOptions = createMultiLanguageOptions(['advertisement', 'model'], t, 'search.subject')
    const advertisementTypeOptions = createMultiLanguageOptions(['new', 'used'], t, "search.advertisement" )

    const resetForm = () => {
        onChange(INIT_SEARCH_DATA)
    }

    const setAdvertisementType = (o: any) => {
        // @ts-ignore
        onChange({...data, advertisementType: o})
    }

    const toggleMode = () => {
        setMode(mode === 'base' ? 'extended' : 'base')
    }


    return <Container max_w={"700px"} zi={5} size={'content'}>
        <Box shadow={1} w={'700px'} brd={2} background={'secondary'}>
            <Container p={4}>
                <Stack spacing={4} size={'container'}>
                    <Stack direction={'row'} spacing={4} vAlign={'center'} hAlign={'start'}>
                        <Label level={1} label={t("search.label")}/>
                        {/*<Stack direction="row" spacing={3}>*/}
                        {/*    <Switcher options={searchTypeOptions}*/}
                        {/*              activeOptions={type}*/}
                        {/*              onChange={setType as any}*/}
                        {/*    />*/}
                        {/*    <Switcher options={advertisementTypeOptions}*/}
                        {/*              activeOptions={data.advertisementType}*/}
                        {/*              onChange={setAdvertisementType as any}*/}
                        {/*    />*/}
                        {/*</Stack>*/}

                    </Stack>
                    <div style={{zIndex: 10}}>
                        {mode === 'base' && <BaseSearch type={type}
                                                        data={data as BaseSearchData}
                                                        onChange={onChange}
                        />}
                        {mode === 'extended' &&
                            <ExtendedSearch type={type} onSearchChange={onChange} data={data as ExtendedSearchData}/>}
                    </div>
                    <Stack direction={'row'} spacing={3}>
                        <Button label={t("search.reset") as string} onClick={resetForm} type={'secondary'} width="full"/>
                        <Button label={mode === 'base' ? t("search.extended") as string : t("search.base") as string} onClick={toggleMode}
                                type={'secondary'} width="full"/>
                        <Button label={t("search.advertisement.show") as string} onClick={search as any} type={'primary'} width="full"/>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    </Container>
}