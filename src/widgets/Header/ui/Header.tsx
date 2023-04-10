import {FC, useEffect, useState} from "react";

import s from './Header.module.scss'
import {Button, Label, ThreeDotsButton, useOpenStatus} from "../../../shared";
import {HeaderSearch} from "../../../features/HeaderSearch";
import {
    FavouritesButton
} from "../../../features/OperateWithAdvertisementFavourites/ui/FavouritesButton/FavouritesButton";
import {useAppDispatch, useAppNavigate, useAppSelector} from "../../../app/services";
import {UISettings} from "../../../features/UISettings";
import {HeaderUserMenu} from "../../../features/HeaderUserMenu/ui/HeaderUserMenu";
import {logout, selectors as userSelectors} from 'entities/User'
import {selectors as favouritesSelectors} from 'features/OperateWithAdvertisementFavourites'
import {openModal} from "../../../app/services/withPopupProvider";
import {AuthFormContainer} from "../../../features/Auth";
import {SelectGeoLocation} from "../../../features/SelectGeoLocation/ui/SelectGeoLocation";
import {useTranslation} from "react-i18next";

interface IProps {
    transparent: boolean
}
export const Header: FC<IProps> = ({ transparent }) => {
    const n = useAppNavigate()
    const [isUISettingsOpen,,toggleUISettingsOpenStatus ] = useOpenStatus()
    const authStatus = useAppSelector(userSelectors.selectAuthStatus)
    const first_name = useAppSelector(userSelectors.selectUserFirstName)
    const second_name = useAppSelector(userSelectors.selectUserSecondName)
    const avatar = useAppSelector(userSelectors.selectUserAvatar)
    const favouritesCount = useAppSelector(favouritesSelectors.selectIdsListLen)

    const fullName = `${first_name} ${second_name}`

    const goToReviewsPage = () => n(t => t.reviews)
    const goToGaragePage = () => n(t => t.garage)
    const goToFavourites = () => n(t => t.favourites)
    const goToMainPage = () => n(t => t.init)
    const goToPersonalCabinet = () => n(t => t.cabinet)
    const d = useAppDispatch()
    const openLoginForm = () => d(openModal({ key: 'auth' }))
    const { t } = useTranslation()

    const logoutHandler = () => d(logout())
    return <div className={s.header_wrapper} >
         <UISettings isOpen={isUISettingsOpen} />
        <header className={s.header} data-transparent={transparent}>
            <div className={s.geo_wrapper}>
                <SelectGeoLocation />
            </div>
            <div onClick={goToMainPage}>
                <Label label={t("pages.main")} level={2} weight={'semi-bold'}/>
            </div>
            <HeaderSearch />
            <div className={s.buttons_line_wrapper}>
                <Button label={t("header.reviews") as string} type={'secondary'}  onClick={goToReviewsPage} />
                <Button label={t("header.garage") as string} type={'secondary'} onClick={goToGaragePage} />
                <FavouritesButton countOfFavourites={favouritesCount} onClick={goToFavourites} />
                <Button label={t("header.make_ad") as string} type={'primary'} onClick={() => {}} />
                <HeaderUserMenu isAuthed={authStatus}
                                avatar={avatar}
                                name={fullName}
                                logout={logoutHandler}
                                login={openLoginForm}
                                goToPersonalCabinet={goToPersonalCabinet}/>
            </div>
            <ThreeDotsButton onClick={toggleUISettingsOpenStatus} />
            <AuthFormContainer />
        </header>
    </div>
}