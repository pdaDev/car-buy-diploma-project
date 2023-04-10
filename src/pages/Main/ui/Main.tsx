import {FC, useEffect} from "react";
import {useAppDispatch} from "../../../app/services";
import {makeHeaderNormal, makeHeaderTransparent} from "../../../app/services/withCommonLayout/model/slice";
import {useTranslation} from "react-i18next";
import {Button, Card, Container, Image, Label, Slider, Stack, Symbol} from "../../../shared";
// @ts-ignore
import promo from './image 6.png'
import {Advertisement} from "../../Advertisement";
import {AdvertisementCard, useGetAdsMutation} from "../../../entities/Advertisement";
import {getRecentAds} from "../../../entities/Advertisement/api/historyAPI";
import {AdvertisementSlider} from "../../../features/AdvertisementSlider";
export const MainPage: FC = () => {
    const d = useAppDispatch()
    useEffect(() => {
        d(makeHeaderTransparent())
        return () => {
            d(makeHeaderNormal())
        }
    }, [d])
    const {t} = useTranslation()
    const [getAds, {data: ads, isLoading}] = useGetAdsMutation()
    useEffect(() => {
        const historyAds = getRecentAds()
        getAds({ ids: historyAds, page: 0, limit: historyAds.length })
    }, [])

    const loadingStatus = isLoading

    return <Container position={"top-middle"}>
        <Stack spacing={5}>
            <Card width={'100%'} border={[0, 0, 3, 3]} contentDirection={'row'}>
                <Stack spacing={3}>
                    <Symbol content={t("main.title.want")}/>
                    <Stack direction={'row'} spacing={3}>
                        <Symbol content={t("main.title.buy")}/>
                        <Symbol content={t("main.title.or")}/>
                        <Symbol content={t("main.title.sell")}/>
                    </Stack>
                    <Symbol content={t("main.title.auto")}/>

                </Stack>
                <Stack direction={'row'} spacing={4}>
                    <Button type={'primary'} size={'medium'} label={t("main.buy") as string}/>
                    <Button type={'primary'} size={'medium'} label={t("main.sell") as string}/>
                </Stack>
                <Image src={promo} alt={'promo'} width={'300px'} height={'300px'}/>
            </Card>
        </Stack>
        <Label label={t("main.history")} weight={'medium'} level={2}/>
        <AdvertisementSlider data={ads} loading={loadingStatus} />
    </Container>
}