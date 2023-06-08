import {FC, useEffect, useState} from "react";
import {CompareCard, CompareCharacteristics, NS} from 'features/CompareSmth'
import {Button, cn, Container, Slider, Stack, Text} from "../../../shared";
import s from './CompareBlock.module.scss'
import {useAppDispatch, useAppSelector} from "../../../app/services";
import {selectAuthStatus} from "../../../entities/User/model/selectors";
import {useTranslation} from "react-i18next";
import {openModal} from "../../../app/services/withPopupProvider";
import {useAuthorize} from "../../../entities/User/lib/hooks";
import {AuthMotivation} from "../../../features/Auth";

interface IProps {
    loading: boolean
    data: NS.IServerCompareItem[]
    showDifferences: boolean
}

export const CompareBlock: FC<IProps> = ({loading, data, showDifferences}) => {
    const {authStatus} = useAuthorize()
    const showInfo = !authStatus
    const {t} = useTranslation()
    const countOfItems = 3
    const d = useAppDispatch()
    const login = () => d(openModal({key: 'auth'}))
    const splitDataAccordingPage = (page: number) => {
        if (data) {
            return data.filter((_, index) => index >= page && index < page + countOfItems)
        }
        return []
    }
    useEffect(() => {
        setFilteredData(splitDataAccordingPage(0))
    }, [data])
    const [filteredData, setFilteredData] = useState(splitDataAccordingPage(0))
    return <Stack spacing={0}>
        <Stack direction={'row'} hAlign={'start'}>
            <div className={cn(s.info_block_wrapper)}>
                <AuthMotivation translationKey={'compare'} withTopMargin={false}
                                fullHeight={true}/>
                {/*{!authStatus && <div className={s.info_block}>*/}
                {/*    <Text size={4} weight={'medium'} content={t("motivate.compare.auth.message")}/>*/}
                {/*    <Button width={'full'} type={'primary'} label={t("motivate.compare.auth.button") as string} onClick={login} />*/}
                {/*</div>}*/}
            </div>
            <Slider data={data}
                    spacing={16}
                    renderEl={(el: NS.IServerCompareItem) => <CompareCard {...el} key={el.id}/>}
                    countVisibleItems={countOfItems}
                    paddings={0}
                    onPagination={p => setFilteredData(splitDataAccordingPage(p))}
            />
        </Stack>
        <CompareCharacteristics data={filteredData}
                                showDifferences={showDifferences}
        />
    </Stack>
}
