import {FC} from "react";
import {Button, Card, getTranslationIndexCreator, Image, Stack, Symbol} from "../../../shared";
// @ts-ignore
import promo from "../../../pages/Main/ui/image 6.png";
import {useAppDispatch, useAppNavigate} from "../../../app/services";
import {useTranslation} from "react-i18next";
import s from './MainPageBanner.module.scss'
import {openModal} from "../../../app/services/withPopupProvider";

export const MainPageBanner: FC = () => {
    const d = useAppDispatch()
    const n = useAppNavigate()
    const { t } = useTranslation()
    const buyCar = () => d(openModal({ key: 'pre_test' }))
    const makeAdvertisement = () => n(p => p.advertisement.create)
    const getMainIndex = getTranslationIndexCreator('main')
    const getTitleIndex = getTranslationIndexCreator(getMainIndex("title"))

    return <div className={s.banner}>
        <Stack spacing={3}>
            <div className={s.title}>
                <Symbol content={t(getTitleIndex("want"))}/>
                <Stack direction={'row'} spacing={3} hAlign={'start'}>
                    <Symbol color={'primary'} content={t(getTitleIndex("buy"))}/>
                    <Symbol content={t(getTitleIndex("or"))}/>
                    <Symbol color={'primary'} content={t(getTitleIndex("sell"))}/>
                </Stack>
                <Symbol content={t(getTitleIndex("auto"))}/>
            </div>
            <Stack direction={'row'} hAlign={'start'} spacing={4}>
                <Button onClick={buyCar}
                        type={'primary'}
                        size={'medium'}
                        label={t(getMainIndex("buy")) as string}
                />
                <Button type={'primary'}
                        size={'medium'}
                        onClick={makeAdvertisement}
                        label={t(getMainIndex('sell')) as string}
                />
            </Stack>
        </Stack>
        <Image src={promo} alt={'promo'} width={'300px'} height={'300px'}/>
    </div>
}